# Nombre del Proyecto

Descripción breve del proyecto — qué hace y para quién.

---

## Tecnologías usadas

- [Node.js](https://nodejs.org/) v18+
- [Express](https://expressjs.com/) v5
- [MySQL](https://www.mysql.com/) + [mysql2](https://www.npmjs.com/package/mysql2)
- [bcrypt](https://www.npmjs.com/package/bcrypt) — cifrado de contraseñas
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) — autenticación JWT
- [dotenv](https://www.npmjs.com/package/dotenv) — variables de entorno

---

## Requisitos previos

Antes de instalar el proyecto, asegúrate de tener:

- Node.js v18 o superior — [descargar aquí](https://nodejs.org/)
- MySQL instalado y en ejecución
- Un cliente REST para probar la API (recomendado: [Postman](https://www.postman.com/))

---

## Instalación

1. Clona el repositorio:

   ```bash
   git clone <url-del-repositorio>
   cd <nombre-del-proyecto>
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea el archivo `.env` a partir del ejemplo:

   ```bash
   cp .env_example .env
   ```

4. Rellena las variables de entorno en el `.env` (ver sección siguiente).

5. Importa el SQL de la base de datos:
   - Abre MySQL Workbench
   - Abre el archivo `src/config/project.sql` y ejecútalo para crear la base de datos y las tablas
   - Si existe `src/config/seeds.sql`, ejecútalo también para cargar los datos iniciales

6. Arranca el servidor:
   ```bash
   npm run dev
   ```

---

## Variables de entorno

Copia `.env_example` a `.env` y rellena los valores:

```env
PORT=3000               # Puerto en el que escucha el servidor

HOST_DB=localhost       # Host de la base de datos
PORT_DB=3306            # Puerto de MySQL (3306 por defecto)
USER_DB=                # Usuario de la base de datos
PASSWORD_DB=            # Contraseña de la base de datos
NAME_DB=                # Nombre de la base de datos

JWT_SECRET_KEY=         # Clave secreta para firmar los tokens JWT (elige una cadena larga y segura)
```

> ⚠️ Nunca subas el archivo `.env` al repositorio. Está incluido en el `.gitignore`.

---

## Estructura del proyecto

```
src/
├── config/
│   ├── connection.js
│   └── project.sql
├── controllers/
│   └── user.controller.js
├── middleware/
│   ├── auth.js
│   └── role.js
├── models/
│   └── user.model.js
├── routes/
│   ├── api.routes.js
│   └── api_routes/
│       └── user.route.js
├── utils/
│   └── jwt.js
└── index.js
```

| Fichero                           | Descripción                                              |
| --------------------------------- | -------------------------------------------------------- |
| `config/connection.js`            | Pool de conexiones a MySQL                               |
| `config/project.sql`              | SQL del proyecto (CREATE DATABASE, CREATE TABLE...)      |
| `controllers/user.controller.js`  | Lógica de negocio de usuarios (register, login, profile) |
| `middleware/auth.js`              | Middleware de autenticación — verifica el token JWT      |
| `middleware/role.js`              | Middleware de autorización — verifica el rol del usuario |
| `models/user.model.js`            | Queries SQL de la tabla users                            |
| `routes/api.routes.js`            | Enrutador principal — registra todas las rutas           |
| `routes/api_routes/user.route.js` | Rutas de usuarios                                        |
| `utils/jwt.js`                    | Funciones para crear y verificar tokens JWT              |
| `index.js`                        | Punto de entrada — configura y arranca el servidor       |

---

## Endpoints de ejemplo

### Usuarios

| Método | Ruta            | Acceso  | Descripción                                |
| ------ | --------------- | ------- | ------------------------------------------ |
| POST   | `/api/register` | Público | Registra un nuevo usuario                  |
| POST   | `/api/login`    | Público | Inicia sesión y devuelve un token JWT      |
| GET    | `/api/profile`  | Privado | Devuelve los datos del usuario autenticado |

> Las rutas privadas requieren el token JWT en el header:
>
> ```
> Authorization: Bearer <token>
> ```

---

## Scripts disponibles

| Comando       | Descripción                                                   |
| ------------- | ------------------------------------------------------------- |
| `npm start`   | Arranca el servidor en producción                             |
| `npm run dev` | Arranca el servidor en modo desarrollo con recarga automática |

> ⚠️ `npm run dev` usa `node --watch`, disponible a partir de **Node.js v18**. No necesita `nodemon`.

---

## Cómo añadir un nuevo recurso

Sigue estos pasos cada vez que necesites añadir un nuevo recurso a la API (por ejemplo: `product`, `order`, `category`...):

1. **Model** — crea `src/models/nombreRecurso.model.js` con las queries SQL del recurso.

2. **Controller** — crea `src/controllers/nombreRecurso.controller.js` con la lógica de negocio.

3. **Route** — crea `src/routes/api_routes/nombreRecurso.route.js` con los endpoints del recurso.

4. **Registra la ruta** en `src/routes/api.routes.js`:

   ```js
   router.use("/", require("./api_routes/nombreRecurso.route"));
   ```

5. **Añade el SQL** de la nueva tabla en `src/config/project.sql`.

---

## Autor

Nombre — [GitHub](https://github.com/tu-usuario)
