use Asistencia_013_014;

-- Insertar roles
INSERT INTO Rol (Rol) VALUES ('Admin'), ('Auxiliar');

-- Insertar auxiliares
INSERT INTO Auxiliar (Nombre, Apellido, Carne, Telefono, Contrasenia, Codigo_RFID, Id_rol) 
VALUES 
('Juan', 'Pérez', 'A12345678', '50212345678', '$2a$12$NkhTkuAsmBzlXPME/oRJA.a9insU72zSX.0Kscj/YBmpBT2qZQ59S', 'RFID001', 2),
('María', 'Gómez', 'A87654321', '50287654321', 'hashed_password2', 'RFID002', 2);

-- Insertar horarios
INSERT INTO Horario (Dia_semana, Hora_entrada, Hora_salida) 
VALUES 
('Lunes', '08:00:00', '12:00:00'),
('Martes', '09:00:00', '13:00:00'),
('Miércoles', '14:00:00', '18:00:00');

-- Asignar horarios a auxiliares
INSERT INTO Auxiliar_Horario (Id_auxiliar, Id_horario) 
VALUES 
(2, 1),  -- Juan tiene horario el lunes
(2, 2),  -- María tiene horario el martes
(3, 3);  -- María también trabaja el miércoles

-- Registrar asistencias de entrada
INSERT INTO Asistencia_Entrada (Id_auxiliar, Id_horario, Fecha) 
VALUES 
(2, 1, '2025-03-21'),
(3, 3, '2025-03-21');

-- Registrar asistencias de salida
INSERT INTO Asistencia_Salida (Id_auxiliar, Id_horario, Fecha) 
VALUES 
(2, 1, '2025-03-21'),
(3, 3, '2025-03-21');

-- Insertar configuración
INSERT INTO Configuracion (Periodo_horarios) VALUES (1);
