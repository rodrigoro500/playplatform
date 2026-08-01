# PASE ARCHITECTURE
## Arquitectura Oficial del Juego Pase

**Versión:** 1.0  
**Estado:** En desarrollo  
**Proyecto:** PlayPlatform  
**Juego:** Pase  
**Autores:** Rodrigo Román & ORION  

---

# 1. PROPÓSITO

Este documento define la arquitectura técnica oficial del juego Pase dentro de PlayPlatform.

Su objetivo es establecer:

- Las responsabilidades de cada componente.
- La relación entre el Core y el juego Pase.
- La estructura de una mesa.
- La estructura de una partida.
- El control del tirador.
- El orden circular de los jugadores.
- La formación y financiación del pozo.
- La resolución de los dados.
- La resolución económica.
- La publicación de eventos.
- Los límites entre el motor y la interfaz.

Este documento no reemplaza las reglas oficiales.

Las reglas funcionales se encuentran en:

```text
docs/PaseRulesOfficial.md
```

La máquina de estados se encuentra en:

```text
docs/PaseStateMachine.md
```

---

# 2. PRINCIPIO ARQUITECTÓNICO

El Core de PlayPlatform no conoce las reglas del juego Pase.

```text
CORE
```

contiene elementos genéricos reutilizables:

- Player
- Room
- GameSession
- Round
- Bet
- Wallet
- Transaction
- EventManager
- StateManager
- RoundEngine

El juego Pase utiliza esos elementos, pero nunca modifica el Core para introducir reglas específicas.

La dependencia debe funcionar en una sola dirección:

```text
Pase
  ↓
Core
```

Nunca:

```text
Core
  ↓
Pase
```

---

# 3. REGLA DE DEPENDENCIA

Los archivos del Core no pueden importar componentes desde:

```text
src/games/Pase
```

Los archivos de Pase sí pueden importar componentes desde:

```text
src/core
```

Esta separación permite que PlayPlatform soporte otros juegos sin modificar su núcleo.

Ejemplos futuros:

```text
src/games/Pase
src/games/Makai
src/games/Poker
src/games/Blackjack
```

Cada juego tendrá sus propias reglas, estados, resoluciones y eventos.

---

# 4. ESTRUCTURA DEL JUEGO

La estructura principal del módulo Pase será:

```text
src/
└── games/
    └── Pase/
        ├── PaseEngine.js
        ├── PaseRules.js
        ├── PaseResolver.js
        ├── PaseSettlementResolver.js
        ├── PaseTurnManager.js
        ├── PasePotFunding.js
        ├── PaseEvents.js
        ├── PaseState.js
        └── index.js
```

En el futuro pueden agregarse:

```text
PaseConfig.js
PaseSession.js
PaseTable.js
PaseHistory.js
PaseValidator.js
PaseCommissionCalculator.js
```

Solamente deberán crearse cuando exista una responsabilidad real que lo justifique.

---

# 5. VISIÓN GENERAL

La arquitectura funcional del juego será:

```text
Interfaz
   ↓
PaseEngine
   ├── PaseState
   ├── PaseRules
   ├── PaseResolver
   ├── PaseTurnManager
   ├── PasePotFunding
   ├── PaseSettlementResolver
   └── PaseEvents
          ↓
     EventManager
          ↓
        Core
```

La interfaz solicita acciones.

El motor valida y decide.

La interfaz nunca determina:

- Quién es el siguiente jugador.
- Quién tira los dados.
- Cuánto falta para completar el pozo.
- Quién ganó.
- Si corresponde comisión.
- Cuánto debe cobrar el ganador.
- Qué transición de estado debe realizarse.

---

# 6. CAPAS DE LA ARQUITECTURA

El juego Pase se divide en cuatro capas.

## 6.1 Capa de presentación

Puede estar implementada con:

- React.
- Aplicación móvil.
- Aplicación de escritorio.
- Terminal administrativa.
- Interfaz web para espectadores.

