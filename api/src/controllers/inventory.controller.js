// controllers/admin/inventory.controller.js  (o donde lo quieras colocar)
const { Op, fn, col } = require('sequelize');

const INVENTORY = require('../models/inventory');
const DONATIONITEM = require('../models/donationItem');
const DONATION = require('../models/donation');
const ARTICLE = require('../models/article');

/*
  Endpoints implementados:
  - createInventory
  - getInventory        -> obtener un inventario por id
  - getInventories      -> listar todos
  - getInventoryByDonationItem
  - getInventoryOnlyArticle         -> stock total de un artículo
  - getInventoriesOnlyArticles      -> stock total de todos los artículos (por artículo)
  - getInventoriesOnlyArticlesArea  -> stock por artículo agrupado por area
  - getInventoryOnlyArticleArea     -> stock de un artículo en una sola area
  - updateInventory
  - deleteInventory
*/

const createInventory = async (req, res) => {
  try {
    const { available, area, donation_item_id } = req.body;

    // validaciones
    if (available === undefined || donation_item_id === undefined || !area) {
      return res.status(400).json({ message: 'Campos obligatorios: available, area, donation_item_id' });
    }
    if (isNaN(Number(available)) || isNaN(Number(donation_item_id))) {
      return res.status(400).json({ message: 'available y donation_item_id deben ser números' });
    }
    if (typeof area !== 'string' || area.trim() === '') {
      return res.status(400).json({ message: 'area debe ser un string no vacío' });
    }

    // validar que exista el DonationItem
    const donationItem = await DONATIONITEM.findByPk(Number(donation_item_id));
    if (!donationItem) {
      return res.status(404).json({ message: 'DonationItem no encontrado' });
    }

    // crear inventario
    const inventory = await INVENTORY.create({
      available: Number(available),
      area: area.trim(),
      donation_item_id: Number(donation_item_id),
    });

    return res.status(201).json({
      message: 'Inventory creado correctamente',
      data: inventory,
    });
  } catch (err) {
    console.error('Error en createInventory:', err);
    return res.status(500).json({ message: 'Error interno al crear inventory', error: err.message });
  }
};

const getInventory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) return res.status(400).json({ message: 'ID inválido' });

    const inventory = await INVENTORY.findByPk(Number(id), {
      include: [
        {
          model: DONATIONITEM,
          include: [{ model: ARTICLE, attributes: ['id', 'name', 'variant', 'category', 'unit'] }]
        }
      ]
    });

    if (!inventory) return res.status(404).json({ message: 'Inventory no encontrado' });

    return res.status(200).json({ data: inventory });
  } catch (err) {
    console.error('Error en getInventory:', err);
    return res.status(500).json({ message: 'Error interno al obtener inventory', error: err.message });
  }
};

const getInventories = async (_req, res) => {
  try {
    const inventories = await INVENTORY.findAll({
      include: [
        {
          model: DONATIONITEM,
          include: [{ model: ARTICLE, attributes: ['id', 'name', 'variant'] }]
        }
      ],
      order: [['id', 'DESC']]
    });

    return res.status(200).json({ count: inventories.length, data: inventories });
  } catch (err) {
    console.error('Error en getInventories:', err);
    return res.status(500).json({ message: 'Error interno al listar inventories', error: err.message });
  }
};

const getInventoryByDonationItem = async (req, res) => {
  try {
    const { donation_item_id } = req.params;
    if (!donation_item_id || isNaN(Number(donation_item_id))) return res.status(400).json({ message: 'donation_item_id inválido' });

    const inventories = await INVENTORY.findAll({
      where: { donation_item_id: Number(donation_item_id) },
      include: [
        {
          model: DONATIONITEM,
          include: [{ model: ARTICLE, attributes: ['id', 'name'] }]
        }
      ]
    });

    return res.status(200).json({ count: inventories.length, data: inventories });
  } catch (err) {
    console.error('Error en getInventoryByDonationItem:', err);
    return res.status(500).json({ message: 'Error interno al obtener inventories por donation_item', error: err.message });
  }
};

const getInventoryOnlyArticle = async (req, res) => {
  try {
    const { article_id } = req.params;
    if (!article_id || isNaN(Number(article_id))) return res.status(400).json({ message: 'article_id inválido' });

    // buscamos donationItems que correspondan al article
    const donationItems = await DONATIONITEM.findAll({
      where: { article_id: Number(article_id) },
      attributes: ['id']
    });

    if (!donationItems || donationItems.length === 0) {
      return res.status(404).json({ message: 'No hay donation items para ese artículo' });
    }

    const donationItemIds = donationItems.map(di => di.id);

    // sumar los available en inventory donde donation_item_id IN (...)
    const total = await INVENTORY.sum('available', {
      where: { donation_item_id: { [Op.in]: donationItemIds } }
    });

    const article = await ARTICLE.findByPk(Number(article_id), { attributes: ['id', 'name', 'variant', 'category'] });

    return res.status(200).json({
      article: article || { id: Number(article_id) },
      total_stock: Number(total || 0)
    });
  } catch (err) {
    console.error('Error en getInventoryOnlyArticle:', err);
    return res.status(500).json({ message: 'Error interno al calcular stock por artículo', error: err.message });
  }
};

