CREATE DATABASE Asistencia_013_014;
USE Asistencia_013_014;
CREATE TABLE Rol(
    Id_rol INT AUTO_INCREMENT PRIMARY KEY,
    Rol VARCHAR(15) NOT NULL
);

CREATE TABLE Auxiliar(
    Id_auxiliar INT AUTO_INCREMENT PRIMARY KEY,
    Nombre VARCHAR(100) NOT NULL,
    Apellido VARCHAR(100) NOT NULL,
    Carne VARCHAR(9) NOT NULL,
    Telefono VARCHAR(20) NOT NULL,
    Contrasenia VARCHAR(255) NOT NULL,
    Codigo_RFID VARCHAR(255) NULL,
    Id_rol INT NOT NULL,
    FOREIGN KEY (Id_rol) REFERENCES Rol(Id_rol)
);

CREATE TABLE Horario(
    Id_horario INT AUTO_INCREMENT PRIMARY KEY,
    Dia_semana VARCHAR(10) NOT NULL,
    Hora_entrada TIME NOT NULL,
    Hora_salida TIME NOT NULL
);

CREATE TABLE Auxiliar_Horario(
    Id_auxiliar INT NOT NULL,
    Id_horario INT NOT NULL,
    PRIMARY KEY (Id_auxiliar, Id_horario),
    FOREIGN KEY (Id_auxiliar) REFERENCES Auxiliar(Id_auxiliar),
    FOREIGN KEY (Id_horario) REFERENCES Horario(Id_horario)
);

CREATE TABLE Asistencia_Entrada(
    Id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    Id_auxiliar INT NOT NULL,
    Id_horario INT NOT NULL,
    Fecha DATE NOT NULL,
    Hora_marcacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_auxiliar) REFERENCES Auxiliar(Id_auxiliar),
    FOREIGN KEY (Id_horario) REFERENCES Horario(Id_horario)
);

CREATE TABLE Asistencia_Salida(
    Id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    Id_auxiliar INT NOT NULL,
    Id_horario INT NOT NULL,
    Fecha DATE NOT NULL,
    Hora_marcacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_auxiliar) REFERENCES Auxiliar(Id_auxiliar),
    FOREIGN KEY (Id_horario) REFERENCES Horario(Id_horario)
);

CREATE TABLE Configuracion (
    Id_configuracion INT PRIMARY KEY AUTO_INCREMENT,
    Periodo_horarios TINYINT DEFAULT 0 -- '0' = cerrado, '1' = abierto
);

INSERT INTO Rol(Rol) VALUES('Admin');
INSERT INTO Rol(Rol) VALUES('Auxiliar');
INSERT INTO Configuracion(Periodo_horarios) VALUES('1');