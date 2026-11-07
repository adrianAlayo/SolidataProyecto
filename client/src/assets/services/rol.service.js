import axios from "axios";

const API_URL = "http://localhost:3000/role";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}


export async function createRole(name, description) {
    const res = await axios.post(
        `${API_URL}/`,
        { name, description },
        getAuthHeaders()
    );
    return res.data;
}

export async function getRoles() {
    const res = await axios.get(`${API_URL}/`, getAuthHeaders());
    return res.data;
}

export async function getRole(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}

export async function updateRole(id, fieldsUpdate) {
    const res = await axios.put(
        `${API_URL}/${id}`,
        fieldsUpdate,
        getAuthHeaders()
    );
    return res.data;
}

export async function assignRole(userId, newRoleId) {
    const res = await axios.patch(
        `${API_URL}/${userId}`,
        { newRole_id: newRoleId },
        getAuthHeaders()
    );
    return res.data;
}

export async function deleteRole(id) {
    const res = await axios.delete(
        `${API_URL}/${id}`,
        getAuthHeaders()
    );
    return res.data;
}


export async function getMyPermissions() {
    const res = await axios.get(`${API_URL}/my-permissions`, getAuthHeaders());
    return res.data;
}
