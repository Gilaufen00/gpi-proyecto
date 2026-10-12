/**
 * PETCARE HOME - Interactive Mockup Logic
 * Conexión e interactividad dinámica entre las 5 pantallas según la Guía de Diseño y Alcance PMI
 */

(function () {
  'use strict';

  // ========================================================================
  // BASE DE DATOS EN MEMORIA: PLANES DE SERVICIOS
  // ========================================================================
  const plansData = {
    1: {
      name: "Esencial Canino",
      price: "COP 95.000 / mes",
      status: "Activo",
      inscribed: "Mascotas Inscritas: 15",
      services: [
        "Consulta General (2/año)",
        "Vacunación Anual",
        "Limpieza Dental (1/año)",
        "Baño / Corte (1/mes)",
        "Desparasitación Interna y Externa"
      ]
    },
    2: {
      name: "Bienestar Felino",
      price: "COP 85.000 / mes",
      status: "Activo",
      inscribed: "Mascotas Inscritas: 24",
      services: [
        "Consulta Veterinaria Especializada (3/año)",
        "Vacunación Triple Felina",
        "Control Nutricional & Renal",
        "Peluquería Felina sin Sedación (bimensual)",
        "Desparasitación y Tratamiento de Bolas de Pelo"
      ]
    },
    3: {
      name: "Total Care VIP",
      price: "COP 145.000 / mes",
      status: "Activo",
      inscribed: "Mascotas Inscritas: 38",
      services: [
        "Consultas Médicas Domiciliarias Ilimitadas",
        "Plan Completo de Vacunación y Refuerzos",
        "Profilaxis y Limpieza Dental Ultrasónica",
        "Spa Canino / Felino Completo (2/mes)",
        "Atención de Emergencias y Traslado Prioritario"
      ]
    }
  };

  // ========================================================================
  // BASE DE DATOS EN MEMORIA: CITAS Y VISITAS PROGRAMADAS
  // ========================================================================
  const apptsData = {
    1024: {
      id: 1024,
      title: "Cita #1024 - Max",
      pet: "Max",
      species: "Canino",
      owner: "Juan Pérez",
      service: "Consulta Médica General a Domicilio",
      datetime: "11 de Octubre, 2026 · 09:00 AM - 10:15 AM",
      timeOnly: "09:00 AM - 10:15 AM",
      address: "Calle 127 # 15 - 42, Apto 502, Usaquén",
      staff: "Dr. Carlos Méndez (Médico Veterinario Titular)",
      staffShort: "Dr. Carlos Méndez",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Esencial Canino"
    },
    1025: {
      id: 1025,
      title: "Cita #1025 - Luna",
      pet: "Luna",
      species: "Felino",
      owner: "María Camila Gómez",
      service: "Vacunación y Desparasitación a Domicilio",
      datetime: "11 de Octubre, 2026 · 11:30 AM - 12:45 PM",
      timeOnly: "11:30 AM - 12:45 PM",
      address: "Carrera 7 # 116 - 20, Casa 4, Santa Bárbara",
      staff: "Dra. Diana Gómez (Especialista Felina)",
      staffShort: "Dra. Diana Gómez",
      statusText: "En Camino",
      statusClass: "on-way",
      plan: "Bienestar Felino"
    },
    1026: {
      id: 1026,
      title: "Cita #1026 - Toby",
      pet: "Toby",
      species: "Canino",
      owner: "Sandra Ortiz",
      service: "Baño Spa y Profilaxis Preventiva",
      datetime: "11 de Octubre, 2026 · 02:30 PM - 03:30 PM",
      timeOnly: "02:30 PM - 03:30 PM",
      address: "Av. Suba # 128A - 54, Bogotá",
      staff: "Andrés Silva (Estilista Canino)",
      staffShort: "Andrés Silva",
      statusText: "Cancelada",
      statusClass: "canceled",
      plan: "Total Care VIP"
    },
    1027: {
      id: 1027,
      title: "Cita #1027 - Rocky",
      pet: "Rocky",
      species: "Canino",
      owner: "Esteban Martínez",
      service: "Limpieza Dental y Revisión Ótica",
      datetime: "14 de Octubre, 2026 · 10:00 AM - 11:15 AM",
      timeOnly: "10:00 AM - 11:15 AM",
      address: "Carrera 15 # 124 - 10, Apto 301, Bogotá",
      staff: "Dr. Carlos Méndez (Médico Veterinario Titular)",
      staffShort: "Dr. Carlos Méndez",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Esencial Canino"
    },
    1028: {
      id: 1028,
      title: "Cita #1028 - Milo",
      pet: "Milo",
      species: "Canino",
      owner: "Andrea Peña",
      service: "Control Post-Operatorio y Cicatrización",
      datetime: "14 de Octubre, 2026 · 03:00 PM - 04:00 PM",
      timeOnly: "03:00 PM - 04:00 PM",
      address: "Calle 134 # 9 - 22, Casa 12, Bogotá",
      staff: "Dr. Carlos Méndez (Médico Veterinario Titular)",
      staffShort: "Dr. Carlos Méndez",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Total Care VIP"
    },
    1029: {
      id: 1029,
      title: "Cita #1029 - Simba",
      pet: "Simba",
      species: "Felino",
      owner: "Carolina Soto",
      service: "Vacunación Triple Felina y Antiparasitario",
      datetime: "16 de Octubre, 2026 · 09:30 AM - 10:45 AM",
      timeOnly: "09:30 AM - 10:45 AM",
      address: "Carrera 19 # 104 - 12, Bogotá",
      staff: "Dra. Diana Gómez (Especialista Felina)",
      staffShort: "Dra. Diana Gómez",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Bienestar Felino"
    },
    1030: {
      id: 1030,
      title: "Cita #1030 - Kiara",
      pet: "Kiara",
      species: "Canino",
      owner: "Jorge Rivas",
      service: "Evaluación Dermatológica y Raspado",
      datetime: "16 de Octubre, 2026 · 01:30 PM - 02:45 PM",
      timeOnly: "01:30 PM - 02:45 PM",
      address: "Calle 145 # 21 - 30, Bogotá",
      staff: "Dr. Carlos Méndez (Médico Veterinario Titular)",
      staffShort: "Dr. Carlos Méndez",
      statusText: "En Camino",
      statusClass: "on-way",
      plan: "Esencial Canino"
    },
    1031: {
      id: 1031,
      title: "Cita #1031 - Max",
      pet: "Max",
      species: "Canino",
      owner: "Juan Pérez",
      service: "Próximo Control Clínico y Refuerzo",
      datetime: "26 de Octubre, 2026 · 09:00 AM - 10:00 AM",
      timeOnly: "09:00 AM - 10:00 AM",
      address: "Calle 127 # 15 - 42, Usaquén, Bogotá",
      staff: "Dr. Carlos Méndez (Médico Veterinario Titular)",
      staffShort: "Dr. Carlos Méndez",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Esencial Canino"
    },
    1032: {
      id: 1032,
      title: "Cita #1032 - Bruno",
      pet: "Bruno",
      species: "Canino",
      owner: "Claudia Ruiz",
      service: "Corte Higiénico y Baño Medicado",
      datetime: "26 de Octubre, 2026 · 11:30 AM - 12:30 PM",
      timeOnly: "11:30 AM - 12:30 PM",
      address: "Calle 118 # 14 - 35, Bogotá",
      staff: "Andrés Silva (Estilista Canino)",
      staffShort: "Andrés Silva",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Total Care VIP"
    },
    1033: {
      id: 1033,
      title: "Cita #1033 - Coco",
      pet: "Coco",
      species: "Ave",
      owner: "Felipe Castro",
      service: "Revisión General y Corte de Pico",
      datetime: "9 de Noviembre, 2026 · 10:00 AM - 11:00 AM",
      timeOnly: "10:00 AM - 11:00 AM",
      address: "Carrera 11 # 85 - 20, Bogotá",
      staff: "Dr. Carlos Méndez (Médico Veterinario Titular)",
      staffShort: "Dr. Carlos Méndez",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Esencial Canino"
    },
    1034: {
      id: 1034,
      title: "Cita #1034 - Luna",
      pet: "Luna",
      species: "Felino",
      owner: "María Camila Gómez",
      service: "Control Nutricional y Curva de Peso",
      datetime: "9 de Noviembre, 2026 · 02:00 PM - 03:00 PM",
      timeOnly: "02:00 PM - 03:00 PM",
      address: "Carrera 7 # 116 - 20, Santa Bárbara",
      staff: "Dra. Diana Gómez (Especialista Felina)",
      staffShort: "Dra. Diana Gómez",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Bienestar Felino"
    }
  };

  // Mapeo de Fechas a IDs de Citas
  const appointmentsByDate = {
    "2026-10-11": [1024, 1025, 1026],
    "2026-10-14": [1027, 1028],
    "2026-10-16": [1029, 1030],
    "2026-10-26": [1031, 1032],
    "2026-11-09": [1033, 1034]
  };

  // Base de datos de Colaboradores
  const staffData = {
    1: {
      id: 1,
      name: "Dr. Carlos Méndez",
      profile: "Médico Veterinario Cirujano",
      gender: "man",
      statusText: "Disponible",
      statusClass: "available",
      rating: "★ 4.9 (45 reseñas)",
      doc: "C.C. 1.020.456.789",
      phone: "+57 312 456 7890",
      email: "carlos.mendez@petcarehome.com",
      spec: "Medicina General y Cirugía Menor",
      hours: "Jornada Semanal: Lunes a Viernes (08:00 AM - 05:00 PM)",
      activeDays: [true, true, true, true, true, false, false],
      timeline: [
        { time: "09:00 AM", title: "Max (Consulta Médica General)", addr: "Calle 127 # 15-42", state: "done" },
        { time: "11:00 AM", title: "Toby (Control y Limpieza de Oídos)", addr: "Cra 7 # 116-20", state: "next" },
        { time: "02:30 PM", title: "Simba (Seguimiento Domiciliario)", addr: "Carrera 19 # 104-12", state: "" }
      ]
    },
    2: {
      id: 2,
      name: "Dra. Diana Gómez",
      profile: "Especialista Felina y Vacunación",
      gender: "woman",
      statusText: "En Servicio",
      statusClass: "in-service",
      rating: "★ 4.8 (39 reseñas)",
      doc: "C.C. 1.032.789.123",
      phone: "+57 310 987 6543",
      email: "diana.gomez@petcarehome.com",
      spec: "Medicina Felina, Etología y Vacunación",
      hours: "Jornada Semanal: Martes a Sábado (09:00 AM - 06:00 PM)",
      activeDays: [false, true, true, true, true, true, false],
      timeline: [
        { time: "10:00 AM", title: "Mishi (Plan Vacunación Completo)", addr: "Calle 140 # 19-30", state: "done" },
        { time: "11:30 AM", title: "Luna (Visita Domiciliaria en curso)", addr: "Cra 7 # 116-20", state: "next" },
        { time: "04:00 PM", title: "Nala (Revisión Nutricional)", addr: "Calle 100 # 15-60", state: "" }
      ]
    },
    3: {
      id: 3,
      name: "Andrés Silva",
      profile: "Estilista Canino y Cuidador",
      gender: "man",
      statusText: "No Disponible",
      statusClass: "unavailable",
      rating: "★ 4.7 (28 reseñas)",
      doc: "C.C. 1.014.234.567",
      phone: "+57 315 222 3344",
      email: "andres.silva@petcarehome.com",
      spec: "Estética Canina, Baño Medicado y Manejo Amable",
      hours: "Jornada Semanal: Lunes, Miércoles y Viernes (08:00 AM - 04:00 PM)",
      activeDays: [true, false, true, false, true, false, false],
      timeline: [
        { time: "08:30 AM", title: "Rocky (Grooming y Corte Higiénico)", addr: "Cra 15 # 124-10", state: "done" },
        { time: "02:30 PM", title: "Cita #1026 cancelada por usuario", addr: "Av Suba # 128A", state: "" }
      ]
    }
  };

  // Base de datos de Fichas Clínicas
  const clinicalDossiers = {
    1024: {
      id: 1024,
      title: "Ficha Clínica de la Visita #1024",
      pet: "Max",
      breed: "Canino · Golden Retriever",
      ageWeight: "2 Años · 10.0 Kg",
      history: "Vacunas al día (Rabia y Polivalente al día). Sensibilidad leve a proteínas de pollo.",
      owner: "Juan Pérez",
      doc: "C.C. 1.018.945.321",
      phone: "+57 312 456 7890",
      address: "Calle 127 # 15-42, Apto 502, Usaquén, Bogotá",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Plan: Esencial Canino",
      procedure: "Desparasitación interna preventiva con suspensión oral de amplio espectro. Limpieza ótica profunda.",
      observations: "Examen físico general satisfactorio. Conductos auditivos limpios sin signos de infección.",
      vet: "Dr. Carlos Méndez (M.V. T.P. 24890)",
      nextControl: "26 de Octubre, 2026"
    },
    1025: {
      id: 1025,
      title: "Ficha Clínica de la Visita #1025",
      pet: "Luna",
      breed: "Felino · Siamés",
      ageWeight: "1 Año y 4 Meses · 3.8 Kg",
      history: "Esquema felino inicial completo. Esterilizada. Sin alergias.",
      owner: "María Camila Gómez",
      doc: "C.C. 1.032.554.120",
      phone: "+57 310 987 6543",
      address: "Carrera 7 # 116-20, Casa 4, Santa Bárbara, Bogotá",
      statusText: "En Camino",
      statusClass: "on-way",
      plan: "Plan: Bienestar Felino",
      procedure: "Visita domiciliaria para refuerzo biológico y desparasitación periódica.",
      observations: "Especialista en ruta hacia el domicilio. Tutor preparado con la cartilla de vacunación.",
      vet: "Dra. Diana Gómez (M.V. Especialista Felina T.P. 31204)",
      nextControl: "Control Semestral"
    },
    1026: {
      id: 1026,
      title: "Ficha Clínica de la Visita #1026",
      pet: "Toby",
      breed: "Canino · Cocker Spaniel",
      ageWeight: "4 Años · 14.0 Kg",
      history: "Sensibilidad en pabellones auditivos. Dieta medicada.",
      owner: "Sandra Ortiz",
      doc: "C.C. 1.025.890.111",
      phone: "+57 316 444 5566",
      address: "Av. Suba # 128A - 54, Bogotá",
      statusText: "Cancelada",
      statusClass: "canceled",
      plan: "Plan: Total Care VIP",
      procedure: "Servicio cancelado por el tutor.",
      observations: "Cancelación preventiva tramitada con 24 horas de antelación.",
      vet: "Andrés Silva (Estilista Canino)",
      nextControl: "Por reprogramar"
    },
    1027: {
      id: 1027,
      title: "Ficha Clínica de la Visita #1027",
      pet: "Rocky",
      breed: "Canino · Bulldog Francés",
      ageWeight: "3 Años · 12.5 Kg",
      history: "Alergia atópica ambiental estacional. Cuidados en pliegues nasales.",
      owner: "Esteban Martínez",
      doc: "C.C. 1.014.789.654",
      phone: "+57 315 789 1234",
      address: "Carrera 15 # 124-10, Apto 301, Bogotá",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Plan: Esencial Canino",
      procedure: "Profilaxis y limpieza dental preventiva no invasiva más aseo ótico.",
      observations: "Piezas dentales con leve cálculo gingival en premolares superiores. Encías sanas sin sangrado.",
      vet: "Dr. Carlos Méndez (M.V. T.P. 24890)",
      nextControl: "15 de Noviembre, 2026"
    },
    1028: {
      id: 1028,
      title: "Ficha Clínica de la Visita #1028",
      pet: "Milo",
      breed: "Canino · Golden Retriever",
      ageWeight: "2 Años · 28.0 Kg",
      history: "Cirugía menor previa de sutura en pata derecha. Buena evolución.",
      owner: "Andrea Peña",
      doc: "C.C. 1.022.345.678",
      phone: "+57 313 888 9900",
      address: "Calle 134 # 9-22, Casa 12, Bogotá",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Plan: Total Care VIP",
      procedure: "Retiro de puntos quirúrgicos y curación antiséptica tópica.",
      observations: "Herida completamente cicatrizada. Marcha sin claudicación ni dolor a la palpación.",
      vet: "Dr. Carlos Méndez (M.V. T.P. 24890)",
      nextControl: "Alta Médica"
    },
    1029: {
      id: 1029,
      title: "Ficha Clínica de la Visita #1029",
      pet: "Simba",
      breed: "Felino · Angora Turco",
      ageWeight: "2 Años y 1 Mes · 4.2 Kg",
      history: "Esquema de vacunas al día. Control de bolas de pelo.",
      owner: "Carolina Soto",
      doc: "C.C. 1.019.876.543",
      phone: "+57 318 777 6655",
      address: "Carrera 19 # 104-12, Bogotá",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Plan: Bienestar Felino",
      procedure: "Aplicación de vacuna Triple Felina y pipeta antiparasitaria mensual.",
      observations: "Mascota toleró adecuadamente la aplicación biológica sin efectos adversos.",
      vet: "Dra. Diana Gómez (M.V. Especialista Felina T.P. 31204)",
      nextControl: "Octubre 2027"
    },
    1030: {
      id: 1030,
      title: "Ficha Clínica de la Visita #1030",
      pet: "Kiara",
      breed: "Canino · Poodle Toy",
      ageWeight: "5 Años · 5.2 Kg",
      history: "Prurito estacional en zona lumbar. Tratamiento con champú hidratante.",
      owner: "Jorge Rivas",
      doc: "C.C. 1.011.234.987",
      phone: "+57 314 555 4433",
      address: "Calle 145 # 21-30, Bogotá",
      statusText: "En Camino",
      statusClass: "on-way",
      plan: "Plan: Esencial Canino",
      procedure: "Toma de muestra de raspado cutáneo y examen dermatológico.",
      observations: "Especialista desplazándose con equipo diagnóstico a domicilio.",
      vet: "Dr. Carlos Méndez (M.V. T.P. 24890)",
      nextControl: "Entrega de resultados (48 hrs)"
    },
    1031: {
      id: 1031,
      title: "Ficha Clínica de la Visita #1031",
      pet: "Max",
      breed: "Canino · Golden Retriever",
      ageWeight: "2 Años · 10.0 Kg",
      history: "Sensibilidad a proteínas de pollo. Control periódico programado.",
      owner: "Juan Pérez",
      doc: "C.C. 1.018.945.321",
      phone: "+57 312 456 7890",
      address: "Calle 127 # 15-42, Usaquén, Bogotá",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Plan: Esencial Canino",
      procedure: "Revisión médica de control mensual y evaluación de tolerancia digestiva.",
      observations: "Mascota en peso ideal. Se valida estabilidad del tratamiento gastrointestinal.",
      vet: "Dr. Carlos Méndez (M.V. T.P. 24890)",
      nextControl: "Noviembre 2026"
    },
    1032: {
      id: 1032,
      title: "Ficha Clínica de la Visita #1032",
      pet: "Bruno",
      breed: "Canino · Schnauzer Miniatura",
      ageWeight: "3 Años · 7.5 Kg",
      history: "Comportamiento dócil. Sin enfermedades crónicas.",
      owner: "Claudia Ruiz",
      doc: "C.C. 1.030.123.456",
      phone: "+57 317 222 1100",
      address: "Calle 118 # 14-35, Bogotá",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Plan: Total Care VIP",
      procedure: "Corte estándar de raza, baño con cosmética hipoalergénica y limpieza de oídos.",
      observations: "Piel limpia y sin descamaciones. Manto acondicionado.",
      vet: "Andrés Silva (Estilista Canino)",
      nextControl: "Cita Mensual"
    },
    1033: {
      id: 1033,
      title: "Ficha Clínica de la Visita #1033",
      pet: "Coco",
      breed: "Ave · Loro Guacamayo",
      ageWeight: "6 Años · 0.95 Kg",
      history: "Mascota no convencional registrada. Dieta variada en semillas y frutos.",
      owner: "Felipe Castro",
      doc: "C.C. 1.016.999.888",
      phone: "+57 311 000 9988",
      address: "Carrera 11 # 85-20, Bogotá",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Plan: Esencial Canino",
      procedure: "Revisión general de plumaje, examen de quilla y limado de uñas y pico.",
      observations: "Plumaje en excelente pigmentación. Peso corporal adecuado para la especie.",
      vet: "Dr. Carlos Méndez (M.V. T.P. 24890)",
      nextControl: "Semestral"
    },
    1034: {
      id: 1034,
      title: "Ficha Clínica de la Visita #1034",
      pet: "Luna",
      breed: "Felino · Siamés",
      ageWeight: "1 Año y 5 Meses · 3.9 Kg",
      history: "Esterilizada. Buen estado nutricional.",
      owner: "María Camila Gómez",
      doc: "C.C. 1.032.554.120",
      phone: "+57 310 987 6543",
      address: "Carrera 7 # 116-20, Santa Bárbara",
      statusText: "Confirmada",
      statusClass: "confirmed",
      plan: "Plan: Bienestar Felino",
      procedure: "Control antropométrico y ajuste de gramaje de alimento premium.",
      observations: "Condición corporal 3/5 óptima. Se sugiere mantener hidratación con fuente.",
      vet: "Dra. Diana Gómez (M.V. Especialista Felina)",
      nextControl: "Diciembre 2026"
    }
  };

  // Variables de estado
  let currentSelectedDate = "2026-10-11";
  let currentSelectedApptId = 1024;
  let currentSelectedStaffId = 1;

  // Objeto principal de la aplicación
  const petCareApp = {
    // 1. Navegación entre vistas
    navigate: function (viewName) {
      const titles = {
        pets: "Registro de Mascotas",
        plans: "Gestión de Planes de Servicios",
        appointments: "Agenda de Citas y Visitas a Domicilio",
        treatments: "Registro de Tratamientos",
        staff: "Personal Responsable"
      };

      // Cerrar cualquier modal al cambiar de pantalla (no abrir por defecto)
      this.closeClinicalDossierModal();
      this.closeEditStaffModal();
      this.closeTreatmentModal();

      document.querySelectorAll('.nav-item').forEach(item => {
        if (item.getAttribute('data-view') === viewName) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });

      document.querySelectorAll('.screen-view').forEach(view => {
        if (view.id === `view-${viewName}`) {
          view.classList.add('active');
        } else {
          view.classList.remove('active');
        }
      });

      const breadcrumb = document.getElementById('breadcrumb-title');
      if (breadcrumb && titles[viewName]) {
        breadcrumb.textContent = titles[viewName];
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    },

    goToRegisterTreatment: function (apptId) {
      this.navigate('treatments');
      const data = apptsData[apptId] || apptsData[1024];
      this.openTreatmentModal(data.id, data.pet, data.owner, data.service);
    },

    // 2. Gestión de Planes
    selectPlan: function (id) {
      const data = plansData[id];
      if (!data) return;

      document.querySelectorAll('.plan-card-item').forEach(card => {
        if (parseInt(card.getAttribute('data-plan-id')) === id) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });

      document.getElementById('detail-plan-name').textContent = data.name;
      document.getElementById('detail-plan-price').textContent = data.price;
      document.getElementById('detail-plan-status').textContent = `Estado: ${data.status}`;
      document.getElementById('detail-plan-inscribed').textContent = data.inscribed;

      if (window.Pet3D && window.Pet3D.setPlanPet) {
        window.Pet3D.setPlanPet(id === 2 ? 'cat' : 'dog');
      }

      const servicesContainer = document.getElementById('detail-plan-services');
      if (servicesContainer) {
        servicesContainer.innerHTML = data.services.map((srv, idx) => `
          <div class="service-check-item" ${idx === data.services.length - 1 ? 'style="grid-column: span 2;"' : ''}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span>${srv}</span>
          </div>
        `).join('');
      }
    },

    filterPlans: function (query) {
      const term = query.toLowerCase().trim();
      document.querySelectorAll('.plan-card-item').forEach(card => {
        const title = card.querySelector('.plan-card-name').textContent.toLowerCase();
        card.style.display = title.includes(term) ? 'flex' : 'none';
      });
    },

    createPlanModal: function () {
      this.toast("Formulario para crear nuevo plan de servicio cargado");
    },

    // 3. CAMBIO DINÁMICO DE FECHA EN LA AGENDA DE CITAS
    selectDate: function (dateStr, displayStr) {
      currentSelectedDate = dateStr;

      // Resaltar la celda activa en ambos calendarios
      document.querySelectorAll('.cal-day-cell').forEach(cell => {
        if (cell.getAttribute('data-date') === dateStr) {
          cell.classList.add('active-day');
        } else {
          cell.classList.remove('active-day');
        }
      });

      // Actualizar el rótulo de la sección de fecha
      const labelElem = document.getElementById('date-section-label');
      const indicatorElem = document.getElementById('date-selected-indicator');
      const countElem = document.getElementById('date-appointments-count');

      const isToday = (dateStr === '2026-10-11');
      if (labelElem) labelElem.textContent = isToday ? 'Visitas para Hoy' : 'Visitas Programadas';
      if (indicatorElem) indicatorElem.textContent = displayStr;

      // Obtener las citas correspondientes a la fecha seleccionada
      const apptIds = appointmentsByDate[dateStr] || [];

      if (countElem) {
        if (apptIds.length > 0) {
          countElem.textContent = `${apptIds.length} Visita${apptIds.length > 1 ? 's' : ''} Programada${apptIds.length > 1 ? 's' : ''}`;
        } else {
          countElem.textContent = 'Sin Visitas Programadas';
        }
      }

      // Renderizar el listado de tarjetas según la fecha
      this.renderAppointmentsList(apptIds, displayStr);

      this.toast(`Agenda consultada para el ${displayStr}`);
    },

    renderAppointmentsList: function (apptIds, displayStr) {
      const listContainer = document.getElementById('appointments-list');
      if (!listContainer) return;

      if (apptIds.length === 0) {
        listContainer.innerHTML = `
          <div class="empty-appointments-state" style="background: #FFFFFF; border-radius: 20px; padding: 36px 20px; text-align: center; border: 1.5px dashed #D8D2FB;">
            <div style="width: 52px; height: 52px; background: #ECE9FD; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px auto; color: var(--primary-purple);">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <h4 style="color: var(--text-dark); font-weight: 800; font-size: 1rem; margin-bottom: 6px;">Sin Visitas Programadas</h4>
            <p style="color: var(--text-secondary); font-size: 0.84rem; margin-bottom: 16px;">
              No se registran visitas a domicilio para el <strong>${displayStr}</strong>.
            </p>
            <button class="btn-primary-coral" onclick="window.petCareApp.toast('Módulo para programar cita habilitado para esta fecha');" style="padding: 10px 22px; font-size: 0.88rem;">
              + Agendar Visita en esta Fecha
            </button>
          </div>
        `;

        // Actualizar panel derecho con estado vacío
        document.getElementById('appt-det-title').textContent = `Sin Cita (${displayStr})`;
        document.getElementById('appt-det-service').textContent = "Ningún servicio programado para esta jornada";
        document.getElementById('appt-det-datetime').textContent = `${displayStr} · Disponible`;
        document.getElementById('appt-det-address').textContent = "Horarios libres para asignación domiciliaria";
        document.getElementById('appt-det-staff').textContent = "Personal disponible según cobertura de zona";

        const badgeStatus = document.getElementById('appt-det-badge-status');
        badgeStatus.className = 'badge-status available';
        badgeStatus.textContent = "Fecha Disponible";
        document.getElementById('appt-det-badge-plan').textContent = "Catálogo Abierto";
        return;
      }

      // Renderizar tarjetas de citas encontradas
      listContainer.innerHTML = apptIds.map((id, index) => {
        const appt = apptsData[id];
        const isFirst = (index === 0);
        return `
          <div class="appointment-card ${isFirst ? 'selected' : ''}" data-appt-id="${appt.id}" onclick="window.petCareApp.selectAppt(${appt.id})">
            <div class="appt-card-top">
              <div class="appt-id-pet">
                <span class="appt-id">#${appt.id}</span>
                <span class="appt-pet-name">${appt.pet}</span>
                <span style="font-size: 0.75rem; color: var(--text-secondary);">(${appt.species})</span>
              </div>
              <span class="badge-status ${appt.statusClass}">${appt.statusText}</span>
            </div>
            <div class="appt-card-mid">
              <div class="appt-time-slot">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
                <span>${appt.timeOnly}</span>
              </div>
              <span>·</span>
              <span>${appt.service}</span>
            </div>
            <div class="appt-card-bottom">
              <span style="font-size: 0.75rem; color: var(--text-secondary);">Resp: ${appt.staffShort}</span>
              <div class="crud-actions" onclick="event.stopPropagation();">
                <button class="crud-btn" onclick="window.petCareApp.toast('Modificar horario de Cita #${appt.id}');">Editar</button>
                <button class="crud-btn delete" onclick="window.petCareApp.toast('Cancelar solicitud #${appt.id}');">Cancelar</button>
                <button class="crud-btn" onclick="window.petCareApp.openClinicalDossierModal(${appt.id})" style="background-color: var(--primary-purple-subtle); color: var(--primary-purple); font-weight: 700;">Ver Ficha</button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Seleccionar automáticamente la primera cita de la fecha
      this.selectAppt(apptIds[0]);
    },

    selectAppt: function (id) {
      const data = apptsData[id];
      if (!data) return;

      currentSelectedApptId = id;

      document.querySelectorAll('.appointment-card').forEach(card => {
        if (parseInt(card.getAttribute('data-appt-id')) === id) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });

      document.getElementById('appt-det-title').textContent = data.title;
      document.getElementById('appt-det-service').textContent = data.service;
      document.getElementById('appt-det-datetime').textContent = data.datetime;
      document.getElementById('appt-det-address').textContent = data.address;
      document.getElementById('appt-det-staff').textContent = data.staff;

      const badgeStatus = document.getElementById('appt-det-badge-status');
      badgeStatus.className = `badge-status ${data.statusClass}`;
      badgeStatus.textContent = `Estado: ${data.statusText}`;

      document.getElementById('appt-det-badge-plan').textContent = `Plan: ${data.plan}`;

      // Actualizar Avatar 3D de la cita (Perrito, Gatico, Ave u Otro)
      if (window.Pet3D && window.Pet3D.setApptPet) {
        let type = 'dog';
        if (data.species === 'Felino') type = 'cat';
        else if (data.species === 'Ave') type = 'bird';
        else if (data.species === 'Otro' || data.species === 'Otra' || data.species === 'Otra Especie') type = 'other';
        window.Pet3D.setApptPet(type);
      }
    },

    // ========================================================================
    // 3.1 GESTIÓN DE SUB-VISTAS: CALENDARIO, LISTA Y MAPA
    // ========================================================================
    setCapsule: function (button, modeName) {
      // Actualizar botón activo de la cápsula
      document.querySelectorAll('.capsule-btn').forEach(btn => btn.classList.remove('active'));
      if (button) button.classList.add('active');

      const mode = (modeName || (button ? button.getAttribute('data-capsule') : '') || '').toLowerCase();

      // Ocultar todas las sub-vistas
      document.querySelectorAll('.agenda-subview').forEach(sub => sub.classList.remove('active'));

      if (mode.includes('list')) {
        const listSub = document.getElementById('agenda-subview-list');
        if (listSub) listSub.classList.add('active');
        this.renderAllAppointmentsTable();
        this.toast('Vista de Lista general de citas activada');
      } else if (mode.includes('map')) {
        const mapSub = document.getElementById('agenda-subview-map');
        if (mapSub) mapSub.classList.add('active');
        this.selectMapPin(1024);
        this.toast('Vista de Mapa y Rutas logísticas activada');
      } else {
        const calSub = document.getElementById('agenda-subview-calendar');
        if (calSub) calSub.classList.add('active');
        this.toast('Vista de Calendario y visitas activada');
      }
    },

    // 3.2 RENDERIZADO Y FILTRADO DE LA LISTA GENERAL DE CITAS
    renderAllAppointmentsTable: function (statusFilter = 'all', query = '') {
      const tbody = document.getElementById('agenda-list-tbody');
      if (!tbody) return;

      const q = (query || '').toLowerCase().trim();
      const allApptIds = Object.keys(apptsData).map(Number);

      const filtered = allApptIds.filter(id => {
        const a = apptsData[id];
        if (!a) return false;

        // Filtro por estado
        if (statusFilter && statusFilter !== 'all') {
          if (a.statusClass !== statusFilter) return false;
        }

        // Filtro por término de búsqueda
        if (q) {
          const matchPet = a.pet.toLowerCase().includes(q);
          const matchOwner = a.owner.toLowerCase().includes(q);
          const matchStaff = a.staff.toLowerCase().includes(q);
          const matchService = a.service.toLowerCase().includes(q);
          const matchId = String(a.id).includes(q);
          if (!matchPet && !matchOwner && !matchStaff && !matchService && !matchId) return false;
        }

        return true;
      });

      if (filtered.length === 0) {
        tbody.innerHTML = `
          <tr>
            <td colspan="8" style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
              <div style="font-weight: 800; font-size: 1.05rem; color: var(--text-dark); margin-bottom: 6px;">No se encontraron citas</div>
              <div style="font-size: 0.85rem;">Prueba modificando el filtro de estado o la búsqueda de texto.</div>
            </td>
          </tr>
        `;
        return;
      }

      const speciesIcons = {
        Canino: '🐕',
        Felino: '🐱',
        Ave: '🦜'
      };

      tbody.innerHTML = filtered.map(id => {
        const a = apptsData[id];
        const icon = speciesIcons[a.species] || '🐾';
        const datePart = a.datetime.includes('·') ? a.datetime.split('·')[0].trim() : a.datetime;
        return `
          <tr data-appt-id="${a.id}">
            <td>
              <div style="font-weight: 800; color: var(--primary-purple); font-size: 0.82rem;">#${a.id}</div>
              <div style="font-weight: 700; color: var(--text-dark);">${icon} ${a.pet}</div>
            </td>
            <td>
              <span class="badge-context">${a.species}</span>
            </td>
            <td>
              <div style="font-weight: 700; color: var(--text-dark); font-size: 0.86rem;">${a.owner}</div>
              <div style="font-size: 0.76rem; color: var(--text-secondary);">${a.address}</div>
            </td>
            <td>
              <div style="font-weight: 600; color: var(--text-dark); font-size: 0.84rem;">${datePart}</div>
              <div style="font-size: 0.76rem; color: var(--primary-purple); font-weight: 700;">${a.timeOnly}</div>
            </td>
            <td>
              <div style="font-weight: 600; color: var(--text-dark); font-size: 0.85rem;">${a.service}</div>
              <div style="font-size: 0.74rem; color: var(--text-secondary);">${a.plan}</div>
            </td>
            <td>
              <div style="font-weight: 600; color: var(--text-dark); font-size: 0.82rem;">${a.staffShort}</div>
            </td>
            <td>
              <span class="badge-status ${a.statusClass}">${a.statusText}</span>
            </td>
            <td style="text-align: right; white-space: nowrap;">
              <div class="crud-actions" style="justify-content: flex-end;">
                <button class="crud-btn" onclick="window.petCareApp.openClinicalDossierModal(${a.id})" style="background-color: var(--primary-purple-subtle); color: var(--primary-purple); font-weight: 700;">Ver Ficha</button>
                <button class="crud-btn" onclick="window.petCareApp.toast('Modificar horario de Cita #${a.id}');">Modificar</button>
              </div>
            </td>
          </tr>
        `;
      }).join('');
    },

    filterAppointmentsListByStatus: function (status, btnElem) {
      document.querySelectorAll('.status-pills-filter .filter-pill-btn').forEach(btn => btn.classList.remove('active'));
      if (btnElem) btnElem.classList.add('active');

      this._currentListStatus = status;
      const qInput = document.getElementById('search-agenda-list');
      const q = qInput ? qInput.value : '';
      this.renderAllAppointmentsTable(status, q);
    },

    filterAppointmentsListByQuery: function (query) {
      const status = this._currentListStatus || 'all';
      this.renderAllAppointmentsTable(status, query);
    },

    // 3.3 INTERACCIÓN LOGÍSTICA EN EL MAPA DE BOGOTÁ
    selectRoute: function (routeId, el) {
      document.querySelectorAll('.route-selector-card').forEach(c => c.classList.remove('active'));
      if (el) el.classList.add('active');

      const routePins = {
        1: 1024,
        2: 1025,
        3: 1026
      };

      const targetPinId = routePins[routeId] || 1024;
      this.selectMapPin(targetPinId);
      this.toast(`Ruta ${routeId} seleccionada. Mostrando paradas en el mapa.`);
    },

    selectMapPin: function (apptId) {
      const a = apptsData[apptId] || apptsData[1024];
      if (!a) return;

      const speciesIcons = {
        Canino: '🐕',
        Felino: '🐱',
        Ave: '🦜'
      };

      const iconElem = document.getElementById('map-popup-icon');
      if (iconElem) iconElem.textContent = speciesIcons[a.species] || '🐾';

      const titleElem = document.getElementById('map-popup-title');
      if (titleElem) titleElem.textContent = `Cita #${a.id} · ${a.pet} (${a.species})`;

      const serviceElem = document.getElementById('map-popup-service');
      if (serviceElem) serviceElem.textContent = `${a.service} · Tutor: ${a.owner}`;

      const addrElem = document.getElementById('map-popup-address');
      if (addrElem) addrElem.textContent = `${a.address} · Resp: ${a.staffShort}`;

      const badgeElem = document.getElementById('map-popup-badge');
      if (badgeElem) {
        badgeElem.className = `badge-status ${a.statusClass}`;
        badgeElem.textContent = a.statusText;
      }

      const btnElem = document.getElementById('map-popup-btn');
      if (btnElem) {
        btnElem.onclick = () => window.petCareApp.openClinicalDossierModal(a.id);
      }

      // Resaltar visualmente el pin seleccionado
      document.querySelectorAll('.map-pin-point').forEach(p => {
        p.style.transform = '';
        p.style.zIndex = '10';
      });

      const activePin = document.getElementById(`map-pin-${a.id}`);
      if (activePin) {
        activePin.style.transform = 'scale(1.22) translateY(-6px)';
        activePin.style.zIndex = '25';
      }

      const popup = document.getElementById('map-info-popup');
      if (popup) {
        popup.style.display = 'flex';
      }

      this.toast(`Cita #${a.id} (${a.pet}) seleccionada en el mapa logístico`);
    },

    // 4. Selección de Personal
    selectStaff: function (id) {
      const data = staffData[id];
      if (!data) return;

      currentSelectedStaffId = id;

      document.querySelectorAll('.staff-card-item').forEach(card => {
        if (parseInt(card.getAttribute('data-staff-id')) === id) {
          card.classList.add('selected');
        } else {
          card.classList.remove('selected');
        }
      });

      document.getElementById('staff-dossier-name').textContent = data.name;
      document.getElementById('staff-dossier-profile').textContent = data.profile;
      document.getElementById('staff-dossier-doc').textContent = data.doc;
      document.getElementById('staff-dossier-phone').textContent = data.phone;
      document.getElementById('staff-dossier-email').textContent = data.email;
      document.getElementById('staff-dossier-spec').textContent = data.spec;

      const badge = document.getElementById('staff-dossier-badge');
      badge.className = `badge-status ${data.statusClass}`;
      badge.textContent = data.statusText;

      const daysContainer = document.getElementById('staff-week-chips');
      const dayNames = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];
      if (daysContainer) {
        daysContainer.innerHTML = data.activeDays.map((isActive, i) => `
          <div class="week-day-chip ${isActive ? 'active' : ''}" title="${isActive ? 'Día Activo' : 'Día Libre'}">
            <span>${dayNames[i]}</span>
            <span class="chip-dot"></span>
          </div>
        `).join('');
      }

      const timelineBox = document.getElementById('staff-today-timeline');
      if (timelineBox) {
        timelineBox.innerHTML = data.timeline.map(item => `
          <div class="timeline-item">
            <div class="timeline-marker ${item.state}"></div>
            <div class="timeline-content-card">
              <span class="timeline-time-badge">${item.time}</span>
              <div class="timeline-title-detail">${item.title}</div>
              <small style="color: var(--text-secondary); font-size: 0.72rem;">Dirección: ${item.addr}</small>
            </div>
          </div>
        `).join('');
      }

      // Actualizar Avatar 3D en la ficha del colaborador (Hombre o Mujer)
      if (window.Pet3D && window.Pet3D.setStaffDossier) {
        const staffKey = (id === 3 ? 'andres' : (data.gender === 'woman' || id === 2 ? 'woman' : 'carlos'));
        window.Pet3D.setStaffDossier(staffKey);
      }
    },

    filterStaff: function (query) {
      const term = query.toLowerCase().trim();
      document.querySelectorAll('.staff-card-item').forEach(card => {
        const text = card.querySelector('.staff-name-role').textContent.toLowerCase();
        card.style.display = text.includes(term) ? 'block' : 'none';
      });
    },

    // 5. Ventana Modal de Tratamientos (Registro de Tratamiento)
    openTreatmentModal: function (apptId, petName, ownerName, serviceType) {
      const modal = document.getElementById('treatment-modal');
      const title = document.getElementById('modal-treatment-title');
      const capPet = document.getElementById('modal-capsule-pet');
      const capServ = document.getElementById('modal-capsule-service');

      if (apptId) {
        title.textContent = `Registrar Tratamiento - Cita #${apptId}`;
        capPet.textContent = `Mascota: ${petName || 'Max'} (Dueño: ${ownerName || 'Juan Pérez'})`;
        capServ.textContent = `Tipo de Servicio: ${serviceType || 'Consulta Médica'}`;
      }

      // Actualizar avatar 3D del paciente
      if (window.Pet3D && window.Pet3D.setTreatmentPet) {
        let petType = 'dog';
        if (petName === 'Luna' || petName === 'Simba') petType = 'cat';
        else if (petName === 'Coco') petType = 'bird';
        window.Pet3D.setTreatmentPet(petType);
      }

      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
    },

    closeTreatmentModal: function () {
      const modal = document.getElementById('treatment-modal');
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
    },

    submitTreatmentForm: function () {
      const nextCtrl = document.getElementById('treatment-next-control').value;
      this.closeTreatmentModal();
      this.toast(`Tratamiento clínico guardado exitosamente. Próximo control: ${nextCtrl || 'Sin control programado'}`);
    },

    // 6. VENTANA MODAL DE FICHA CLÍNICA / FICHA DE LA VISITA (VER FICHA)
    openClinicalDossierModal: function (id) {
      const data = clinicalDossiers[id] || clinicalDossiers[1024];
      if (!data) return;

      currentSelectedApptId = id;

      document.getElementById('ficha-modal-title').textContent = data.title;
      document.getElementById('ficha-status-badge').className = `badge-status ${data.statusClass}`;
      document.getElementById('ficha-status-badge').textContent = data.statusText;
      document.getElementById('ficha-plan-badge').textContent = data.plan;

      document.getElementById('ficha-pet-name').textContent = data.pet;
      document.getElementById('ficha-pet-breed').textContent = data.breed;
      document.getElementById('ficha-pet-age-weight').textContent = data.ageWeight;
      document.getElementById('ficha-pet-history').textContent = data.history;

      document.getElementById('ficha-owner-name').textContent = data.owner;
      document.getElementById('ficha-address').textContent = data.address;

      document.getElementById('ficha-procedure-text').textContent = data.procedure;
      document.getElementById('ficha-observations-text').textContent = data.observations;
      document.getElementById('ficha-vet-name').textContent = data.vet;
      document.getElementById('ficha-next-control').textContent = data.nextControl;

      const modal = document.getElementById('clinical-dossier-modal');
      if (modal) {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    },

    closeClinicalDossierModal: function () {
      const modal = document.getElementById('clinical-dossier-modal');
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
    },

    openCurrentApptDossier: function () {
      this.openClinicalDossierModal(currentSelectedApptId);
    },

    printFicha: function () {
      this.toast(`Preparando expediente clínico para impresión oficial...`);
      setTimeout(() => {
        window.print();
      }, 500);
    },

    editFromFicha: function () {
      const data = clinicalDossiers[currentSelectedApptId] || clinicalDossiers[1024];
      this.closeClinicalDossierModal();
      this.openTreatmentModal(data.id, data.pet, data.owner, "Consulta & Tratamiento");
    },

    // 7. MODAL DE MODIFICAR FICHA DE PERSONAL
    openEditStaffModal: function () {
      const data = staffData[currentSelectedStaffId] || staffData[1];
      document.getElementById('edit-staff-name').value = data.name;
      document.getElementById('edit-staff-profile').value = data.profile;
      document.getElementById('edit-staff-phone').value = data.phone;
      document.getElementById('edit-staff-email').value = data.email;
      document.getElementById('edit-staff-spec').value = data.spec;
      document.getElementById('edit-staff-status').value = data.statusClass;

      const modal = document.getElementById('edit-staff-modal');
      if (modal) {
        if (window.Pet3D && window.Pet3D.setStaffEdit) {
          const staffKey = (currentSelectedStaffId === 3 ? 'andres' : (data.gender === 'woman' || currentSelectedStaffId === 2 ? 'woman' : 'carlos'));
          window.Pet3D.setStaffEdit(staffKey);
        }
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      }
    },

    closeEditStaffModal: function () {
      const modal = document.getElementById('edit-staff-modal');
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
    },

    saveStaffChanges: function () {
      const name = document.getElementById('edit-staff-name').value;
      const profile = document.getElementById('edit-staff-profile').value;
      const phone = document.getElementById('edit-staff-phone').value;
      const email = document.getElementById('edit-staff-email').value;
      const spec = document.getElementById('edit-staff-spec').value;
      const statusSelect = document.getElementById('edit-staff-status');
      const statusVal = statusSelect.value;
      const statusText = statusSelect.options[statusSelect.selectedIndex].text;

      const current = staffData[currentSelectedStaffId];
      if (current) {
        current.name = name;
        current.profile = profile;
        current.phone = phone;
        current.email = email;
        current.spec = spec;
        current.statusClass = statusVal;
        current.statusText = statusText;
      }

      this.selectStaff(currentSelectedStaffId);
      this.closeEditStaffModal();
      this.toast(`Ficha de ${name} actualizada exitosamente.`);
    },

    // 8. Formulario de Mascotas
    submitPetForm: function () {
      const name = document.getElementById('pet-name').value;
      const species = document.getElementById('pet-species').options[document.getElementById('pet-species').selectedIndex].text;
      this.toast(`¡Mascota ${name} (${species}) registrada exitosamente en el sistema!`);
    },

    resetPetForm: function () {
      document.getElementById('pet-registration-form').reset();
      this.toast("Formulario reiniciado");
    },

    // 9. Notificaciones Toast Soft UI
    toast: function (message) {
      const toast = document.getElementById('toast-box');
      const msg = document.getElementById('toast-message');
      if (!toast || !msg) return;

      msg.textContent = message;
      toast.classList.add('show');

      clearTimeout(this._toastTimer);
      this._toastTimer = setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  };

  // Exponer a nivel global
  window.petCareApp = petCareApp;

  // Inicialización de Event Listeners al cargar el DOM
  document.addEventListener('DOMContentLoaded', function () {
    // Escuchar clics en el menú lateral
    document.querySelectorAll('.nav-item').forEach(item => {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        const viewName = this.getAttribute('data-view');
        petCareApp.navigate(viewName);
      });
    });

    // Cerrar modales al hacer clic en el backdrop
    const treatmentModal = document.getElementById('treatment-modal');
    if (treatmentModal) {
      treatmentModal.addEventListener('click', function (e) {
        if (e.target === treatmentModal) {
          petCareApp.closeTreatmentModal();
        }
      });
    }

    const clinicalDossierModal = document.getElementById('clinical-dossier-modal');
    if (clinicalDossierModal) {
      clinicalDossierModal.addEventListener('click', function (e) {
        if (e.target === clinicalDossierModal) {
          petCareApp.closeClinicalDossierModal();
        }
      });
    }

    const editStaffModal = document.getElementById('edit-staff-modal');
    if (editStaffModal) {
      editStaffModal.addEventListener('click', function (e) {
        if (e.target === editStaffModal) {
          petCareApp.closeEditStaffModal();
        }
      });
    }

    // Cerrar modales con la tecla Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        petCareApp.closeTreatmentModal();
        petCareApp.closeClinicalDossierModal();
        petCareApp.closeEditStaffModal();
      }
    });

    // Simular carga de foto en el círculo punteado
    const photoBox = document.getElementById('pet-photo-box');
    const fileInput = document.getElementById('pet-file-input');
    if (photoBox && fileInput) {
      photoBox.addEventListener('click', function () {
        fileInput.click();
      });

      fileInput.addEventListener('change', function () {
        if (this.files && this.files[0]) {
          const reader = new FileReader();
          reader.onload = function (e) {
            photoBox.style.backgroundImage = `url('${e.target.result}')`;
            photoBox.style.backgroundSize = 'cover';
            photoBox.style.backgroundPosition = 'center';
            photoBox.style.borderStyle = 'solid';
            const svg = photoBox.querySelector('svg');
            if (svg) svg.style.display = 'none';
            petCareApp.toast('Foto de mascota cargada correctamente');
          };
          reader.readAsDataURL(this.files[0]);
        }
      });
    }

    // INTERACCIÓN DINÁMICA DE FECHAS EN LOS DOS CALENDARIOS
    document.querySelectorAll('.cal-day-cell:not(.other-month)').forEach(cell => {
      cell.addEventListener('click', function () {
        const dateStr = this.getAttribute('data-date');
        const displayStr = this.getAttribute('data-display') || `${this.textContent.trim()} de Octubre, 2026`;
        if (dateStr) {
          petCareApp.selectDate(dateStr, displayStr);
        }
      });
    });

    // Sincronizar selector de especie con el modelo 3D integrado
    const speciesSelect = document.getElementById('pet-species');
    if (speciesSelect) {
      speciesSelect.addEventListener('change', function () {
        if (window.Pet3D && window.Pet3D.selectSpecies) {
          window.Pet3D.selectSpecies(this.value);
        }
      });
    }

    // Pre-cargar la tabla de todas las citas para la sub-vista Lista
    petCareApp.renderAllAppointmentsTable();

  });

})();
