import service from "@common/services/Service";
import { AxiosError } from "axios";

export const servicesEstadoSalidas = () => {

  const changeEstadoSalidas = async () => {
    try {
      const res = await service.put(
        "/user/admin/changeSalidasExtemporaneas",
        null,
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

  const getEstadoSalidas = async () => {
    try {
      const res = await service.get("/auth/obtener_estado_salidas_extemporaneas");
      return { ...res.data, status: res.status };
    } catch (error) {
      const axiosError = error as AxiosError;
      const response = axiosError.response?.data as Record<string, string>;
      return { ...response, status: axiosError.response?.status };
    }
  };

  return {
    changeEstadoSalidas,
    getEstadoSalidas,
  };
};
