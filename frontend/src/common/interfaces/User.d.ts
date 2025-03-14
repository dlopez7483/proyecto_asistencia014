interface User {
  readonly Id_auxiliar: number;
  Nombre: string;
  Apellido: string;
  Carne: string;
  Telefono: string;
  Contrasenia?: string;
  Codigo_RFID?: string;
  Id_rol?: number;
}

export { User, UserLogged };
