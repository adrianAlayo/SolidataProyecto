import axios from "axios";

const API_URL = "http://localhost:3000/type";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}

// CREATE
export async function createType(name) {
    return await axios.post(
        `${API_URL}/`,
        { name },
        getAuthHeaders()
    );
}

// GET ALL
export async function getTypes() {
    return await axios.get(`${API_URL}/`, getAuthHeaders());
}

// GET BY ID
export async function getType(id) {
    return await axios.get(`${API_URL}/${id}`, getAuthHeaders());
}

// UPDATE
export async function updateType(id, name) {
    return await axios.put(
        `${API_URL}/${id}`,
        { name },
        getAuthHeaders()
    );
}

// DELETE
export async function deleteType(id) {
    return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
}
