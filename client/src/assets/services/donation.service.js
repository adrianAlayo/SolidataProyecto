// src/services/donation.service.js
import axios from "axios";

const API_URL = "http://localhost:3000/donation";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}


export async function createDonation(data) {
    const res = await axios.post(`${API_URL}/`, data, getAuthHeaders());
    return res.data;
}


// Obtener una donación por ID
export async function getDonation(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}

// Obtener todas las donaciones
export async function getDonations() {
    const res = await axios.get(`${API_URL}/`, getAuthHeaders());
    return res.data;
}

// Obtener donaciones por responsable
export async function getDonationsByResponsable(id) {
    const res = await axios.get(`${API_URL}/ByResponsable/${id}`, getAuthHeaders());
    return res.data;
}

// Obtener donaciones por donador
export async function getDonationsByDonor(id) {
    const res = await axios.get(`${API_URL}/ByDonor/${id}`, getAuthHeaders());
    return res.data;
}

// Obtener donaciones por voluntario donador
export async function getDonationsByVolunteerDonor(id) {
    const res = await axios.get(`${API_URL}/ByVolunteerDonor/${id}`, getAuthHeaders());
    return res.data;
}

// Obtener donaciones por institución donadora
export async function getDonationsByInstitutionDonor(id) {
    const res = await axios.get(`${API_URL}/ByInstitutionDonor/${id}`, getAuthHeaders());
    return res.data;
}

// Obtener donaciones por institución receptora
export async function getDonationsByReceiver(id) {
    const res = await axios.get(`${API_URL}/ByReceiver/${id}`, getAuthHeaders());
    return res.data;
}


// Actualizar una donación (PUT)
export async function updateDonation(donation_id, data) {
    const res = await axios.put(`${API_URL}/${donation_id}`, data, getAuthHeaders());
    return res.data;
}

// Actualizar estado de una donación (PATCH)
export async function updateDonationStatus(id, status) {
    const res = await axios.patch(
        `${API_URL}/${id}`,
        { status },
        getAuthHeaders()
    );
    return res.data;
}

export async function deleteDonation(id) {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}