Su responsabilidad es:

- Mostrar el estado del juego.
- Mostrar los jugadores.
- Mostrar el pozo.
- Mostrar a quién corresponde actuar.
- Recibir acciones del usuario.
- Enviar comandos al motor.
- Escuchar eventos del motor.

La capa de presentación no contiene reglas del juego.

---

## 6.2 Capa del juego

Ubicación:

```text
src/games/Pase
```

Contiene toda la lógica específica de Pase:

- Reglas de dados.
- Control del tirador.
- Orden de consulta.
- Financiación del pozo.
- Duplicación del pozo.
- Resolución económica.
- Comisión.
- Estados específicos.
- Eventos específicos.

---

## 6.3 Capa Core

Ubicación:

```text
src/core
```

Contiene infraestructura genérica:

- Entidades.
- Motores.
- Managers.
- Validadores.
- Eventos.
- Estados.
- Apuestas.
- Rondas.
- Sesiones.
- Billeteras.
- Transacciones.

---

## 6.4 Capa de persistencia

Será responsable de guardar:

- Mesas.
- Sesiones.
- Jugadores.
- Partidas.
- Rondas.
- Tiradas.
- Apuestas.
- Aportes al pozo.
- Resultados.
- Comisiones.
- Transacciones.
- Eventos.
- Historial.

La persistencia no debe decidir reglas.

Solamente almacena el resultado producido por el motor.

---

# 7. CONCEPTOS PRINCIPALES

## 7.1 Mesa

La mesa representa el espacio donde participan los jugadores.

Contiene:

- Identificador.
- Jugadores.
- Posiciones.
- Orden circular.
- Configuración.
- Sesión activa.
- Historial.
- Estado de disponibilidad.

Una mesa puede contener muchas partidas consecutivas.

---

## 7.2 Sesión

La sesión representa el tiempo durante el cual una mesa permanece activa.

Puede incluir:

- Ingreso de jugadores.
- Salida de jugadores.
- Múltiples partidas.
- Múltiples tiradores.
- Historial de apuestas.
- Historial de pagos.
- Saldo de fichas.

Una sesión no debe confundirse con una partida.

---

## 7.3 Partida

Una partida representa un enfrentamiento económico completo entre:

```text
SUERTE
```

y:

```text
MALA
```

Una partida puede incluir más de un juego consecutivo cuando Suerte gana.

Ejemplo:

```text
Juego inicial
    ↓
Gana Suerte
    ↓
Se completa nuevamente el pozo
    ↓
Segundo juego
    ↓
Resultado final
```

La partida termina cuando existe un pago definitivo.

---

## 7.4 Juego

Un juego representa una resolución completa de dados.

Puede contener:

- Primera tirada.
- Establecimiento de punto.
- Tiradas posteriores.
- Resultado Suerte.
- Resultado Mala.

Cuando Suerte gana el primer juego, la partida puede continuar con un nuevo juego.

---

## 7.5 Ronda

La ronda es una unidad técnica utilizada por el Core.

Puede representar:

- Una etapa de apuestas.
- Una secuencia de tiradas.
- Un juego completo.
- Una fase de financiación.

La definición exacta deberá mantenerse consistente durante la implementación.

No deben utilizarse indistintamente los términos partida, juego y ronda.

---

## 7.6 Tirador

Es el jugador que posee los dados.

Representa el lado Suerte.

Mientras Suerte continúe ganando y el tirador decida seguir, conserva el derecho a lanzar nuevamente.

El tirador no puede apostar contra sí mismo del lado Mala.

---

## 7.7 Suerte

Es el lado representado por el tirador.

Su victoria puede provocar:

- Continuación de la partida.
- Duplicación del pozo.
- Nueva financiación por Mala.
- Pago final con comisión cuando se cumple la condición correspondiente.

---

## 7.8 Mala

