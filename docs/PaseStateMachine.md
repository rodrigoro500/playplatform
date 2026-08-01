# PASE STATE MACHINE
## Máquina Oficial de Estados

Versión: 1.0
Estado: En desarrollo

---

# OBJETIVO

Este documento define todos los estados posibles de una partida de Pase y las transiciones permitidas entre ellos.

Toda transición del juego deberá respetar esta máquina de estados.

---

# FILOSOFÍA

Cada partida solamente puede encontrarse en un único estado.

Nunca puede existir una transición que no esté documentada aquí.

---

# ESTADOS

IDLE

↓

WAITING_PLAYERS

↓

WAITING_INITIAL_BETS

↓

FIRST_ROLL

↓

FIRST_RESULT

↓

WAITING_POT_COMPLETION

↓

SECOND_ROLL

↓

SECOND_RESULT

↓

PAYMENT

↓

FINISHED

---

# DESCRIPCIÓN DE CADA ESTADO

## IDLE

No existe una partida activa.

---

## WAITING_PLAYERS

El sistema espera que los jugadores ingresen a la mesa.

---

## WAITING_INITIAL_BETS

Se reciben las apuestas iniciales.

Cuando el pozo queda completo comienza la partida.

---

## FIRST_ROLL

El tirador lanza los dados.

---

## FIRST_RESULT

El motor interpreta los dados.

Existen tres posibilidades:

• Gana Suerte.

• Gana Mala.

• Se establece Punto.

---

## WAITING_POT_COMPLETION

Este estado solamente existe cuando Suerte ganó.

El pozo todavía NO se paga.

Debe completarse el nuevo monto requerido.

Aquí interviene PaseTurnManager.

---

## SECOND_ROLL

El mismo tirador vuelve a lanzar.

---

## SECOND_RESULT

El motor vuelve a resolver la tirada.

Si gana Suerte:

La partida termina.

Si gana Mala:

La partida termina.

---

## PAYMENT

Se calculan:

• Comisión.

• Ganador.

• Pago final.

---

## FINISHED

La partida terminó.

Toda la información queda registrada.

---

# TRANSICIONES

IDLE

↓

WAITING_PLAYERS

↓

WAITING_INITIAL_BETS

↓

FIRST_ROLL

↓

FIRST_RESULT

↓

┌───────────────┐
│               │
│ Gana Mala     │
│               │
↓               │
PAYMENT         │
↓               │
FINISHED        │
│               │
└───────────────┘

FIRST_RESULT

↓

Gana Suerte

↓

WAITING_POT_COMPLETION

↓

SECOND_ROLL

↓

SECOND_RESULT

↓

PAYMENT

↓

FINISHED

---

# EVENTOS

Cada transición genera un evento.

Ejemplo:

GAME_CREATED

↓

PLAYER_JOINED

↓

BET_PLACED

↓

FIRST_ROLL_STARTED

↓

FIRST_ROLL_FINISHED

↓

POT_COMPLETION_STARTED

↓

SECOND_ROLL_STARTED

↓

SECOND_ROLL_FINISHED

↓

PAYMENT_COMPLETED

↓

GAME_FINISHED

---

# RESPONSABILIDADES

PaseEngine

Coordina los estados.

---

PaseRules

Interpreta reglas.

---

PaseResolver

Determina el resultado de los dados.

---

PaseTurnManager

Decide a quién preguntar.

---

PaseSettlementResolver

Decide pagos y comisiones.

---

EventManager

Publica todos los eventos.

---

# REGLA FUNDAMENTAL

Ningún componente puede cambiar directamente el estado de la partida.

Toda transición deberá realizarse únicamente a través de PaseEngine.

Esto garantiza consistencia y evita estados inválidos.