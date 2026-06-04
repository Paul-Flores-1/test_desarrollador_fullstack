# Plataforma de Catálogo de Productos

## Descripción y Objetivo
Plataforma web Full Stack para la administración de un catálogo de productos. El sistema permite la gestión integral del inventario, incorporando autenticación segura mediante JSON Web Tokens (JWT), control de accesos basado en roles (RBAC), vistas modulares y la generación de reportes exportables.

## Funcionalidades Implementadas
* **Autenticación y Seguridad:** Inicio de sesión protegido con JWT. Protección de credenciales y llaves secretas mediante variables de entorno (`.env`).
* **Control de Roles (RBAC):** Sistema de permisos dinámico. Los administradores tienen acceso total al CRUD de usuarios e inventario, mientras que los empleados regulares cuentan con permisos de solo lectura en secciones críticas.
* **Arquitectura Modular:** Interfaz de usuario segmentada en vistas independientes (Dashboard, Productos y Usuarios) para una mejor experiencia de navegación y escalabilidad del código.
* **CRUD Asíncrono:** Operaciones de creación, lectura, actualización y eliminación consumiendo la API REST de forma asíncrona mediante Fetch API (Vanilla JavaScript).
* **Reportes:** Generación y descarga de reporte de inventario en formato CSV desde el backend.

## Arquitectura y Decisiones de Diseño
* **Seguridad API y UI:** El backend bloquea las peticiones no autorizadas mediante las clases `IsAdminUser` e `IsAuthenticated` de Django REST Framework. En el frontend, el token JWT es decodificado para adaptar la interfaz visual (ocultando botones de eliminación/creación) dependiendo del rol del usuario, evitando accesos indebidos.
* **Diseño UI/UX:** Se implementó Bootstrap 5 junto con el tema Bootswatch (Zephyr) y Bootstrap Icons para lograr una interfaz moderna, limpia y responsiva que se aleja de las plantillas genéricas.

## Tecnologías Utilizadas
* **Backend:** Python, Django y Django REST Framework
* **Base de Datos:** PostgreSQL
* **Frontend:** HTML5, CSS3, JavaScript Vanilla y Bootswatch
* **Seguridad y Utilidades:** `djangorestframework-simplejwt`, `python-dotenv`

## Pasos de Instalación y Despliegue Local

Sigue estas instrucciones paso a paso para levantar el proyecto en un entorno local:

1. **Clonar repositorio:**
   ```bash
   git clone <AQUI_PONDRAS_LA_LIGA_DE_TU_REPO>
   cd <nombre_de_la_carpeta>


2. **Crear entorno virtual e iniciarlo:**

   python -m venv venv
    En Windows:
    venv\Scripts\activate

3. **Instalar dependencias:**

pip install -r requirements.txt

4. **Configurar Base de Datos:**
Debe tener PostgreSQL instalado. Crear una base de datos y actualizar las credenciales (NAME, USER, PASSWORD) en la sección DATABASES del archivo config/settings.py.

5. **Ejecutar migraciones:**

python manage.py makemigrations catalogo
python manage.py migrate

6. **Crear superusuario (Administrador del sistema):**

python manage.py createsuperuser

7. **Levantar servidor:**

python manage.py runserver


Autor: Alan Paul Santiago Flores
