// src/services/user.service.js
import axios from "axios";

const API_URL = "http://localhost:3000/articles";

// Token para rutas protegidas
function getAuthHeaders() {
    return {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    };
}


export async function CreateArticle(name, category, variant, unit) {
    const res = await axios.post(
        `${API_URL}/`,
        { name, category, variant, unit },
        getAuthHeaders()
    );
    return res.data;
}



export async function GetArticles() {
    const res = await axios.get(`${API_URL}/`, getAuthHeaders());
    return res.data;
}

export async function GetArticle(id) {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeaders());
    return res.data;
}

export async function UpdateArticle(id, data) {
    const res = await axios.put(
        `${API_URL}/${id}`,
        data,
        getAuthHeaders()
    );
    return res.data;
}

export async function DeleteArticle(id) {
    const res = await axios.delete(
        `${API_URL}/${id}`,
        getAuthHeaders()
    );
    return res.data;
}