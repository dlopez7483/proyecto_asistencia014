/* eslint-disable @typescript-eslint/no-explicit-any */
import { Auth } from "@common/interfaces/Auth";
import { useAuthActions } from "@common/store/hooks";
import { updateAuxData } from "../services/updateAux";
import Swal from "sweetalert2";

export const usePerfil = () => {
  const { setAuthAction } = useAuthActions();

  const handleUpdate = (datos: any, auth: Auth) => {
    const objDatos = Object.fromEntries(datos.entries());
  
    updateAuxData(auth.carne, objDatos).then((response) => {
      const newAuth = {
        ...auth,
        carne: datos.get("carne_nuevo") ? datos.get("carne_nuevo") : auth.carne,
      };
  
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
