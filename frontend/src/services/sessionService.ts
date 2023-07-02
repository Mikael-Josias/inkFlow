import { api } from "./api";

type ServiceAPIProps = {
  email: string,
  password: string,
}

export const serviceAPI = async (data: ServiceAPIProps) => {
  const response = await api.post("/session", data);
  return response.data;
}