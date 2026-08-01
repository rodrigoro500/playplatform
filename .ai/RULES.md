# Reglas de Desarrollo

## Objetivo

Mantener PlayPlatform limpio, modular y escalable.

---

## Arquitectura

- El Core nunca depende de Games.
- Games puede depender del Core.
- La UI nunca contiene lógica de negocio.
- El Engine coordina, no implementa toda la lógica.

---

## Código

- Una responsabilidad por clase.
- Evitar duplicar código.
- Preferir composición antes que clases gigantes.
- Métodos pequeños y claros.
- Nombres descriptivos.
- No usar valores mágicos.

---

## Entidades

Las entidades deben proteger su estado.

Ejemplos:

- Bet
- Round
- Wallet

Las modificaciones deben realizarse mediante métodos de la entidad.

---

## Validaciones

Toda entrada debe validarse antes de modificar el estado del sistema.

Nunca eliminar validaciones para solucionar errores rápidamente.

---

## Lifecycle

Toda transición de estado debe pasar por el Lifecycle.

Nunca modificar estados manualmente.

---

## Refactorización

Antes de crear código nuevo:

- Buscar si ya existe.
- Reutilizar cuando sea posible.
- Mantener compatibilidad si afecta código existente.

---

## Roo Code

Antes de modificar archivos debe:

1. Leer la documentación.
2. Analizar el impacto.
3. Modificar únicamente lo necesario.
4. Actualizar imports y exports.
5. Ejecutar pruebas.
6. Informar los cambios realizados.

---

## No permitido

- Romper la arquitectura.
- Crear dependencias circulares.
- Modificar varios módulos sin necesidad.
- Eliminar código sin justificar.
- Instalar nuevas dependencias sin autorización.

---

## Calidad

Prioridad:

1. Correcto.
2. Seguro.
3. Claro.
4. Reutilizable.
5. Escalable.

---

## Regla final

Cada cambio debe dejar el proyecto igual o mejor que antes.