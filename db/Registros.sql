use Asistencia_013_014;

-- Insertar Roles
INSERT INTO Rol(Rol) VALUES('Admin'), ('Auxiliar');

-- Insertar Administrador
INSERT INTO Auxiliar (Nombre, Apellido, Carne, Telefono, Contrasenia, Id_rol) 
VALUES ("ECYS", "013-014", "1", "", "$2a$12$NkhTkuAsmBzlXPME/oRJA.a9insU72zSX.0Kscj/YBmpBT2qZQ59S", 1);

-- Insertar roles
INSERT INTO Rol (Rol) VALUES ('Admin'), ('Auxiliar');

-- Insertar configuración
INSERT INTO Configuracion (Periodo_horarios) VALUES (0); -- Periodo de Horarios
INSERT INTO Configuracion (Periodo_horarios) VALUES (0); -- Salidas Extemporanes