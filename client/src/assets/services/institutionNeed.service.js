import axios from "axios";

const API_URL = "http://localhost:3000/need";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}

// Crear una necesidad
export async function createNeed(data) {
    const res = await axios.post(`${API_URL}/`, data, getAuthHeaders());
    return res.data;
}

// Obtener TODAS las necesidades
export async function getNeeds() {
    const res = await axios.get(`${API_URL}/`, getAuthHeaders());
    return res.data;
}

// Obtener 1 necesidad por ID
export async function getNeed(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}

// Obtener necesidades de 1 institución
export async function getNeedsByInstitution(id) {
    const res = await axios.get(`${API_URL}/ByInstitution/${id}`, getAuthHeaders());
    return res.data;
}

// Actualizar una necesidad (available, article_id)
export async function updateNeed(id, data) {
    const res = await axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
    return res.data;
}

// Cambiar estado ("Pending" / "Resolved")
export async function updateNeedStatus(id, status) {
    const res = await axios.patch(
        `${API_URL}/${id}`,
        { status },
        getAuthHeaders()
    );
    return res.data;
}

// Eliminar necesidad
export async function deleteNeed(id) {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}