Es el lado contrario al tirador.

Puede estar financiado por uno o varios jugadores.

Los aportes de Mala deben registrarse individualmente.

---

## 7.9 Pozo

Es el total comprometido dentro de la partida.

Debe distinguirse entre:

```text
Pozo actual
Monto requerido
Monto financiado
Monto pendiente
Pozo final
```

El pozo no debe calcularse únicamente desde la interfaz.

---

## 7.10 Aporte

Es el monto colocado por un jugador para financiar el lado Mala.

Cada aporte debe registrar:

- Jugador.
- Monto.
- Juego.
- Partida.
- Momento.
- Estado.
- Origen.
- Confirmación.

---

# 8. RESPONSABILIDADES DE LOS COMPONENTES

# 8.1 PaseEngine

Archivo:

```text
PaseEngine.js
```

Es el coordinador principal del juego.

Sus responsabilidades son:

- Iniciar una partida.
- Finalizar una partida.
- Crear juegos o rondas.
- Controlar el estado actual.
- Validar las acciones permitidas.
- Coordinar los componentes internos.
- Solicitar la resolución de los dados.
- Solicitar la financiación del pozo.
- Solicitar la resolución económica.
- Publicar eventos.
- Impedir transiciones inválidas.

PaseEngine no debe:

- Implementar directamente todas las reglas.
- Calcular manualmente el orden de jugadores.
- Manipular directamente la interfaz.
- Guardar datos directamente en la base de datos.
- Calcular pagos sin utilizar el componente correspondiente.

---

# 8.2 PaseRules

Archivo:

```text
PaseRules.js
```

Contiene las reglas puras de los dados.

Responsabilidades:

- Validar valores de dados.
- Calcular el total.
- Determinar si una suma es válida.
- Identificar victoria inicial de Suerte.
- Identificar victoria inicial de Mala.
- Identificar establecimiento de punto.
- Validar una tirada posterior al punto.

No debe conocer:

- Wallet.
- Transaction.
- Comisión.
- Pozo.
- Orden de jugadores.
- Interfaz.
- Persistencia.

Debe comportarse como una función lógica y predecible.

---

# 8.3 PaseResolver

Archivo:

```text
PaseResolver.js
```

Resuelve el resultado deportivo de los dados.

Responsabilidades:

- Resolver la primera tirada.
- Resolver una secuencia con punto.
- Informar si el juego continúa.
- Informar si ganó Suerte.
- Informar si ganó Mala.
- Mantener el punto cuando corresponda.

Ejemplo de respuesta:

```javascript
{
  finished: true,
  winner: "SUERTE",
  point: null,
  evaluation: {
    dieOne: 3,
    dieTwo: 4,
    total: 7,
    type: "WIN"
  }
}
```

PaseResolver no decide:

- Quién cobra.
- Cuánto cobra.
- Cuánto debe agregarse al pozo.
- Quién debe completar el pozo.
- Si corresponde comisión.
- Quién será el siguiente tirador.

---

# 8.4 PaseSettlementResolver

Archivo:

```text
PaseSettlementResolver.js
```

Resuelve las consecuencias económicas después de conocer al ganador del juego.

Responsabilidades:

- Determinar si la partida termina.
- Determinar si el pozo debe continuar.
- Determinar cuánto debe agregarse.
- Determinar si corresponde comisión.
- Calcular la comisión.
- Calcular el monto final del ganador.
- Identificar el lado beneficiario.
- Preparar las instrucciones de pago.
- Preparar las instrucciones de devolución cuando corresponda.

Ejemplo conceptual:

```javascript
{
  finished: false,
  requiresPotFunding: true,
  requiredAmount: 60,
  commissionAmount: 0,
  payoutAmount: 0
}
```

Otro ejemplo:

```javascript
{
  finished: true,
  winner: "SUERTE",
  requiresPotFunding: false,
  potAmount: 120,
  commissionAmount: 12,
  payoutAmount: 108
}
```

