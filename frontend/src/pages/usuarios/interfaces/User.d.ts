interface User {
  nombre: string;
  apellido: string;
  carne: string;
  telefono: string;
  contrasenia: string;
  codigo_RFID: string;
}

interface UserLogged extends User {
  readonly id_usuario: number;
  readonly rol: number;
}

export { User, UserLogged };
