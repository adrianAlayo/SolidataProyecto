import axios from "axios";

const API_URL = "http://localhost:3000/report";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}


// Todas las donaciones (incluye responsable, receptor, items...)
export async function getDonationsReport() {
    const res = await axios.get(`${API_URL}/Donations`, getAuthHeaders());
    return res.data;
}

// Donaciones recibidas por BAA
export async function getBAAReceived() {
    const res = await axios.get(`${API_URL}/BAAReceived`, getAuthHeaders());
    return res.data;
}

// Donaciones que BAA aportó a instituciones
export async function getBAADonated() {
    const res = await axios.get(`${API_URL}/BAADonated`, getAuthHeaders());
    return res.data;
}

// Stock general de artículos
export async function getStock() {
    const res = await axios.get(`${API_URL}/Stock`, getAuthHeaders());
    return res.data;
}

// Actividad de usuarios (cant donaciones, última donación)
export async function getUserActivity() {
    const res = await axios.get(`${API_URL}/UserActivity`, getAuthHeaders());
    return res.data;
}