Este componente no debe modificar directamente las billeteras.

Debe devolver instrucciones para que otro componente del Core ejecute las transacciones.

---

# 8.5 PaseTurnManager

Archivo:

```text
PaseTurnManager.js
```

Administra el orden circular de los jugadores.

Responsabilidades:

- Mantener el orden de la mesa.
- Identificar al tirador.
- Identificar al siguiente jugador.
- Recorrer los jugadores en sentido horario.
- Saltar al tirador cuando se buscan apostadores de Mala.
- Dar prioridad al último apostador activo cuando corresponda.
- Continuar desde el jugador siguiente después de un aporte parcial.
- Reiniciar el recorrido cuando se complete una vuelta.
- Informar a quién corresponde responder.
- Registrar rechazos y aceptaciones.
- Evitar saltos arbitrarios.

Ejemplo:

```text
Jugador 1 = Tirador

Orden elegible:

Jugador 2
Jugador 3
Jugador 4
Jugador 5
Jugador 2
```

El TurnManager no administra dinero.

Solamente decide el orden de participación.

---

# 8.6 PasePotFunding

Archivo:

```text
PasePotFunding.js
```

Administra la financiación del lado Mala.

Responsabilidades:

- Definir el monto requerido.
- Registrar aportes.
- Permitir aportes parciales.
- Calcular el total financiado.
- Calcular el monto pendiente.
- Impedir aportes superiores al monto pendiente.
- Informar si el pozo fue completado.
- Mantener la lista de participantes.
- Identificar al último apostador activo.
- Preparar información para posibles devoluciones.

Ejemplo de estado:

```javascript
{
  requiredAmount: 120,
  fundedAmount: 90,
  remainingAmount: 30,
  completed: false,
  contributions: [
    {
      playerId: "player-4",
      amount: 60
    },
    {
      playerId: "player-5",
      amount: 30
    }
  ]
}
```

PasePotFunding no decide a quién preguntar.

Esa responsabilidad pertenece a PaseTurnManager.

---

# 8.7 PaseState

Archivo:

```text
PaseState.js
```

Define:

- Estados permitidos.
- Transiciones permitidas.
- Estados terminales.
- Estados de espera.
- Estados de resolución.
- Estados de pago.

Debe ser la representación técnica de:

```text
docs/PaseStateMachine.md
```

No debe contener reglas financieras.

---

# 8.8 PaseEvents

Archivo:

```text
PaseEvents.js
```

Define los nombres oficiales de los eventos.

Ejemplo:

```javascript
const PASE_EVENTS = Object.freeze({
  GAME_STARTED: "PASE_GAME_STARTED",
  SHOOTER_SELECTED: "PASE_SHOOTER_SELECTED",
  BET_ACCEPTED: "PASE_BET_ACCEPTED",
  POT_COMPLETED: "PASE_POT_COMPLETED",
  DICE_ROLLED: "PASE_DICE_ROLLED",
  POINT_ESTABLISHED: "PASE_POINT_ESTABLISHED",
  SUERTE_WON: "PASE_SUERTE_WON",
  MALA_WON: "PASE_MALA_WON",
  PAYMENT_COMPLETED: "PASE_PAYMENT_COMPLETED",
  GAME_FINISHED: "PASE_GAME_FINISHED"
});
```

Los eventos deben utilizar nombres constantes.

No deben escribirse cadenas de texto repetidas por diferentes archivos.

---

# 8.9 index.js

Archivo:

```text
index.js
```

Expone públicamente los componentes del juego.

Ejemplo futuro:

```javascript
export { default as PaseEngine } from "./PaseEngine";
export { default as PaseRules } from "./PaseRules";
export { default as PaseResolver } from "./PaseResolver";
export { default as PaseTurnManager } from "./PaseTurnManager";
export { default as PasePotFunding } from "./PasePotFunding";
export { default as PaseSettlementResolver } from "./PaseSettlementResolver";

export * from "./PaseEvents";
export * from "./PaseState";
```

