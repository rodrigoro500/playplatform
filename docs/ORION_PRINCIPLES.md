# ORION_PRINCIPLES.md

# ORION PRINCIPLES

> "Un buen software no se mide por la cantidad de código que tiene, sino por la cantidad de cambios que puede soportar sin romperse."

---

# Propósito

Este documento define los principios fundamentales sobre los que se construye PlayPlatform.

Estos principios tienen prioridad sobre cualquier implementación.

Si en algún momento una decisión técnica contradice alguno de estos principios, deberá replantearse la solución antes de continuar.

---

# PRINCIPIO 1
## El Core nunca conoce un juego.

El Core debe ser completamente independiente.

Nunca debe contener lógica específica de:

- Pase
- Maka'i
- Poker
- Blackjack
- Truco
- Ningún juego futuro

Los juegos utilizan el Core.

El Core jamás utiliza un juego.

✔ Correcto

Game -> Core

✘ Incorrecto

Core -> Game

---

# PRINCIPIO 2
## Una entidad nunca modifica otra entidad.

Cada entidad es responsable únicamente de su propio estado.

Ejemplos:

✔ Bet no modifica Wallet.

✔ Wallet no modifica Round.

✔ Round no modifica Player.

Las entidades representan información y comportamiento propio.

La coordinación entre entidades pertenece a los Engines o Services.

---

# PRINCIPIO 3
## Todo movimiento financiero se representa mediante una Transaction.

No existen cambios directos de saldo.

Incorrecto

wallet.balance -= 500

Correcto

Transaction
↓

Wallet.applyTransaction()

Esto garantiza:

- Historial completo
- Auditoría
- Reversión
- Transparencia

---

# PRINCIPIO 4
## Todas las entidades del dominio heredan de BaseEntity.

BaseEntity centraliza:

- id
- createdAt
- updatedAt
- clone()
- toJSON()

Esto garantiza consistencia en todo el dominio.

---

# PRINCIPIO 5
## Todo proceso con ciclo de vida debe tener una máquina de estados.

Ejemplos:

- Round
- Bet
- GameSession

Nunca deben existir cambios arbitrarios de estado.

Las transiciones siempre deben validarse.

---

# PRINCIPIO 6
## Los Engines coordinan.

Los Engines toman decisiones.

Las entidades no.

Ejemplo

GameEngine

↓

crear Bet

↓

registrar Bet

↓

resolver Bet

↓

crear Transaction

↓

Wallet procesa Transaction

Las entidades nunca coordinan el sistema.

---

# PRINCIPIO 7
## Los Managers administran colecciones.

Los Managers no contienen reglas del negocio.

Su responsabilidad es:

- Crear
- Buscar
- Eliminar
- Registrar

No deben implementar lógica del juego.

---

# PRINCIPIO 8
## Las entidades deben ser reutilizables.

Player debe servir para cualquier juego.

Room debe servir para cualquier juego.

Wallet debe servir para cualquier juego.

Bet debe servir para cualquier juego.

Si una entidad depende de un juego específico,
la arquitectura está siendo violada.

---

# PRINCIPIO 9
## React nunca forma parte del Core.

El Core debe poder ejecutarse desde:

- Node.js
- React
- Vue
- Angular
- Consola
- Tests

El Core nunca debe importar componentes de interfaz.

---

# PRINCIPIO 10
## El Core es la fuente de verdad.

La interfaz muestra información.

El Core decide.

Nunca debe existir lógica del negocio dentro de React.

---

# Filosofía ORION

Construimos software preparado para crecer.

Preferimos:

Arquitectura

sobre velocidad.

Claridad

sobre complejidad.

Consistencia

sobre cantidad.

Mantenibilidad

sobre atajos.

Cada clase debe tener una única responsabilidad.

Cada módulo debe ser independiente.

Cada decisión debe facilitar el crecimiento futuro.

---

# Visión

PlayPlatform no es un juego.

PlayPlatform es un motor capaz de ejecutar múltiples juegos utilizando un único Core.

El objetivo no es desarrollar un juego.

El objetivo es desarrollar una plataforma capaz de soportar cualquier juego futuro sin modificar el núcleo del sistema.

---

Última actualización:

Sprint 4
Arquitecto ORION