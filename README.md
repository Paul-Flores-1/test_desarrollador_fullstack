# Plataforma de Catálogo de Productos

## Descripción y Objetivo
Plataforma web para la administración de un catálogo de productos. El sistema permite la gestión integral del inventario, incorporando autenticación segura de usuarios mediante JWT, un panel administrativo interactivo y la generación de reportes exportables.

## Funcionalidades Implementadas
* **Autenticación y Seguridad:** Inicio de sesión protegido con JSON Web Tokens (JWT).
* **Dashboard Administrativo:** Panel interactivo estilizado con Bootstrap 5, con indicadores del sistema en tiempo real.
* **CRUD de Productos:** Módulo completo (Crear, Leer, Actualizar, Eliminar) consumiendo una API REST de forma asíncrona mediante Fetch API.
* **Reportes:** Generación y descarga de reporte de inventario en formato CSV.

## Arquitectura y Decisiones de Diseño
* **Gestión de Usuarios centralizada:** Por motivos de seguridad y optimización, se tomó la decisión arquitectónica de mantener la creación y gestión de credenciales operativas exclusivamente a través del panel nativo de Django (`/admin/`). Al tratarse de una plataforma administrativa, esto centraliza el control de accesos en una herramienta robusta y previene vulnerabilidades.
* **Separación de responsabilidades:** El Dashboard (`/`) está diseñado estrictamente para la operación diaria del negocio (gestión del inventario y reportes), dejando las configuraciones críticas del sistema al administrador nativo.

## Tecnologías Utilizadas
* **Backend:** Python, Django y Django REST Framework
* **Base de Datos:** PostgreSQL
* **Frontend:** HTML, CSS, JavaScript Vanilla y Bootswatch (Zephyr)
* **Seguridad:** djangorestframework-simplejwt

## Pasos de Instalación y Deploy

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