Esto permite importar el módulo desde un único punto.

---

# 9. ESTRUCTURA DE UNA MESA

Una mesa de Pase podría representarse conceptualmente así:

```javascript
{
  id: "table-001",
  status: "ACTIVE",
  players: [
    {
      playerId: "player-1",
      position: 1
    },
    {
      playerId: "player-2",
      position: 2
    },
    {
      playerId: "player-3",
      position: 3
    },
    {
      playerId: "player-4",
      position: 4
    },
    {
      playerId: "player-5",
      position: 5
    }
  ],
  shooterId: "player-1",
  activeSessionId: "session-001"
}
```

La posición de cada jugador debe mantenerse estable mientras permanezca dentro de la mesa.

---

# 10. ORDEN CIRCULAR

El orden se interpreta como un círculo.

Ejemplo:

```text
Jugador 1
    ↓
Jugador 2
    ↓
Jugador 3
    ↓
Jugador 4
    ↓
Jugador 5
    ↓
Jugador 1
```

El sistema debe poder obtener:

```javascript
getNextPlayer(playerId)
```

También debe poder obtener:

```javascript
getNextEligiblePlayer({
  fromPlayerId,
  excludedPlayerIds
})
```

Durante la financiación del lado Mala, el tirador debe excluirse.

---

# 11. PRIORIDAD DEL APOSTADOR ANTERIOR

Cuando Suerte gana y debe financiarse un nuevo pozo, puede existir un apostador anterior con prioridad.

Ejemplo:

```text
Tirador: Jugador 1
Último apostador activo: Jugador 4
Monto requerido: 120
```

La primera consulta debe realizarse al Jugador 4.

Si aporta parcialmente:

```text
Jugador 4 aporta 60
Pendiente 60
```

El recorrido continúa desde:

```text
Jugador 5
```

El tirador debe saltarse.

Por lo tanto:

```text
Jugador 4
Jugador 5
Jugador 2
Jugador 3
Jugador 4
```

---

# 12. ESTADO DE FINANCIACIÓN

La financiación debe poseer su propio estado.

Ejemplo:

```javascript
{
  id: "funding-001",
  gameId: "game-002",
  requiredAmount: 120,
  fundedAmount: 60,
  remainingAmount: 60,
  completed: false,
  currentCandidatePlayerId: "player-5",
  priorityPlayerId: "player-4",
  contributions: [
    {
      playerId: "player-4",
      amount: 60
    }
  ],
  rejectedPlayerIds: []
}
```

Los rechazos pueden reiniciarse al comenzar una nueva vuelta circular.

No deben eliminarse los aportes realizados.

---

# 13. FLUJO DE UNA PARTIDA

Flujo general:

```text
Crear partida
    ↓
Seleccionar tirador
    ↓
Abrir apuestas iniciales
    ↓
Completar pozo inicial
    ↓
Cerrar apuestas
    ↓
Tirar dados
    ↓
Resolver dados
```

Si gana Mala:

```text
Resolver pago
    ↓
Pagar el pozo completo a Mala
    ↓
Finalizar partida
```

Si gana Suerte por primera vez:

```text
No pagar
    ↓
No cobrar comisión
    ↓
Calcular nuevo monto requerido
    ↓
Buscar financiación de Mala
    ↓
Completar el pozo
    ↓
El mismo tirador vuelve a jugar
```

Si vuelve a ganar Suerte:

```text
Calcular comisión
    ↓
Descontar comisión
    ↓
Pagar el resto a Suerte
    ↓
Finalizar partida
```

Si Mala gana después de haberse duplicado el pozo:

```text
No cobrar comisión
    ↓
Pagar el pozo completo a Mala
    ↓
Finalizar partida
```

---

# 14. FLUJO DEL PUNTO

