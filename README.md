# Library-Management

**Sistema de Gestión de Bibliotecas**  
Proyecto Nest.js para administrar bibliotecas y libros, incluyendo asociación biblioteca–libro, documentación Swagger, pruebas unitarias y E2E, colección de Postman y CI/CD.

---

## ✨ Características

- CRUD de **Libraries** (Bibliotecas)  
- CRUD de **Books** (Libros)  
- Asociación **Many-to-Many** entre bibliotecas y libros (entidad intermedia `LibraryBook`)  
- Validaciones de negocio (horarios, fechas, UUIDs)  
- **Swagger UI** con ejemplos de payload  
- **Jest**: pruebas unitarias (≥ 90 % cobertura)  
- **SuperTest**: pruebas E2E  
- **Postman**: 3 colecciones para todos los escenarios  
- **GitHub Actions**: pipeline de CI para lint, tests y cobertura  

---

## 📋 Requisitos

- Node.js ≥ 16  
- npm ≥ 8  
- Docker & Docker Compose  
- PostgreSQL (se levanta en contenedor Docker)  

---

## ⚙️ Configuración

1. Clona el repositorio y entra en la carpeta:

   ```bash
   git clone https://github.com/tu-usuario/library-management.git
   cd library-management
   ```

2. Copia el archivo de variables de entorno y ajústalo si es necesario:

   ```bash
   cp .env.example .env
   ```

   Edita `.env` con tus parámetros:

   ```dotenv
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=postgres
   DB_PASS=postgres
   DB_NAME=library_db
   PORT=3000
   ```

---

## 🐳 Levantar la base de datos

```bash
docker-compose up -d
```

- Contenedor `db` de PostgreSQL en el puerto 5432.  
- Volumen `db_data` para persistencia.  

---

## 🚀 Ejecutar la aplicación

```bash
npm install
npm run start:dev
```

La API estará disponible en `http://localhost:3000`.

---

## 📖 Documentación Swagger

- Swagger UI: `http://localhost:3000/api`  
- JSON OpenAPI: `docs/swagger.json`  
- YAML OpenAPI: `docs/swagger.yaml`  

---

## ✅ Pruebas


---

## 🧪 Colecciones Postman

Importa los JSON que están en la carpeta `collections/`:

- `Libraries.postman_collection.json`  
- `Books.postman_collection.json`  
- `Library-Books.postman_collection.json`  

Define en tu entorno de Postman las variables:

- `base_url = http://localhost:3000`  
- `invalidLibraryId = 00000000-0000-0000-0000-000000000000`  
- `invalidBookId    = 00000000-0000-0000-0000-000000000000`  


---

## 📦 Release

- Versión final: **v1.0.0**  
- Tag en GitHub: `v1.0.0`  
- Asset ZIP: `library-management-v1.0.0.zip`  

---

## 📄 Licencia

MIT © 2025 — Fernando Copete  
