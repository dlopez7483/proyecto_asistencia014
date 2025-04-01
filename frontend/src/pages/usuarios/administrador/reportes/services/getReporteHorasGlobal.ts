import service from "@common/services/Service";
import { AxiosError } from "axios";

export const getReporteHorasGlobal = async () => {
    try {
      const res = await service.get(
        "/user/admin/reporte_global_horas",
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