Una resolución de dados puede requerir varias tiradas.

Primera tirada:

```text
7 u 11
→ gana Suerte
```

```text
2, 3 o 12
→ gana Mala
```

```text
4, 5, 6, 8, 9 o 10
→ se establece punto
```

Después de establecerse el punto:

```text
Se repite el punto
→ gana Suerte
```

```text
Sale 7
→ gana Mala
```

```text
Sale cualquier otro número
→ continúa el mismo juego
```

El pozo no se modifica durante una secuencia de punto.

La financiación solamente se solicita después de que un juego completo termine con victoria de Suerte y corresponda continuar la partida.

---

# 15. TRANSACCIONES

El motor no debe alterar saldos mediante operaciones informales.

Toda modificación económica debe producir una Transaction.

Tipos conceptuales:

```text
BET_DEBIT
POT_CONTRIBUTION
PAYOUT_CREDIT
COMMISSION_DEBIT
REFUND_CREDIT
ADMIN_ADJUSTMENT
```

Cada transacción debe registrar:

- Identificador.
- Jugador.
- Partida.
- Juego.
- Apuesta o aporte.
- Monto.
- Tipo.
- Estado.
- Fecha.
- Referencia.
- Motivo.

---

# 16. COMISIÓN

La comisión debe calcularse en un componente específico o dentro de PaseSettlementResolver.

Debe ser configurable.

Ejemplo:

```javascript
{
  commissionRate: 0.1
}
```

Una tasa del 10 % representa:

```text
Pozo: 120
Comisión: 12
Pago a Suerte: 108
```

La comisión no debe aplicarse cuando:

- Mala gana el primer juego.
- Mala gana después de que el pozo fue duplicado.
- Suerte gana solamente el primer juego y la partida continúa.
- La partida es cancelada con devolución.

Las reglas oficiales de comisión deben mantenerse en:

```text
docs/PaseRulesOfficial.md
```

---

# 17. EVENTOS

Cada acción importante debe generar un evento.

Eventos conceptuales:

```text
PASE_GAME_CREATED
PASE_GAME_STARTED
PASE_SHOOTER_SELECTED
PASE_INITIAL_BET_OPENED
PASE_CONTRIBUTION_REQUESTED
PASE_CONTRIBUTION_ACCEPTED
PASE_CONTRIBUTION_REJECTED
PASE_POT_COMPLETED
PASE_BETS_CLOSED
PASE_DICE_ROLLED
PASE_POINT_ESTABLISHED
PASE_ROLL_CONTINUED
PASE_SUERTE_WON
PASE_MALA_WON
PASE_POT_FUNDING_STARTED
PASE_COMMISSION_CALCULATED
PASE_PAYMENT_COMPLETED
PASE_GAME_CANCELLED
PASE_GAME_FINISHED
```

Ejemplo de evento:

```javascript
{
  type: "PASE_CONTRIBUTION_ACCEPTED",
  payload: {
    gameId: "game-002",
    playerId: "player-4",
    amount: 60,
    remainingAmount: 60
  },
  createdAt: "ISO_DATE"
}
```

Los eventos podrán utilizarse para:

- Actualizar la interfaz.
- Registrar auditorías.
- Generar estadísticas.
- Reconstruir partidas.
- Enviar notificaciones.
- Detectar errores.
- Crear repeticiones.

---

# 18. VALIDACIONES

Toda acción debe validarse antes de ser ejecutada.

Ejemplos:

- El jugador existe.
- El jugador pertenece a la mesa.
- El jugador está activo.
- El jugador tiene saldo.
- El jugador consultado es el correcto.
- El tirador no apuesta contra sí mismo.
- El monto es positivo.
- El monto no supera el pendiente.
- El juego se encuentra en el estado correcto.
- Las apuestas están abiertas.
- Los dados contienen valores válidos.
- El pozo está completo antes de tirar.
- No existe una resolución duplicada.
- No existe un pago duplicado.

