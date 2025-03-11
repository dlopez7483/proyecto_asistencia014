import service from "@common/services/Service";
import { AxiosError } from "axios";

export default async function loginFunction(
  carne: string,
  contrasena: string,
  rol: number
) {
  try {
    const res = await service.post("/auth/login", { carne, contrasena, rol });
    return { ...res.data, status: res.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as Record<string, string>;
    return { ...response, status: axiosError.response?.status };
  }
}
