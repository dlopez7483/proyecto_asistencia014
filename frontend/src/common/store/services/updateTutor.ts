import service from "@common/services/Service";
import { AxiosError } from "axios";

export const updateTutor = async (
  tutor: Map<string, string | number>,
  id: number
) => {
  try {
    console.log(tutor);
    const response = await service.put(
      `/user/Editar_practicante/${id}`,
      tutor,
      {
        headers: {
          Authorization:
            "Bearer " +
            JSON.parse(sessionStorage.getItem("_lab014_token") || "{}").token,
        },
      }
    );
    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;
    const response = axiosError.response?.data as Record<string, string>;
    return { ...response, status: axiosError.response?.status };
  }
};