Una acción inválida no debe modificar el estado.

---

# 19. ERRORES DE NEGOCIO

Los errores de negocio deben ser claros.

Ejemplos:

```text
PASE_INVALID_STATE
PASE_PLAYER_NOT_FOUND
PASE_PLAYER_NOT_ELIGIBLE
PASE_NOT_PLAYER_TURN
PASE_INVALID_CONTRIBUTION
PASE_INSUFFICIENT_BALANCE
PASE_POT_NOT_COMPLETED
PASE_BETS_ALREADY_CLOSED
PASE_INVALID_DICE
PASE_GAME_ALREADY_FINISHED
PASE_PAYMENT_ALREADY_COMPLETED
```

El motor puede devolver:

```javascript
{
  success: false,
  error: {
    code: "PASE_NOT_PLAYER_TURN",
    message: "No corresponde consultar a este jugador."
  }
}
```

La interfaz muestra el mensaje, pero no interpreta la regla.

---

# 20. ESTADO INMUTABLE Y CONSISTENCIA

Siempre que sea posible, las operaciones deberán:

- Validar primero.
- Calcular el nuevo resultado.
- Aplicar el cambio una sola vez.
- Publicar el evento después del cambio.
- Persistir el resultado de forma consistente.

No deben realizarse cambios parciales que dejen el juego en un estado inválido.

Ejemplo incorrecto:

```text
Descontar saldo
    ↓
Error antes de registrar el aporte
```

Ejemplo correcto:

```text
Validar saldo
    ↓
Validar turno
    ↓
Validar monto
    ↓
Crear transacción
    ↓
Registrar aporte
    ↓
Actualizar financiación
    ↓
Publicar evento
```

---

# 21. RECUPERACIÓN DEL ESTADO

El juego deberá poder reconstruirse utilizando:

- Estado persistido.
- Historial de eventos.
- Apuestas.
- Aportes.
- Tiradas.
- Transacciones.
- Resultados.

Esto será importante para:

- Reconexiones.
- Reinicios del servidor.
- Auditoría.
- Repetición.
- Resolución de reclamos.

No se debe depender exclusivamente del estado local de React.

---

# 22. SEGURIDAD

El servidor debe ser la autoridad final.

El cliente no puede enviar como verdad:

```text
Ganó Suerte
```

El cliente solamente puede enviar una acción autorizada, por ejemplo:

```javascript
{
  action: "ROLL_DICE"
}
```

El motor determina el resultado.

Tampoco debe confiarse directamente en datos enviados por el cliente como:

- Saldo.
- Pozo.
- Comisión.
- Turno.
- Jugador siguiente.
- Ganador.
- Pago.

---

# 23. PRUEBAS

Cada componente debe probarse de forma independiente.

## PaseRules

Casos:

- Dados válidos.
- Dados inválidos.
- Victoria inicial de Suerte.
- Victoria inicial de Mala.
- Establecimiento de punto.

## PaseResolver

Casos:

- Suerte gana en la primera tirada.
- Mala gana en la primera tirada.
- Se establece punto.
- Suerte repite el punto.
- Mala obtiene siete.
- La tirada continúa.

## PaseTurnManager

Casos:

- Obtener siguiente jugador.
- Recorrer toda la mesa.
- Saltar al tirador.
- Priorizar último apostador.
- Continuar después de aporte parcial.
- Reiniciar recorrido circular.

## PasePotFunding

Casos:

- Registrar aporte completo.
- Registrar aporte parcial.
- Rechazar monto superior.
- Calcular pendiente.
- Completar financiación.
- Registrar múltiples apostadores.

## PaseSettlementResolver

Casos:

- Mala gana pozo inicial.
- Suerte gana por primera vez.
- Mala gana pozo duplicado.
- Suerte gana nuevamente.
- Comisión correcta.
- Pago correcto.
- Cancelación y devolución.

