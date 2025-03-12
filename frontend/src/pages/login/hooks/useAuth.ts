import loginFunction from "../services/loginFunction";
import { useAuthActions } from "@common/store/hooks/useAuthActions";
import Swal from "sweetalert2";

export const useAuth = (carne: string, contrasenia: string, rol: number) => {
  const { setAuthAction } = useAuthActions();

  const login = async () => {
    const response = await loginFunction(
      carne,
      contrasenia,
      rol
    );

    if (response.status === 200) {
      setAuthAction({
        carne: carne,
        rol: rol,
        token: response.token,
      });

      if (rol === 1) window.location.href = "/dashboard-admin";
      else if (rol === 2) window.location.href = "/dashboard-tutor";
    } else
      Swal.fire({
        icon: "error",
        title: "Error al Inicio de Sesión",
        text: response.mensaje,
      });
  };

  return {
    login,
  };
};
