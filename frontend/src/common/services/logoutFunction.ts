import { AxiosError } from "axios";
import service from "./Service";

export default async function logoutFunction() {
  try {
    const res = await service.post("/auth/logout");
    return { ...res.data, status: res.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as Record<string, string>;
    return { ...response, status: axiosError.response?.status };
  }
}
