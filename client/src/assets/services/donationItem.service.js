import axios from "axios";

const API_URL = "http://localhost:3000/item";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}

export async function createItem(data) {
    const res = await axios.post(`${API_URL}/`, data, getAuthHeaders());
    return res.data;
}


// Obtener un item por ID
export async function getItem(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}

// Obtener todos los items
export async function getItems() {
    const res = await axios.get(`${API_URL}/`, getAuthHeaders());
    return res.data;
}

// Obtener los items que pertenecen a una donación
export async function getItemsByDonation(donation_id) {
    const res = await axios.get(
        `${API_URL}/ByDonation/${donation_id}`,
        getAuthHeaders()
    );
    return res.data;
}

export async function updateItem(id, data) {
    const res = await axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
    return res.data;
}

export async function deleteItem(id) {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}
