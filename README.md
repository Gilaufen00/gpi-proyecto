# PETCARE HOME · Prototipo Mockup Interactivo (HTML + CSS + JS)

Este proyecto contiene el mockup interactivo de alta fidelidad desarrollado para la plataforma web **PETCARE HOME** (Servicios Integrales de Mascotas a Domicilio), diseñado de acuerdo estricto con la **Guía de Diseño de Pantallas** y el **Alcance del Proyecto** (definido en la Entrega 3 de Gerencia de Proyectos Informáticos - Politécnico Grancolombiano).

---

## 🎨 Sistema de Diseño Aplicado (*Playful Minimalist / Soft UI*)

- **Paleta Cromática Oficial:**
  - **Lila/Morado Principal:** `#6C5CE7` y `#372A7A` (navegación lateral fija, encabezados y elementos seleccionados).
  - **Fondo de Lienzo:** Lavanda muy claro (`#F6F5FC`).
  - **Tarjetas y Superficies:** Blanco puro (`#FFFFFF`) con sombras difusas *soft UI*.
  - **Acciones Principales:** Botones tipo píldora en color **Coral/Salmón** (`#FF7675`).
  - **Estados Visuales Pastel Normados:**
    - **Verde Pastel:** *Confirmada*, *Disponible*, *Activo* (`#E8F8F0`, texto `#059669`).
    - **Azul Pastel:** *En Camino* (`#EBF5FB`, texto `#0284C7`).
    - **Amarillo Pastel:** *En Servicio* (`#FEF9E7`, texto `#D97706`).
    - **Rosa/Rojo Pastel:** *Cancelada*, *No Disponible* (`#FEECEC`, texto `#DC2626`).
- **Formas y Radios:** Esquinas redondeadas entre **20 y 35 px**; botones principales tipo píldora.
- **Tipografía:** *Plus Jakarta Sans* y *Nunito*, asegurando jerarquía visual clara y moderna.
- **Imágenes y Multimedia:** Espacios reservados limpios con marcos punteados e ilustraciones vectoriales SVG elegantes, sin romper enlaces externos y dejando el área libre para su colocación.
- **Iconografía:** Iconos vectoriales SVG limpios y sin sobreuso de emojis.

---

## 📑 Estructura de las 5 Pantallas Implementadas

### 1. Registro de Mascotas (`#view-pets`)
- **Panel izquierdo ilustrado:** Fondo lila claro degradado, con espacio reservado para ilustración central 2D y detalles decorativos sutiles (estrellas, corazones, huella).
- **Panel derecho (Formulario blanco):**
  - Título *"Nueva Mascota"* acompañado de una huella rosa suave.
  - Control circular punteado para cargar foto de la mascota con soporte de subida interactiva.
  - Campos obligatorios requeridos:
    - *Nombre de la Mascota* (placeholder `"Ej. Milo"`).
    - *Especie* (selector estilizado con `"■ Perro"` por defecto).
    - *Raza* a todo el ancho (placeholder `"Ej. Golden Retriever"`).
    - *Edad* y *Peso* en una fila, con sus selectores de unidades independientes (`Años/Meses` y `Kg/lb`).
    - *Antecedentes Médicos* en área de texto amplia.
  - Acciones: Botón coral *"Registrar Mascota"* y enlace centrado gris subrayado *"Cancelar"*.

### 2. Gestión de Planes de Servicios (`#view-plans`)
- **Columna izquierda (Lista y acciones CRUD):**
  - Título del módulo y buscador en tiempo real (`"Buscar plan..."`).
  - Botón coral `"+ Crear Plan"`.
  - Tarjetas redondeadas para cada plan con nombre, precio en pesos colombianos (`COP`), estado (`Activo`) y botones de acción CRUD (*Editar*, *Eliminar*, *Ver*).
  - Resaltado distintivo de la tarjeta activa.
- **Columna derecha (Detalle del plan):**
  - Tarjeta blanca grande con sombra suave, título centrado y espacio reservado para ilustración 2D.
  - Destacado de precio (`COP 95.000 / mes`) y badges (`"Estado: Activo"`, `"Mascotas Inscritas: 15"`).
  - Sección de **"Servicios incluidos"** en 2 columnas con checks verdes:
    - *Consulta General (2/año)*
    - *Vacunación Anual*
    - *Limpieza Dental (1/año)*
    - *Baño / Corte (1/mes)*
    - *Desparasitación Interna y Externa*
  - Botón coral inferior *"Modificar Plan"*.

