import axios from "axios";

const API_URL = "http://localhost:3000";

export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
