import axios from "axios";

const API_URL = "http://localhost:3000/auth";


export async function login(email, password) {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    return res.data; //En este mansaje se devuelve el token
}
export async function recoverPassword(email, password, confirmPassword) {
    const res = await axios.put(
        `${API_URL}/recoverPassword`,
        { email, password, confirmPassword }
    );
    return res.data;
}