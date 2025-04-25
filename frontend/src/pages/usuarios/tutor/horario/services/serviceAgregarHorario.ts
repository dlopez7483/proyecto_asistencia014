import service from "@common/services/Service";
import { AxiosError } from "axios";

export const postHorarioAuxiliar = async (horarioData: { dia_semana: string, hora_entrada: string, hora_salida: string }) => {
  try {
    const token = JSON.parse(sessionStorage.getItem("_lab014_token") || "{}").token;
    if (!token) {
      throw new Error('Token no encontrado');
    }

    const res = await service.post(
      "/user/aux/agregarHorario",
      horarioData, 
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    return { ...res.data, status: res.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as Record<string, string>;
    return { ...response, status: axiosError.response?.status };
  }
};
