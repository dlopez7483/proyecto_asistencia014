import React from "react";
import { config } from "@config/config";

export default function AdminVerification(props: {
  children?: React.ReactNode;
}) {
  const authSession = JSON.parse(
    sessionStorage.getItem(config.SESSION_AUTH) || "{}"
  );
  const rol = authSession.rol;

  if (rol == 1) {
    return <>{props.children}</>;
  } else {
    window.location.href = "/";
    return null;
  }
}
