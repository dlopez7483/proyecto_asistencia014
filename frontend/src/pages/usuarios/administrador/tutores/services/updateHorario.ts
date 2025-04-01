/* eslint-disable @typescript-eslint/no-explicit-any */
import service from "@common/services/Service";
import { AxiosError } from "axios";

export const updateHorario = async (data: any, carnet: string, idHorario: number) => {
  const body = {
    dia_semana: data.Dia_semana,
    hora_entrada: data.Hora_entrada,
    hora_salida: data.Hora_salida,
  };

  try {
    const res = await service.put(`/user/editar_horario/admin/${carnet}/${idHorario}`, body, {
      headers: {
        Authorization:
          "Bearer " +
          JSON.parse(sessionStorage.getItem("_lab014_token") || "{}").token,
      },
    });
    return { ...res.data, status: res.status };
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as Record<string, string>;
    return { ...response, status: axiosError.response?.status };
  }
};
