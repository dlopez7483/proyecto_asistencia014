import { createBrowserRouter, Navigate } from "react-router-dom";

import Login from "@pages/login";
import Administrador from "@pages/usuarios/administrador";
import Tutor from "@pages/usuarios/tutor";
import AdminTutores from "@pages/usuarios/administrador/tutores";
import AdminHorarios from "@pages/usuarios/administrador/horarios";
import Reportes from "@pages/usuarios/administrador/reportes";
import Perfil from "@pages/usuarios/administrador/perfil";
import ReporteIndividual from "@pages/usuarios/tutor/reportes/ReporteIndividual";
import VerHorario from "@pages/usuarios/tutor/horario/verhorario";
//import AuthVerification from "@common/components/AuthVerification";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      //<AuthVerification>
      <Login />
      //</AuthVerification>
    ),
    errorElement: <div>404</div>,
  },
  {
    path: "dashboard-admin",
    element: <Administrador />,
    children: [
      {
        path: "",
        element: <Navigate to="tutores" />,
      },
      {
        path: "tutores",
        element: <AdminTutores />,
      },
      {
        path: "horarios",
        element: <AdminHorarios />,
      },
      {
        path: "reportes",
        element: <Reportes />,
      },
      {
        path: "perfil",
        element: <Perfil />,
      },
    ],
  },
  {
    path: "dashboard-tutor",
    element: <Tutor />,
    children: [
      {
        path: "",
        element: <div>Dashboard</div>,
      },
      {
        path: "tutores",
        element: <div>Tutor</div>,
      },
      {
        path: "horarios",
        element: <VerHorario />,
      },
      {
        path: "reportes",
        element: <ReporteIndividual />,
      },
    ],
  },
]);

export { router };
