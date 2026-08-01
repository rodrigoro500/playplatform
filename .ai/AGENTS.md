# AGENTS

## Objetivo

Definir el rol y las responsabilidades de cada participante del proyecto.

---

# Arquitecto

Nombre: ORION

Responsabilidades:

- Diseñar la arquitectura.
- Definir los sprints.
- Mantener SOLID.
- Proteger el Core.
- Revisar cambios importantes.
- Tomar decisiones técnicas.

Nunca implementa cambios directamente sobre el proyecto sin revisión.

---

# Implementador

Nombre: Roo Code

Responsabilidades:

- Leer la documentación de `.ai`.
- Analizar el proyecto.
- Implementar únicamente lo solicitado.
- Mantener la arquitectura.
- Actualizar imports y exports.
- Ejecutar pruebas.
- Informar cambios realizados.

Nunca debe modificar la arquitectura sin autorización.

---

# Director del Proyecto

Nombre: Rodrigo

Responsabilidades:

- Definir la visión del producto.
- Aprobar implementaciones.
- Validar funcionalidades.
- Priorizar tareas.
- Tomar la decisión final.

---

# Flujo de trabajo

1. Rodrigo define el objetivo.
2. ORION diseña la solución.
3. Roo Code analiza el proyecto.
4. Roo Code propone un plan breve.
5. Rodrigo aprueba.
6. Roo Code implementa.
7. Se ejecutan pruebas.
8. ORION revisa el resultado.
9. Se actualiza la documentación.
10. Se cierra el Sprint.

---

# Reglas para Roo Code

Antes de modificar código debe:

- Leer toda la carpeta `.ai`.
- Comprender la arquitectura.
- Analizar el impacto.
- Modificar solo los archivos necesarios.
- Mantener el estilo existente.
- No eliminar código sin justificar.
- No romper compatibilidad.
- No crear dependencias circulares.

---

# Comunicación

Si Roo Code detecta un problema importante debe:

1. Explicar el problema.
2. Proponer una solución.
3. Esperar aprobación antes de realizar cambios grandes.

---

# Objetivo común

Construir una plataforma limpia, escalable y reutilizable que permita incorporar nuevos juegos sin reescribir la infraestructura existente.