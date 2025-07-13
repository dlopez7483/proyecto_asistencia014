import { User } from "@common/interfaces/User";
import service from "@common/services/Service";
import { AxiosError } from "axios";

export const registrarTutor = async (data: User) => {
  const body = {
    nombre: data.Nombre,
    apellido: data.Apellido,
    carne: data.Carne,
    telefono: data.Telefono,
    contrasenia: data.Contrasenia,
    codigo_rfid: data.Codigo_RFID,
    id_rol: 2,
  };
  
  try {
    const res = await service.post("/user/admin/register", body, {
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
