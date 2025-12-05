import axios from "axios";

const API_URL = "http://localhost:3000/inventory";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}

export async function createInventory(data) {
    const res = await axios.post(`${API_URL}/`, data, getAuthHeaders());
    return res.data;
}

// Obtener todos los inventories
export async function getInventories() {
    const res = await axios.get(`${API_URL}/`, getAuthHeaders());
    return res.data;
}

// Obtener un inventory por ID
export async function getInventory(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}

// Obtener inventarios asociados a los items de una donación
export async function getInventoryByDonationItem(id) {
    const res = await axios.get(`${API_URL}/ByDonationItem/${id}`, getAuthHeaders());
    return res.data;
}

// Stock total de un artículo
export async function getInventoryOnlyArticle(id) {
    const res = await axios.get(`${API_URL}/OnlyArticle/${id}`, getAuthHeaders());
    return res.data;
}

// Stock total de todos los artículos agrupados por artículo
export async function getInventoriesOnlyArticles() {
    const res = await axios.get(`${API_URL}/OnlyArticles`, getAuthHeaders());
    return res.data;
}

// Stock agrupado por artículo y área
export async function getInventoriesOnlyArticlesArea() {
    const res = await axios.get(`${API_URL}/OnlyArticlesArea`, getAuthHeaders());
    return res.data;
}

// Stock de un artículo en una sola área
export async function getInventoryOnlyArticleArea(body) {
    const res = await axios.get(`${API_URL}/OnlyArticleArea`, {
        ...getAuthHeaders(),
        params: body,
    });
    return res.data;
}

export async function updateInventory(id, data) {
    const res = await axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
    return res.data;
}

export async function deleteInventory(id) {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}
