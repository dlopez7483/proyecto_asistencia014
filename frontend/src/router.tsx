import { createBrowserRouter } from "react-router-dom";
import Dashboard_Admin from "./views/administrador/Dashboard_Admin";
import Dashboard_Tutor from "./views/tutor/Dashboard_Tutor";
import Login from "./views/login/Login";

const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <Login />,
            errorElement: <div>404</div>
        },
        {
            path: "dashboard-admin",
            element: <Dashboard_Admin />,
            children:
                [
                    {
                        path: "",
                        element: <div>Dashboard</div>,
                    },
                    {
                        path: "tutores",
                        element: <div>Usuarios</div>,
                    },
                    {
                        path: "horarios",
                        element: <div>Horarios</div>,
                    },
                    {
                        path: "reportes",
                        element: <div>Reportes</div>,
                    }
                ]
        },
        {
            path: "dashboard-tutor",
            element: <Dashboard_Tutor />,
            children:
                [
                    {
                        path: "",
                        element: <div>Dashboard</div>,
                    },
                    {
                        path: "tutores",
                        element: <div>Usuarios</div>,
                    },
                    {
                        path: "horarios",
                        element: <div>Horarios</div>,
                    },
                    {
                        path: "reportes",
                        element: <div>Reportes</div>,
                    }
                ]
        }
    ]
)

export { router };