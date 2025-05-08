import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL });

export const getEmployeesApi = () => API.get("/employees");
export const sendEmployDetails = () => API.post("/employees");