// src/services/user.service.js
import axios from "axios";

const API_URL = "http://localhost:3000/user";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}

export async function createUser(first_name, last_name, email, password, phone, role_id) {
    const res = await axios.post(
        `${API_URL}/`,
        { first_name, last_name, email, password, phone, role_id },
        getAuthHeaders()
    );
    return res.data;
}


export async function getUser(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}


export async function getUsers() {
    const res = await axios.get(`${API_URL}/`, getAuthHeaders());
    return res.data;
}


export async function getUsersActive() {
    const res = await axios.get(`${API_URL}/active`, getAuthHeaders());
    return res.data;
}


export async function getUsersInactive() {
    const res = await axios.get(`${API_URL}/inactive`, getAuthHeaders());
    return res.data;
}


export async function disableUser(id) {
    return axios.patch(`${API_URL}/disable/${id}`, {}, getAuthHeaders());
}

export async function activeUser(id) {
    return axios.patch(`${API_URL}/active/${id}`, {}, getAuthHeaders());
}



export async function deleteUser(id) {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}


export async function updateUser(id, fieldsToUpdate) {
    const res = await axios.put(
        `${API_URL}/${id}`,
        fieldsToUpdate,
        getAuthHeaders()
    );
    return res.data;
}


export async function getPasswordResetRequests() {
    const res = await axios.get(
        `${API_URL}/password-reset-requests?t=${Date.now()}`,
        getAuthHeaders()
    );
    return res.data;
}

export async function approvePasswordReset(id) {
    const res = await axios.patch(`${API_URL}/password-reset-requests/${id}/approve`, {}, getAuthHeaders());
    return res.data;
}
