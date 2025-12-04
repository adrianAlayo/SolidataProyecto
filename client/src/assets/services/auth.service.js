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
export async function RegisterInstitution(first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type) {
    const res = await axios.post(`${API_URL}/register/institution`, {first_name,last_name,email,phone,password,name_inst,location_inst,type_inst,type});
    return res.data;
}