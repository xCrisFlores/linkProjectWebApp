#LinkProject Api Primer avance (CRUD Usuarios)

Primer avance sobre la API para el proyecto, para utilizar la API simplemente clona este repositorio, debes tener instalado previamente GIT y su CLI para este paso:

```bash
https://github.com/xCrisFlores/LinkProjectApi.git
```
Una vez clonado el proyecto, debes instalar sus dependencias, para esto debes tener instalado Dotnet y su CLI la encuentras en este enlace: [Descarga Dotnet](https://dotnet.microsoft.com/download/dotnet "Descarga Dotnet")

Para instalar las dependencias, debes ejecutar los siguientes comandos:

```bash
cd LinkProjectApi
dotnet restore
dotnet build
```

Esto instalara las dependencias y compilara el proyecto para verificar si hay errores.
Antes de ejecutar la API debes crear su correspondiente base de datos, asegurate de tener Sql Server asi como la herramienta de administracion las encuentras en los siguientes enlaces:
- [Sql server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads "Sql server")
- [Sql server management studio](https://learn.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view "Sql server management studio")

Posteriormente abre la herramienta de administracion, y concecta tu "servidor local" crea una consulta Sql y ejecuta instrucion por instruccion los siguientes comandos:

```sql
CREATE DATABASE LinkprojectBDD
USE LinkprojectBDD
CREATE TABLE [User](
	code INT NOT NULL,
	email VARCHAR(50),
	password VARCHAR(50),
	name VARCHAR(100),
	path VARCHAR(100),
	PRIMARY KEY (code)
);

CREATE TABLE Student(
	student_code INT NOT NULL,
	phone VARCHAR(20),
	status VARCHAR(50),
	lab VARCHAR(100),
	biography VARCHAR(300),
	PRIMARY KEY (student_code)
);

CREATE TABLE Schedule(
	Student_code int NOT NULL,
	day VARCHAR(20),
	start_time TIME,
	end_time TIME,
	PRIMARY KEY (Student_code)
);

CREATE TABLE Skills(
	student_code int NOT NULL,
	skill VARCHAR(80),
	PRIMARY KEY (student_code)
);

CREATE TABLE Adviser(
	adviser_code INT NOT NULL,
	division VARCHAR(80),
	PRIMARY KEY (adviser_code)
);

ALTER TABLE Student
ADD CONSTRAINT FK_User_Code FOREIGN KEY (student_code) REFERENCES [User](code);

ALTER TABLE Schedule
ADD CONSTRAINT FK_Schedule_Id FOREIGN KEY (Student_code) REFERENCES [User](code);

ALTER TABLE Skills
ADD CONSTRAINT FK_Student_Code_skills FOREIGN KEY (student_code) REFERENCES [User](code);

ALTER TABLE Adviser
ADD CONSTRAINT FK_UserAdviser_Code FOREIGN KEY (adviser_code) REFERENCES [User](code);
```

De la misma forma, este script puedes encontrarlo en la raiz del proyecto,  posterior a esto puedes ejecutar la API, ejecuta el siguiente comando:

```bash
dotnet run
```
Segun el puerto que aparezca, abrelo en un navegador para hacer pruebas, la pantalla principal es una UI para realizar peticiones, puedes usar los JSONs de prueba del proyecto

