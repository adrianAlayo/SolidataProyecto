import axios from "axios";

const API_URL = "http://localhost:3000/institution";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}


export async function createInstitution(data) {
    const res = await axios.post(`${API_URL}/`, data, getAuthHeaders());
    return res.data;
}

// Obtener todas las instituciones
export async function getInstitutions() {
    const res = await axios.get(`${API_URL}/`, getAuthHeaders());
    return res.data;
}

// Obtener una institución por ID
export async function getInstitution(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}

export async function updateInstitution(id, data) {
    const res = await axios.put(`${API_URL}/${id}`, data, getAuthHeaders());
    return res.data;
}

// Obtener instituciones INACTIVAS
export async function getInstitutionsInactive() {
    const res = await axios.get(`${API_URL}/Inactive`, getAuthHeaders());
    return res.data;
}

// Obtener instituciones ACTIVAS
export async function getInstitutionsActive() {
    const res = await axios.get(`${API_URL}/Active`, getAuthHeaders());
    return res.data;
}



// Desactivar institución (PATCH /:id)
export async function disableInstitution(id, data) {
    const res = await axios.patch(
        `${API_URL}/${id}`,
        data,
        getAuthHeaders()
    );
    return res.data;
}

// Aceptar / Activar institución
export async function acceptInstitution(id) {
    const res = await axios.patch(`${API_URL}/${id}`, null, getAuthHeaders());
    return res.data;
}

export async function deleteInstitution(id) {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}
