import service from "@common/services/Service";
import { AxiosError } from "axios";

export const changeEstadoPeriodoHorarios = () => {
  const deshabilitar_periodo_horarios = async () => {
    try {
      const res = await service.post(
        "/user/deshabilitar_periodo_horarios/admin",
        { estado: 0 },
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(sessionStorage.getItem("_lab014_token") || "{}").token,
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

  const habilitar_periodo_horarios = async () => {
    try {
      const res = await service.post(
        "/user/habilitar_periodo_horarios/admin",
        { estado: 1 },
        {
          headers: {
            Authorization:
              "Bearer " +
              JSON.parse(sessionStorage.getItem("_lab014_token") || "{}").token,
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

  const getEstadoPeriodoHorarios = async () => {
    try {
      const res = await service.get("/auth/obtener_estado_periodo_horarios");
      return { ...res.data, status: res.status };
    } catch (error) {
      const axiosError = error as AxiosError;
      const response = axiosError.response?.data as Record<string, string>;
      return { ...response, status: axiosError.response?.status };
    }
  };

  return {
    habilitar_periodo_horarios,
    deshabilitar_periodo_horarios,
    getEstadoPeriodoHorarios,
  };
};
