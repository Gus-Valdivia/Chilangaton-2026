import api from "./axios";

export const fetchTianguis = () => api.get("/establecimientos/get-tianguis");
export const fetchMercados = () => api.get("/establecimientos/get-mercados");
export const fetchLocals = () => api.get("/establecimientos/get-locals");