const getInventoriesOnlyArticles = async (_req, res) => {
  try {
    // hacemos join DonationItem -> Inventory -> Article y agrupamos por article_id
    // Usamos sequelize para hacerlo con agregaciones
    const rows = await DONATIONITEM.findAll({
      attributes: [
        'article_id',
        [fn('SUM', col('Inventories.available')), 'total_stock']
      ],
      include: [
        {
          model: INVENTORY,
          attributes: []
        },
        {
          model: ARTICLE,
          attributes: ['id', 'name', 'variant', 'category']
        }
      ],
      group: ['DonationItem.article_id', 'Article.id'],
      raw: false
    });

    // transformar la respuesta para que sea limpia
    const result = rows.map(r => {
      const article = r.Article;
      return {
        article_id: article ? article.id : r.article_id,
        name: article ? article.name : null,
        variant: article ? article.variant : null,
        category: article ? article.category : null,
        total_stock: Number(r.get('total_stock') || 0)
      };
    });

    return res.status(200).json({ count: result.length, data: result });
  } catch (err) {
    console.error('Error en getInventoriesOnlyArticles:', err);
    return res.status(500).json({ message: 'Error interno al agrupar stock por artículo', error: err.message });
  }
};

const getInventoriesOnlyArticlesArea = async (req, res) => {
  try {
    // agrupamos por article_id y area
    // empezamos desde INVENTORY para agrupar por area y donation_item -> article
    const rows = await INVENTORY.findAll({
      attributes: [
        [col('DonationItem.article_id'), 'article_id'],
        'area',
        [fn('SUM', col('available')), 'total_stock']
      ],
      include: [
        {
          model: DONATIONITEM,
          attributes: [],
          include: [{ model: ARTICLE, attributes: ['id', 'name', 'variant'] }]
        }
      ],
      group: ['DonationItem.article_id', 'area', 'DonationItem->Article.id'],
      raw: true
    });

    // transform rows to nice format
    const result = rows.map(r => ({
      article_id: r.article_id,
      area: r.area,
      total_stock: Number(r.total_stock || 0)
    }));

    return res.status(200).json({ count: result.length, data: result });
  } catch (err) {
    console.error('Error en getInventoriesOnlyArticlesArea:', err);
    return res.status(500).json({ message: 'Error interno al agrupar stock por artículo y área', error: err.message });
  }
};

const getInventoryOnlyArticleArea = async (req, res) => {
  try {
    const { article_id, area } = req.params;
    if (!article_id || isNaN(Number(article_id))) return res.status(400).json({ message: 'article_id inválido' });
    if (!area || typeof area !== 'string') return res.status(400).json({ message: 'area inválida' });

    // obtener donationItems del article
    const donationItems = await DONATIONITEM.findAll({
      where: { article_id: Number(article_id) },
      attributes: ['id']
    });

    if (!donationItems || donationItems.length === 0) {
      return res.status(404).json({ message: 'No hay donation items para ese artículo' });
    }
    const donationItemIds = donationItems.map(di => di.id);

    const total = await INVENTORY.sum('available', {
      where: {
        donation_item_id: { [Op.in]: donationItemIds },
        area: area.trim()
      }
    });

    return res.status(200).json({
      article_id: Number(article_id),
      area: area.trim(),
      total_stock: Number(total || 0)
    });
  } catch (err) {
    console.error('Error en getInventoryOnlyArticleArea:', err);
    return res.status(500).json({ message: 'Error interno al calcular stock por artículo en área', error: err.message });
  }
};

const updateInventory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) return res.status(400).json({ message: 'ID inválido' });

    const { available, area } = req.body;
    if (available === undefined && area === undefined) {
      return res.status(400).json({ message: 'Debe enviar available y/o area para actualizar' });
    }

    const inventory = await INVENTORY.findByPk(Number(id));
    if (!inventory) return res.status(404).json({ message: 'Inventory no encontrado' });

    const updates = {};
    if (available !== undefined) {
      if (isNaN(Number(available))) return res.status(400).json({ message: 'available debe ser numérico' });
      updates.available = Number(available);
    }
    if (area !== undefined) {
      if (typeof area !== 'string' || area.trim() === '') return res.status(400).json({ message: 'area debe ser string no vacío' });
      updates.area = area.trim();
    }

    await INVENTORY.update(updates, { where: { id: Number(id) } });

    const updated = await INVENTORY.findByPk(Number(id));
    return res.status(200).json({ message: 'Inventory actualizado', data: updated });
  } catch (err) {
    console.error('Error en updateInventory:', err);
    return res.status(500).json({ message: 'Error interno al actualizar inventory', error: err.message });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id || isNaN(Number(id))) return res.status(400).json({ message: 'ID inválido' });

    const deleted = await INVENTORY.destroy({ where: { id: Number(id) } });
    if (!deleted) return res.status(404).json({ message: 'Inventory no existe o ya fue eliminado' });

    return res.status(200).json({ message: 'Inventory eliminado correctamente' });
  } catch (err) {
    console.error('Error en deleteInventory:', err);
    return res.status(500).json({ message: 'Error interno al eliminar inventory', error: err.message });
  }
};

module.exports = {
  createInventory,
  getInventory,
  getInventories,
  getInventoryByDonationItem,
  getInventoryOnlyArticle,
  getInventoriesOnlyArticles,
  getInventoriesOnlyArticlesArea,
  getInventoryOnlyArticleArea,
  updateInventory,
  deleteInventory
};
