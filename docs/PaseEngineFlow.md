# PaseEngine Flow

## Objetivo

El PaseEngine es el coordinador principal del juego.

No contiene reglas del negocio.

No calcula apuestas.

No interpreta dados.

No realiza pagos.

Su única responsabilidad es coordinar los distintos componentes especializados para ejecutar una partida completa.

---

# Componentes involucrados

- PaseTable
- PaseTurnManager
- PaseResolver
- PaseRules
- PasePotFunding
- PaseSettlementResolver
- EventManager
- Wallet
- TransactionManager

---

# Flujo General

initialize()

↓

Validar dependencias

↓

Validar mesa

↓

Validar jugadores

↓

Asignar tirador

↓

GAME_INITIALIZED

↓

startGame()

↓

GAME_STARTED

↓

createRound()

↓

ROUND_STARTED

↓

Abrir apuestas

↓

Apuestas cerradas

↓

Lanzamiento de dados

↓

PaseResolver

↓

¿Ganó Mala?

├── SI
│
│ SettlementResolver
│
│ Pago
│
│ GAME_FINISHED
│
└── NO
    │
    ¿Ganó Suerte?
    │
    ├── NO
    │      Nueva tirada
    │
    └── SI
           │
           SettlementResolver
           │
           ¿Debe financiarse?
           │
           SI
           │
           PasePotFunding
           │
           PaseTurnManager
           │
           ¿Pozo completo?
           │
           NO
           │
           Continuar buscando aportes
           │
           SI
           │
           Nueva tirada
           │
           PaseResolver
           │
           SettlementResolver
           │
           Pago
           │
           GAME_FINISHED

---

# Responsabilidades

## PaseEngine

Coordina todo.

Nunca decide reglas.

---

## PaseResolver

Interpreta el resultado de los dados.

---

## PaseRules

Contiene únicamente las reglas matemáticas del Pase.

---

## PaseTurnManager

Determina quién debe actuar.

Nunca mueve dinero.

---

## PasePotFunding

Administra el estado del pozo.

---

## PaseSettlementResolver

Decide el resultado económico.

Nunca modifica billeteras.

---

## Wallet

Ejecuta pagos.

---

## EventManager

Publica eventos.

---

# Estados del Engine

NOT_INITIALIZED

↓

INITIALIZED

↓

GAME_STARTED

↓

ROUND_STARTED

↓

WAITING_BETS

↓

ROLLING_DICE

↓

RESOLVING

↓

FUNDING

↓

PAYING

↓

GAME_FINISHED

---

# Regla Fundamental

Toda interacción con el juego deberá pasar exclusivamente por PaseEngine.

Ningún componente externo podrá interactuar directamente con:

- PaseTable
- PaseTurnManager
- PasePotFunding
- PaseSettlementResolver

PaseEngine será la única puerta de entrada al dominio del juego.

---

# Filosofía

PaseEngine coordina.

Los componentes especializados deciden.

El Core ejecuta.