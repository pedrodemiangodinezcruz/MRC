
var subselectContains = {
  "Concepto al Producto": ['Definición y Clarificación de las Necesidades del Cliente', 'Conceptualización', 'Desarrollo', 'Validación del Producto y del Proceso', 'Producción y Soporte'],
  "Compra al Pago": ['Requerimientos y Selección de Proveedores', 'Orden de Compra', 'Recepción de Bienes y Servicios', 'Administración de Cuentas por Pagar'],
  "Demanda al Abasto": ['Pronóstico de la demanda y abastecimiento', 'Planeación y programación de la producción', 'Solicitud de reserva de recursos', 'Producción y aseguramiento de Calidad', 'Administración de inventarios'],
  "Pedido al Cobro": ['Órdenes de Venta', 'Distribución del Producto (Packing, Picking)', 'Facturación', 'Administración de la Cuenta por Cobrar'],
  "Mantenimiento a la Liquidación": ['Planes de Mantenimiento', 'Identificación de Trabajo', 'Planeación y Ejecución de Trabajos', 'Administración de Liquidación de Trabajos'],
  "Inversión a la Desinversión": ['Detección de Necesidad y Solicitud de inversiones', 'Creación de Activos Fijos', 'Administración de Activos Fijos', 'Desinversión de Activos Fijos', 'Cierre de Activos Fijos'],
  "Finanzas a la Administración": ['Definición de Estructura y Planes Financieros', 'Registro y Contabilización', 'Cierres Financieros', 'Reporte de Resultados', 'Soporte y Cumplimiento'],
  "Contratación al Retiro": ['Atracción de Talento', 'Desarrollo de Talento', 'Administración de personal', 'Planeación, Compensaciones y Beneficios', 'Retiro'],
  "Procesos Criticos fuera de Macros": ['Procesos Críticos fuera de Macros']
};

var macroproceso = $("#macroproceso");
var proceso = $("#proceso option");

macroproceso.change(function () {
  var visibleOptions = subselectContains[this.options[this.selectedIndex].textContent];

  if (visibleOptions.length != 0) {
    proceso.hide();


    proceso.each(function () {
      for (var i = 0; i <= visibleOptions.length; i++) {
        if (this.value == visibleOptions[i]) {
          $(this).show();
        }
      }
    });
  } else {
    proceso.show();
  }
});

