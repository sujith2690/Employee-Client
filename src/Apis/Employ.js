import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

export const getAllEmployees = () => API.get("/employees");
export const sendEmployDetails = (payload) => API.post("/employees/new", payload);