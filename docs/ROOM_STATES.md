# ROOM STATES

Versión 1.0

---

# OBJETIVO

Toda sala deberá encontrarse siempre en un único estado.

Atlas será el responsable de controlar el cambio entre estados.

---

# ESTADOS

WAITING

Esperando jugadores.

↓

READY

Hay suficientes jugadores para comenzar.

↓

CREDITS

Administrador acredita fichas.

↓

GAME_SELECTION

Selección del juego.

↓

BETTING

Los jugadores realizan apuestas.

↓

LOCKING_BETS

Atlas bloquea las fichas.

↓

WAITING_BALANCE

Esperando que ambos lados igualen el monto.

↓

GAME_RUNNING

El juego está ejecutándose.

↓

CALCULATING

Atlas calcula resultados.

↓

PAYING

Atlas distribuye premios.

↓

ROUND_FINISHED

La ronda terminó.

↓

NEXT_ROUND

Preparando nueva ronda.

↓

ROOM_FINISHED

Sala cerrada.

---

# REGLA

Una sala nunca podrá encontrarse en dos estados al mismo tiempo.

Atlas será el único autorizado para cambiar el estado.