## PaseEngine

Casos:

- Flujo completo de partida.
- Transiciones válidas.
- Transiciones inválidas.
- Eventos emitidos.
- Prevención de pago duplicado.
- Prevención de resolución duplicada.

---

# 24. ESTRATEGIA DE IMPLEMENTACIÓN

El orden recomendado de desarrollo es:

```text
1. PaseEvents
2. PaseTurnManager
3. PasePotFunding
4. PaseSettlementResolver
5. Integración con PaseEngine
6. Actualización de PaseState
7. Sandbox completo
8. Pruebas automatizadas
9. Persistencia
10. Interfaz
```

Cada componente debe probarse antes de integrarse con el siguiente.

---

# 25. REGLA FUNDAMENTAL DE LA INTERFAZ

La interfaz nunca decide las reglas.

La interfaz puede preguntar:

```text
¿Quién debe actuar?
¿Cuánto falta?
¿Puede este jugador aportar?
¿Puede lanzarse el dado?
¿Cuál es el estado actual?
```

El motor responde.

La interfaz nunca puede decidir directamente:

```text
Ahora juega el Jugador 5.
El pozo ya está completo.
Suerte ganó.
Debe cobrarse comisión.
La partida terminó.
```

---

# 26. FUENTE DE VERDAD

Las fuentes oficiales del juego serán:

```text
PaseRulesOfficial.md
```

para las reglas.

```text
PaseStateMachine.md
```

para el flujo.

```text
PaseArchitecture.md
```

para la arquitectura técnica.

El código debe implementar estos documentos.

Cuando una regla cambie:

```text
1. Actualizar documentación.
2. Actualizar pruebas.
3. Actualizar implementación.
4. Registrar el cambio.
```

---

# 27. DECISIONES PENDIENTES

Todavía deben definirse oficialmente:

- Cómo se selecciona el primer tirador.
- Cuándo el tirador pierde voluntariamente los dados.
- Qué ocurre cuando el tirador decide no continuar.
- Quién será el siguiente tirador.
- Si existe un monto mínimo de apuesta.
- Si existe un monto máximo de apuesta.
- Porcentaje oficial de comisión.
- Límite de tiempo para responder.
- Cantidad máxima de vueltas sin financiación.
- Cancelación por falta de apostadores.
- Qué ocurre si un jugador se desconecta.
- Qué ocurre si un jugador abandona con aporte activo.
- Distribución exacta del pago entre varios participantes de Mala.
- Manejo de empates administrativos.
- Manejo de errores durante una tirada.
- Política de devolución.
- Cantidad mínima y máxima de jugadores.
- Posibilidad de espectadores.
- Permisos del administrador.

Estas decisiones deberán documentarse antes de implementarse.

---

# 28. PRINCIPIO FINAL

PlayPlatform debe ser capaz de ejecutar el juego Pase sin depender de una interfaz específica.

El mismo motor debe poder utilizarse desde:

- Web.
- Android.
- iOS.
- Escritorio.
- Terminal.
- Simulador.
- Pruebas automatizadas.

La arquitectura debe garantizar que las reglas sean consistentes en todas las plataformas.

---

# 29. DECISIÓN ORION N.º 18

> El juego Pase se implementará como un módulo independiente construido sobre el Core de PlayPlatform. Cada responsabilidad importante tendrá un componente específico. PaseEngine coordinará el sistema, pero no concentrará todas las reglas ni toda la lógica financiera.

---

# 30. ESTADO ACTUAL

Componentes creados:

```text
PaseEngine.js
PaseRules.js
PaseResolver.js
PaseEvents.js
PaseState.js
index.js
```

Componentes pendientes:

```text
PaseTurnManager.js
PasePotFunding.js
PaseSettlementResolver.js
```

Próximo componente recomendado:

```text
PaseEvents.js
```

Después:

```text
PaseTurnManager.js
```