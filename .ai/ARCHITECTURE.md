# Arquitectura de PlayPlatform

## Objetivo

PlayPlatform es una plataforma modular para desarrollar múltiples juegos reutilizando un Core común.

La arquitectura busca separar claramente la lógica del negocio, las reglas de cada juego y la interfaz de usuario.

---

# Estructura

src/

core/
- Bets
- Round
- Lifecycle
- Events
- Validators
- Wallet
- Statistics

games/
- Pase
- (Craps)
- (Blackjack)
- (Ruleta)

components/
pages/
services/
sandbox/

---

# Capas

UI
↓
Games
↓
Core

El Core nunca debe depender de Games ni de la UI.

---

# Core

El Core contiene toda la lógica reutilizable.

Ejemplos:

- Bet
- BetCollection
- BetFactory
- BetResult
- BetSettlement
- Round
- RoundLifecycle
- Wallet
- Validators
- Events

El Core debe ser independiente de cualquier juego.

---

# Games

Cada juego implementa únicamente sus reglas.

Ejemplo:

Pase/
- PaseEngine
- PaseRoundFlow
- PaseBetManager
- PaseRoundResolver
- PaseEventsManager
- PaseRules

Los juegos utilizan el Core, pero nunca al revés.

---

# PaseEngine

Actúa como fachada del juego.

Su responsabilidad es coordinar componentes, no contener toda la lógica.

Debe delegar el trabajo a clases especializadas.

---

# Flujo de una ronda

Nueva ronda

↓

Apuestas

↓

Cerrar apuestas

↓

Lanzamiento

↓

Resultado

↓

Resolver ronda

↓

Settlement

↓

Funding

↓

Payment

↓

Ronda finalizada

---

# Objetivo de la arquitectura

- Bajo acoplamiento.
- Alta reutilización.
- Fácil mantenimiento.
- Fácil incorporación de nuevos juegos.
- Escalable.

---

# Principios

- Una responsabilidad por clase.
- Componentes pequeños.
- Dependencias claras.
- Código reutilizable.
- El Engine coordina.
- El Core implementa.
- Los juegos definen reglas.

---

# Visión

El objetivo final es que agregar un nuevo juego requiera implementar solamente sus reglas específicas, reutilizando toda la infraestructura existente.