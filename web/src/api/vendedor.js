import api from "./axios.js";

export const loginReq = (credentials) => api.post("/auth/login", credentials);
export const registerReq = (userData) => api.post("/auth/register", userData);
export const logoutReq = () => api.post("/auth/logout");
export const verifyTokenReq = () => api.get("/auth/me");