### 3. Agenda de Citas y Visitas a Domicilio (`#view-appointments`)
- **Cabecera operativa:** Título y selector de vistas tipo cápsula (*"Calendario"* activo en lila, *"Lista"* y *"Mapa"* neutros).
- **Columna izquierda:**
  - Dos minicalendarios mensuales interactivos (Octubre y Noviembre 2026).
  - Rótulo de fecha con indicador de visitas (`"Visitas para Hoy · 11 de Octubre, 2026"`).
  - Tarjetas de citas con número (`#1024`, `#1025`, `#1026`), nombre de mascota, horario, badges de estado pastel (*Confirmada*, *En Camino*, *Cancelada*) y accesos CRUD.
- **Columna derecha (Detalle ampliado de la cita):**
  - Título con identificador y mascota (`"Cita #1024 - Max"`) y espacio para ilustración.
  - Datos clínicos y logísticos: *Servicio*, *Fecha*, *Hora*, *Dirección en Bogotá* y *Responsable con cargo*.
  - Badges de estado (*"Confirmada"*) y plan asociado (*"Esencial Canino"*).
  - Botón coral *"Modificar Cita"* y botón directo *"Registrar Tratamiento"*.

### 4. Registro de Tratamiento (Ventana Modal + Pantalla Base) (`#treatment-modal`)
- **Pantalla base clínica:** Historial con tabla de tratamientos previamente realizados a mascotas.
- **Ventana modal de alta fidelidad:**
  - Fondo oscurecido con capa negra semitransparente al 40% de opacidad y efecto blur.
  - Contenedor centrado blanco con esquinas redondeadas entre 24 y 30 px y sombra pronunciada.
  - Encabezado: *"Registrar Tratamiento - Cita #1024"*, botón de cierre `"✕"` discreto y subtítulo *"Registrar Tratamiento para Max"* con huella rosa.
  - Espacio para pequeña ilustración de perro con botiquín y 2 cápsulas de contexto:
    - *Cápsula 1:* `"Mascota: Max (Dueño: Juan Pérez)"`
    - *Cápsula 2:* `"Tipo de Servicio: Consulta Médica"`
  - Campos clínicos:
    - *Procedimiento Realizado* (área de texto).
    - *Observaciones Clínicas* (área de texto más amplia).
    - *Próximo Control (Opcional)* con selector de fecha e icono de calendario.
  - Acciones: Botón coral tipo píldora *"Registrar Tratamiento"* y botón secundario blanco con borde gris *"Cancelar"*.

### 5. Personal Responsable (`#view-staff`)
- **Columna izquierda (Lista de personal):**
  - Título y subtítulo *"Lista de Personal"*.
  - Buscador por nombre o cargo y botón coral `"+ Registrar Personal"`.
  - Tarjetas de colaboradores con iniciales, cargo, estado con badges pastel normados (*Disponible* verde pastel, *En Servicio* amarillo pastel, *No Disponible* rojo pastel) y acciones CRUD.
- **Columna derecha (Ficha del colaborador):**
  - Avatar / espacio reservado para ilustración 2D del colaborador junto a mascota.
  - Nombre, perfil, badge de disponibilidad y reseña visual (`★ 4.9 (45 reseñas)`).
  - Información básica: Documento de identidad, celular, correo electrónico y especialidad médica.
  - Horarios y disponibilidad semanal: Jornadas con fila interactiva de días **L–D** con marcas visuales en días activos.
  - Servicios asignados hoy: **Timeline vertical** con horas, nombres de mascotas y servicios.
  - Botones *"Modificar Ficha"* y *"Volver a Agenda"*.
  - Aviso de cumplimiento de privacidad y protección de datos (ficticios de acuerdo con la Ley 1581 de 2012).

---

## 🚀 Cómo Visualizar y Utilizar el Mockup

1. Abre el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Firefox, Safari).
2. Utiliza el **menú lateral persistente** para navegar de forma instantánea entre cualquiera de los 5 módulos obligatorios.
3. Puedes hacer clic en cualquiera de las tarjetas de planes, citas o colaboradores para ver cómo el panel lateral de detalle se actualiza dinámicamente con la información seleccionada.
4. Para abrir la **Ventana Modal de Tratamiento Clínico**, haz clic en el botón superior *"Modal Tratamiento (#1024)"* o en el botón *"Registrar Tratamiento"* dentro del detalle de una cita.
5. Puedes cerrar el modal haciendo clic en la `"✕"`, presionando la tecla `Escape`, o haciendo clic en el fondo semitransparente.
