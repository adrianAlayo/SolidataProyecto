const { where, Model } = require('sequelize');
const bcrypt = require('bcrypt');

const DONATION = require('../models/donation');
const USER = require('../models/user');
const INSTITUTION = require('../models/institution');
const DONATION_ITEMS = require('../models/donationItem');
const ARTICLE = require('../models/article');
const INVENTORY = require('../models/inventory');


const Donations = async (_req,res) =>{
    try {
        const donations_found = await DONATION.findAll({
            include: [
                {
                    model: USER,
                    as: 'responsable',
                    attributes: ['first_name', 'last_name', 'email']
                },
                {
                    model: INSTITUTION,
                    as: 'receiver_institution',
                    attributes: ['name', 'institutionType']
                },
                {
                    model: DONATION_ITEMS,
                    include: [
                        {
                            model: ARTICLE,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        if(donations_found.length === 0){
            return res.status(404).send({message: "No se encontraron donaciones"});
        }
        
        //pROcesar para incluir la info del donador dinamicamente
        const result = [];

        for (const donation of donations_found) {
            let donorData = {};
            //Si el donador es una institucion - COTO,DIA,ETC
            if (donation.donor_type === 'Institution') {
                const donorInstitution = await INSTITUTION.findByPk(donation.donor_id, {
                    attributes: ['name']
                });
                donorData = { donor_name: donorInstitution
                    ?.name 
                    || 'Institución desconocida' 
                };
            }
            //SI EL donador es un usuario - VOLUNTARIO 
            else if (donation.donor_type === 'User') {
                const donorUser = await USER.findByPk(donation.donor_id, {
                    attributes: ['first_name', 'last_name']
                });
                donorData = {
                donor_name: donorUser
                    ? `${donorUser.first_name} ${donorUser.last_name}`
                    : 'Usuario desconocido'
                };
            }
            result.push({
                id: donation.id,
                donor_type: donation.donor_type,
                donor: donorData.donor_name,
                responsable: `${donation.responsable.first_name} ${donation.responsable.last_name}`,
                receiver_institution: donation.receiver_institution.name,
                items: donation.DonationItems.map((item) => ({
                article: item.Article.name
                }))
            });
        }

        res.status(200).json({
        message: 'Se encontraron donaciones:',
        donations: result
        });
    } catch (err) {
        return res.status(500).send({
            message: "Ocurrio un error !!! al querer obetener las donaciones: -> \n",
            error: err.message
        });
    }
}
const BAAReceived = async (_req, res) => {
    try {
        const baaInstitution = await INSTITUTION.findOne({
            where: { name: 'BAA' }
        });

        if (!baaInstitution) {
            return res.status(404).json({ message: "No se encontró la institución BAA" });
        }

        const donations_found = await DONATION.findAll({
            where: { receiver_institution_id: baaInstitution.id },
            include: [
                {
                    model: USER,
                    as: 'responsable',
                    attributes: ['first_name', 'last_name', 'email']
                },
                {
                    model: INSTITUTION,
                    as: 'receiver_institution',
                    attributes: ['name', 'institutionType']
                },
                {
                    model: DONATION_ITEMS,
                    include: [
                        {
                            model: ARTICLE,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        if (donations_found.length === 0) {
            return res.status(404).json({ message: "BAA no recibió donaciones registradas" });
        }

        res.status(200).json({
            message: "Donaciones recibidas por BAA:",
            donations_found
        });
    } catch (err) {
        res.status(500).json({
            message: "Ocurrio un Error !!! al querer obtener las donaciones recibidas por parte de BAA",
            error: err.message
        });
    }
};
const BAADonated = async (_req, res) => {
    try {
        const baaInstitution = await INSTITUTION.findOne({
            where: { name: 'BAA' }
        });

        if (!baaInstitution) {
            return res.status(404).json({ message: "No se encontro la institucion BAA" });
        }

        const donations_found = await DONATION.findAll({
            where: {
                donor_type: 'institution',
                donor_id: baaInstitution.id
            },
            include: [
                {
                    model: USER,
                    as: 'responsable',
                    attributes: ['first_name', 'last_name', 'email']
                },
                {
                    model: INSTITUTION,
                    as: 'receiver_institution',
                    attributes: ['name', 'institutionType']
                },
                {
                    model: DONATION_ITEMS,
                    include: [
                        {
                            model: ARTICLE,
                            attributes: ['name']
                        }
                    ]
                }
            ]
        });

        if (donations_found.length === 0) {
            return res.status(404).json({ message: "BAA no realizó donaciones registradas" });
        }

        res.status(200).json({
            message: "Donaciones realizadas por BAA:",
            donations_found
        });
    } catch (err) {
        res.status(500).json({
            message: "Ocurrio un Error !!! al querer traer las donaciones realizadas por BAA: ->",
            error: err.message
        });
    }
};
const Stock = async (req, res) => {
  try {
    const { article_id } = req.params; 

    const article_Exist = await ARTICLE.findByPk(article_id);
    if (!article_Exist) {
      return res.status(404).send({ message: "Artículo no encontrado" });
    }

    const donationItems = await DONATION_ITEMS.findAll({
      where: { article_id },
      include: [{ model: INVENTORY, attributes: ['available', 'area'] }]
    });

    if (donationItems.length === 0) {
      return res.status(404).json({ message: "No hay registros de inventario para este artículo" });
    }

    const totalStock = donationItems.reduce((total, item) => {
      const stockDeEsteItem = (item.Inventories || []).reduce((suma, inv) => suma + (inv.available || 0), 0);
      return total + stockDeEsteItem;
    }, 0);

    return res.status(200).json({
      article: article_Exist.name,
      total_stock: totalStock,
      details: donationItems.map(item => ({
        donation_item_id: item.id,
        inventories: (item.Inventories || []).map(inv => ({ area: inv.area, available: inv.available }))
      }))
    });
  } catch (err) {
    return res.status(500).json({
      message: "Ocurrió un error al querer traer los stock del inventario",
      error: err.message
    });
  }
};
const UserActivity = async (_req, res) => {
  try {
    const activity = await DONATION.findAll({
      attributes: [
        'responsable_user_id',
        [fn('COUNT', col('id')), 'total_donations'],
        [fn('MAX', col('createdAt')), 'last_donation']
      ],
      include: [
        {
          model: USER,
          as: 'responsable',
          attributes: ['first_name', 'last_name', 'email']
        }
      ],
      group: ['responsable_user_id', 'responsable.id']
    });

    res.status(200).json({
      message: "Reporte de actividad de usuarios",
      data: activity
    });
  } catch (err) {
    res.status(500).json({
      message: "Error al generar el reporte de actividad de usuarios",
      error: err.message
    });
  }
};
const Inventory = async (_req,res) =>{
    // Solo poder ver la informacion del inventario
    try {
        const inventory_found = await INVENTORY.findAll(

        )

        if(!inventory_found){
            return res.status(404).send({message: "No se encontro ningun inventario"})
        }

        return res.status(201).json({
            message: "Se extrajo la informacion con exito",
            Data: inventory_found,
        })

    } catch (err) {
        return res.status(500).send({
            message: "Ocurrion un error !!! en la peticion interna: -> ",
            error: err.message,
        });
    }
}
module.exports = {
    Donations, // GET
    BAAReceived, // GET
    BAADonated, // GET
    Stock, // GET
    UserActivity, // GET
}