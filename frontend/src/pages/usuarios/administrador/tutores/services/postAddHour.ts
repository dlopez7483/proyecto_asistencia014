/* eslint-disable @typescript-eslint/no-explicit-any */
import service from "@common/services/Service";
import { AxiosError } from "axios";

export const postAddHour = async (data: any) => {

  try {
    const res = await service.post(`/user/admin/set_hours`, data, {
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
