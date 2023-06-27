import { api } from "./api";

const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
const auth = {
  headers: {
    Authorization: `Bearer ${token}`
  }
}

export const documentsAPI = async () => {
  const response = await api.get("/document/all", auth);
  return response.data;
}