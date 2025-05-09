import axios from "axios";

const API = axios.create({ baseURL: import.meta.env.VITE_BASE_URL })

API.interceptors.request.use((req) => {
    const token = localStorage.getItem("token");
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});


export const getAllEmployees = () => API.get("/employees");
export const sendEmployDetails = (payload) => API.post("/employees/new", payload);
export const getEmployDetails = (id) => API.get(`/employees/${id}`);
export const updateEmployDetails = (id, payload) => API.patch(`/employees/${id}`, payload);
export const deleteEmploy = (id) => API.delete(`/employees/${id}`);

// ✅ Search API with query parameters
export const searchEmployees = (data) => API.post('/employees/search', data);