var subselect = {
  "Definición y Clarificación de las Necesidades del Cliente": ['RFQ Recibido y Confirmado', 'Cotización Interna de Nuevos Proyectos', 'Realización del Estudio de Factibilidad', 'Conceptualización del Estudio de PCRS', 'Entrega de Cotización al Cliente', 'Aceptación de Cotización por Parte del Cliente', 'Definición de SE- TEAM y PL', 'Creación y Administración del Presupuesto', 'Quality Gate 2'],
  "Conceptualización": ['Revisión Técnica Finalizada', 'Realización de Simulaciones CAX', 'Concepto de Logística y Empaque', 'Definición de Concepto Técnico ', 'Selección de Proveedores para Nuevos Proyectos', 'Quality Gate 3'],
  "Desarrollo": ['Congelar Diseño del Producto', 'Quality Gate 4'],
  "Validación del Producto y del Proceso": ['Aprobación de Diseño de Herramentales de Serie', 'Aprobación de Herramentales de Serie', 'Aprobación del proceso PPAP', 'Emisión de Reporte QCD', 'Quality Gate 5'],
  "Producción y Soporte": ['Análisis de Rentabilidad del Producto', 'Aseguramiento de Calidad de Proveedores', 'Investigación y Desarrollo ', 'Revisión del Costo y Actualización de la Cotización', 'Evaluación de Quality Gates', 'Quality Gate 6'],
  "Requerimientos y Selección de Proveedores": ['Requerimientos', 'Cotizaciones', 'Autorización de Solicitudes de Pedido', 'Selección y Alta de Proveedores', 'Trámites de Agentes Aduanales y/o Comercio Exterior', 'Elaboración y Seguimiento al Presupuesto de Compra', 'Creación / Actualización de Datos Maestros de Compras', 'Mantenimiento de Precios', 'Definición de Estrategias', 'Actualización de Sistemas de Comercio Exterior', 'Reporte Programas de Fomento'],
  "Orden de Compra": ['Creación y Liberación de Documentos de Compra', 'Tránsito de Entrada Nacional e Importación', 'Proceso Maquila', 'Aviso de Opción para la Determinación del Seguro Global de Transporte', 'Pedimentos Virtuales - Importación'],
  "Recepción de Bienes y Servicios": ['Recibo de Material y Servicios', 'Inspección Recibo y Laboratorio de Pruebas', 'Gestión de Materiales en Cuarentena', 'Evaluación de Desempeño de Proveedores', 'Seguimiento a Proveedores'],
  "Administración de Cuentas por Pagar": ['Verificación de Facturas', 'Propuesta de Pagos', 'Realización de Pagos', 'Trámite de Cuentas de Gastos y Archivo Aduanero', 'Devolución a Proveedores y Cargos'],
  "Pronóstico de la demanda y abastecimiento": ['Elaboración de Proyección y Presupuesto anual de Ventas', 'Análisis de la variación de requerimientos', 'Desarrollo del Sistema Logístico'],
  "Planeación y programación de la producción": ['Planeación de la Producción corto plazo', 'Planeación de la Producción mediano y largo plazo'],
  "Solicitud de reserva de recursos": ['Planeación y Reabastecimiento de Materiales mediano plazo', 'Planeación y Reabastecimiento de Materiales largo plazo'],
  "Producción y aseguramiento de Calidad": ['Gestión de Liberación de Procesos', 'Gestión del Control del Proceso', 'Gestión del Proceso de Medición del Producto', 'Ejecución del Plan de Producción', 'Tratamiento de Material de Retorno', 'Gestión de Ingeniería de Procesos (Documentación)', 'Gestión de Certificación 100% y Retrabajos'],
  "Administración de inventarios": ['Surtimiento Producción MP/COMP/EMP/WIP', 'Surtimiento de Químicos y Material Indirecto', 'Notificación de Material', 'Almacenamiento y disposición de residuos', 'Recolección Scrap', 'Inventarios Físicos', 'Ejecución de reportes'],
  "Órdenes de Venta": ['Recepción y Carga de Requerimientos', 'Cálculo de Origen'],
  "Distribución del Producto (Packing, Picking)": ['Tráfico', 'Embarques'],
  "Facturación": ['Facturación No Productivo / Intercompañías', 'Atención Cliente', 'Solicitud de notas de crédito y cargo', 'Devolución de Material', 'Gestión de Garantías', 'Pedimentos Virtuales - Exportación'],
  "Administración de la Cuenta por Cobrar": ['Aplicación y Gestión de Cobranza'],
  "Planes de Mantenimiento": ['Gestión de Datos Maestros de Mantenimiento'],
  "Identificación de Trabajo": ['Talleres TPM', 'Tratamiento de Planes de acciones correctivas', 'Gestión de Avisos'],
  "Planeación y Ejecución de Trabajos": ['Gestión de Mantenimiento', 'Gestión de Herramientas de corte', 'Cierre de Mantenimiento', 'Gestión de Ingeniería de Procesos y Desarrollo de Planta', 'Gestión de Instrumentos de Medición'],
  "Administración de Liquidación de Trabajos": ['Ejecución de Reportes de Mantenimiento'],
  "Detección de Necesidad y Solicitud de inversiones": ['Necesidad de Inversión'],
  "Creación de Activos Fijos": ['Gestión de Alta para Activo Fijo', 'Capitalización de Activo Fijo'],
  "Administración de Activos Fijos": ['Inventario Cíclico de Activo Fijo', 'Seguimiento a Presupuesto y Suplementos de Inversiones'],
  "Desinversión de Activos Fijos": ['Bajas de Activos Fijos', 'Traspasos de Activos Fijos en la misma Sociedad'],
  "Cierre de Activos Fijos": ['Cierre (Mensual, Anual) de Activo Fijo'],
  "Definición de Estructura y Planes Financieros": ['Definición de estructuras organizativas', 'Preparación de presupuesto anual', 'Determinación de tarifas y cálculo del costo'],
  "Registro y Contabilización": ['Pólizas de diario', 'Conciliaciones bancarias', 'Gestión de gastos de viaje'],
  "Cierres Financieros": ['Cierre de mes Finanzas', 'Cierre de mes costos', 'Consolidación Financiera'],
  "Reporte de Resultados": ['Generación de reportes mensual y anual'],
  "Soporte y Cumplimiento": ['Determinación de pago de impuestos y requerimientos legales'],
  "Atracción de Talento": ['Atracción y Selección de Talento'],
  "Desarrollo de Talento ": ['Capacitación y Adiestramiento', 'Evaluación del Desempeño del personal', 'Plan de Desarrollo'],
  "Administración de personal": ['Movimientos de personal', 'Atención al personal', 'Incidencias', 'Puntualidad y Asistencia del Personal', 'Gestión del Clima Organizacional', 'Comunicación Organizacional', 'Salud ocupacional', 'Administración de Comedor', 'Cálculo de Nómina', 'Nóminas Especiales', 'Obligaciones patronales', 'Contabilización y Pago de Nómina'],
  "Planeación, Compensaciones y Beneficios": ['Planeación de la Organización', 'Remuneraciones', 'Control de Vehículos'],
  "Retiro": ['Transferencia de Personal al Extranjero', 'Retiro'],
  "Procesos Críticos fuera de Macros": ['Gobierno Corporativo', 'Planeación Estrategica', 'Legal', 'Seguridad Patrimonial', 'TI', 'CTO', 'Gestión de Riesgos', 'Segregación de Funciones SAP (SOD SAP)', 'Compliance', 'Bocar US (RH, Finanzas, Compras)', 'HSE']
};

var listaProceso = $("#proceso");
var subproceso = $("#subproceso option");


listaProceso.change(function () {
  var opciones = subselect[this.options[this.selectedIndex].textContent];

  if (opciones.length != 0) {
    subproceso.hide();


    subproceso.each(function () {
      for (var j = 0; j <= opciones.length; j++) {
        if (this.value == opciones[j]) {
          $(this).show();
        }
      }
    });
  } else {
    subproceso.show();
  }
});


document.getElementById('seleccionProceso').addEventListener('change', onchange);
            
      