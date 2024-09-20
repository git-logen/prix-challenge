# Prix Challenge API

## Descripción

Este proyecto es una API RESTful desarrollada como parte del Prix Challenge. La API proporciona operaciones CRUD para usuarios y productos, utilizando SQLite como base de datos.

## Características

- Autenticación de usuarios
- Gestión de usuarios (CRUD)
- Gestión de productos (CRUD)
- Middleware de autorización
- Manejo de errores personalizado
- Validación de datos manual

## Tecnologías utilizadas

- Node.js
- Express.js
- SQLite3
- JSON Web Tokens (JWT)
- bcrypt para hash de contraseñas

## Requisitos previos

- Node.js (versión 14 o superior)
- npm (normalmente viene con Node.js)

## Instalación


1. Instala las dependencias: npm install

2. Crea un archivo `.env` en la raíz del proyecto y copia las variables que estan en el .env.example



## Ejecución

Para iniciar el servidor en modo de desarrollo: npm run dev

Para iniciar el servidor en modo de producción: npm start


## Rutas de la API

### Autenticación

- `POST /api/register`: Registrar un nuevo usuario
- `POST /api/login`: Iniciar sesión

### Usuarios

- `GET /api/users`: Obtener todos los usuarios (requiere autenticación)
- `PUT /api/users/:id`: Actualizar un usuario (requiere autenticación)
- `DELETE /api/users/:id`: Eliminar un usuario (requiere autenticación)

### Productos

- `POST /api/products`: Crear un nuevo producto (requiere autenticación)
- `GET /api/products`: Obtener todos los productos (requiere autenticación)
- `PUT /api/products/:id`: Actualizar un producto (requiere autenticación y propiedad)
- `DELETE /api/products/:id`: Eliminar un producto (requiere autenticación y propiedad)

## Seguridad

- Se utiliza bcrypt para el hash de contraseñas
- JWT para la autenticación de usuarios
- Middleware de autorización para proteger rutas
- Validación manual de datos de entrada

## Mejoras futuras

- Implementar una biblioteca de validación como Joi o Zod para una validación de datos más robusta (esto no se realizo pues no estaba en las ordenes del ejercicio)
- Añadir pruebas unitarias y de integración
- Implementar una arquitectura más escalable como Clean Architecture o Hexagonal si el proyecto crece
- Añadir documentación de la API con Swagger