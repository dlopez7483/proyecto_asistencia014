
DROP DATABASE IF EXISTS Asistencia_013_014;
CREATE DATABASE IF NOT EXISTS Asistencia_013_014;
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
    FOREIGN KEY (Id_rol) REFERENCES Rol(Id_rol) -- Admin: 1 Tutor 2
);
alter table Auxiliar add unique(Carne);
alter table Auxiliar add unique(Codigo_RFID);

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
    FOREIGN KEY (Id_auxiliar) REFERENCES Auxiliar(Id_auxiliar) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Id_horario) REFERENCES Horario(Id_horario)
);
SELECT * FROM  Auxiliar_Horario;

CREATE TABLE Asistencia_Entrada(
    Id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    Id_auxiliar INT NOT NULL,
    Id_horario INT,
    Fecha DATE NOT NULL,
    Hora_marcacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_auxiliar) REFERENCES Auxiliar(Id_auxiliar) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Id_horario) REFERENCES Horario(Id_horario)
);


CREATE TABLE Asistencia_Salida(
    Id_asistencia INT AUTO_INCREMENT PRIMARY KEY,
    Id_auxiliar INT NOT NULL,
    Id_horario INT,
    Fecha DATE NOT NULL,
    Hora_marcacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (Id_auxiliar) REFERENCES Auxiliar(Id_auxiliar) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (Id_horario) REFERENCES Horario(Id_horario)
);

CREATE TABLE Configuracion (
    Id_configuracion INT PRIMARY KEY AUTO_INCREMENT,
    Periodo_horarios TINYINT DEFAULT 0 -- '0' = cerrado, '1' = abierto
);

DELIMITER $$

CREATE PROCEDURE ObtenerHorariosAuxiliarPorRFID(
    IN p_Codigo_RFID VARCHAR(255), 
    IN p_DiaSemana VARCHAR(10)
)
BEGIN
    SELECT H.Id_horario, H.Dia_semana, H.Hora_entrada, H.Hora_salida, A.Id_auxiliar
    FROM Auxiliar A
    INNER JOIN Auxiliar_Horario AH ON A.Id_auxiliar = AH.Id_auxiliar
    INNER JOIN Horario H ON AH.Id_horario = H.Id_horario
    WHERE A.Codigo_RFID = p_Codigo_RFID 
    AND H.Dia_semana = p_DiaSemana;
END$$

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE registrarHorarioExtra(
	IN tutor INT,
    IN fecha DATE,
    IN entrada TIME,
    IN salida TIME
)
BEGIN
   insert into Horario(Dia_semana, Hora_entrada,Hora_salida) values ("Extra", entrada, salida);
   set @idHorario = LAST_INSERT_ID();

   insert INTO  Asistencia_Entrada(Id_auxiliar, Id_horario, Fecha, Hora_Marcacion) values (tutor, @idHorario, fecha, CONCAT(fecha," ",entrada));
   
   
   insert INTO  Asistencia_Salida(Id_auxiliar, Id_horario, Fecha, Hora_Marcacion) values (tutor, @idHorario, fecha, CONCAT(fecha," ",salida));
END$$

DELIMITER ;