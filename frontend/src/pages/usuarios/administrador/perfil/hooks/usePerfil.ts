/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth } from "@common/interfaces/Auth";
import { useAuthActions } from "@common/store/hooks";
import { updateTutor } from "@common/store/services";
import Swal from "sweetalert2";

export const usePerfil = () => {
  const { setAuthAction } = useAuthActions();

  const handleUpdate = (datos: any, auth: Auth) => {
    updateTutor(datos, 1).then((response) => {
      const newAuth = {
        ...auth,
        carne: datos.get("carne_nuevo") ? datos.get("carne_nuevo") : auth.carne,
      };
      console.log("Response:", newAuth);
      if (response.status === 200) {
        setAuthAction(newAuth);
        sessionStorage.setItem("_lab014_token", JSON.stringify(newAuth));
        Swal.fire({
          icon: "success",
          title: "Actualización exitosa",
          text: "Los datos se han actualizado correctamente.",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          window.location.reload();
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Error al actualizar los datos.",
          showConfirmButton: true,
        });
      }
    });
  };

  return { handleUpdate };
};
