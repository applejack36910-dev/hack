import axios from "axios";

const API = "http://localhost:8080/api/participants";

export const getAll = () => axios.get(API);
export const add = (data) => axios.post(API, data);
export const update = (id, data) => axios.put(`${API}/${id}`, data);
export const remove = (id) => axios.delete(`${API}/${id}`);
export const getOne = (id) => axios.get(`${API}/${id}`);
