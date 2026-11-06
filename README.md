# SOLIDATA

**SOLIDATA** es una aplicación web del equipo NIVORA para acompañar la gestión del Banco de Alimentos Buenos Aires (BAA). Centraliza información de instituciones, necesidades, donaciones e inventario para facilitar el seguimiento de alimentos desde su registro hasta la entrega.

## Objetivo

Facilitar el registro y consulta de necesidades institucionales, donaciones, artículos e inventario, con información accesible para el personal y las instituciones participantes.

## Funcionalidades de esta beta

- Inicio de sesión y registro de usuarios e instituciones.
- Gestión básica de usuarios, instituciones y artículos.
- Registro, consulta, edición y seguimiento de donaciones e ítems.
- Consulta y administración de necesidades.
- Consulta y gestión de inventario.
- Historial de donaciones y tablero de seguimiento de entregas.
- Reportes de donaciones, stock y necesidades, con descarga CSV.
- Mapa del Home con instituciones ubicadas por dirección/localidad cuando se puede verificar; las ubicaciones por localidad se señalan como aproximadas.
- Navegación por rol, perfil y páginas de secciones todavía en desarrollo.

La beta no incluye todavía una asignación automática de cantidades desde necesidades ni reserva automática de inventario. El tablero de entregas registra el estado de las donaciones con las operaciones disponibles en la API.

## Tecnologías

- **Frontend:** React 19, Vite, React Router, Material UI, Leaflet y React Leaflet.
- **Backend:** Node.js, Express 5 y Sequelize 6.
- **Base de datos:** PostgreSQL (`pg`).
- **Autenticación:** JSON Web Tokens y bcrypt.
- **Mapas:** OpenStreetMap y geocodificación Nominatim; no requiere una clave paga de Google Maps.

## Estructura

```text
api/                 API Express, modelos Sequelize, rutas, controladores y utilidades
client/              Aplicación React/Vite
buckup/              Exportaciones PostgreSQL y carga SQL opcional de instituciones ficticias
```

## Requisitos

- Node.js y npm.
- PostgreSQL instalado y en ejecución.
- Una base de datos PostgreSQL para SOLIDATA.

## Instalación y configuración

1. Crear una base de datos llamada `Solidata` (o elegir otro nombre para `DB_NAME`).
2. En `api`, instalar dependencias y crear el archivo local de configuración:

   ```bash
   cd api
   npm install
   ```

   Copiar `.env.example` como `.env` y completar los valores locales. La conexión actual usa el usuario PostgreSQL `postgres` y toma de las variables el host, la base y la contraseña.

3. No publiques `.env` ni claves reales. `JWT_SECRET` debe ser una cadena privada propia del entorno.

El backend sincroniza los modelos Sequelize al iniciarse (`sequelize.sync({ alter: true })`), así que puede crear o ajustar tablas al conectarse. Para conservar datos importantes, hacé un respaldo antes de cambiar el esquema.

## Ejecutar

Terminal 1, backend:

```bash
cd api
npm start
```

La API escucha en el puerto indicado por `PORT` (por defecto, `3000`).

Terminal 2, frontend:

```bash
cd client
npm install
npm run dev
```

Vite muestra la dirección local, normalmente `http://localhost:5173`. La API permite solicitudes CORS desde ese origen.

## Datos de demostración

En `buckup/` hay exportaciones PostgreSQL en formato de respaldo personalizado, no archivos SQL de texto plano. Se pueden restaurar en una base de prueba con `pg_restore` o con la opción de restauración de DBeaver. Revisá el destino antes de restaurar: la operación puede reemplazar datos existentes. No uses información de demostración como datos de producción.

Para añadir cinco instituciones ficticias de CABA a una base ya inicializada, ejecutá `buckup/seed-institutions-caba.sql` desde DBeaver sobre la base de prueba. Luego, en el Home, usá **Revisar direcciones** para ubicar las nuevas filas. Solo se guardan marcadores si el geocodificador confirma la localidad; esos puntos son aproximados.

## Estado

SOLIDATA es una **beta escolar**: prioriza una experiencia presentable y los flujos principales. Algunos reportes o acciones pueden depender de los permisos y datos cargados en la base; la asignación por necesidad, la reserva de stock y la confirmación independiente por parte de la institución quedan como trabajo futuro.
