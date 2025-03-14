interface User {
  readonly id_usuario: number;
  nombre: string;
  apellido: string;
  carne: string;
  telefono: string;
  contrasenia: string;
  codigo_RFID?: string;
  rol: number;
}

export { User, UserLogged };
