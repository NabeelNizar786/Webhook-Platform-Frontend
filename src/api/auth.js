import axios from "axios";

const API_URL = "http://13.205.2.110/api";

export const login = (data) => axios.post(`${API_URL}/auth/login`, data);

export const register = (data) => axios.post(`${API_URL}/auth/register`, data);
