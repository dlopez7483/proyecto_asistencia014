import React from "react";
import { Navigate } from "react-router";
import { config } from "@config/config";

interface Props {
  children?: React.ReactNode;
}

export default function AuthVerification(props: Props) {
  const authSession = sessionStorage.getItem(config.SESSION_AUTH);

  function verifyAuth() {
    if (!authSession) {
      return props.children;
    } else {
      const auth = JSON.parse(authSession);
      if (auth.rol === 1) {
        return <Navigate to="/dashboard-admin" />;
      } else if (auth.rol === 2) {
        return <Navigate to="/dashboard-tutor" />;
      } else {
        sessionStorage.removeItem(config.SESSION_AUTH);
        return props.children;
      }
    }
  }

  return verifyAuth();
}
