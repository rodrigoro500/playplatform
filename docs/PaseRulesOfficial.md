# PASE RULES OFFICIAL
## Documento Oficial de Reglas

Versión: 1.0
Estado: En desarrollo
Motor: PlayPlatform
Autor: Rodrigo Román & ORION

---

# 1. OBJETIVO

Este documento define las reglas oficiales del juego Pase implementado sobre PlayPlatform.

Toda modificación en las reglas deberá realizarse primero en este documento y posteriormente implementarse en el código.

Este documento es la fuente oficial de verdad del juego.

---

# 2. PRINCIPIOS

Las reglas del juego nunca dependen de la interfaz.

La interfaz solamente muestra información.

Toda la lógica pertenece al motor del juego.

---

# 3. ROLES

## Tirador

Jugador que posee los dados.

Representa al lado SUERTE.

Mientras continúe ganando mantiene el derecho de seguir lanzando.

---

## Mala

Representa a todos los jugadores que apuestan contra el tirador.

Puede estar compuesta por uno o varios jugadores.

---

## Casa

Administra:

- Pozo
- Comisión
- Validación
- Estados
- Registro de partidas

La Casa nunca participa como jugador.

---

# 4. ORDEN DE LOS JUGADORES

Los jugadores siempre ocupan una posición fija dentro de la mesa.

El recorrido siempre se realiza en sentido horario.

Ejemplo:

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

Nunca puede saltarse un jugador.

El motor es el responsable de respetar este orden.

La interfaz nunca decide el siguiente jugador.

---

# 5. EL TIRADOR

Al comenzar la partida existe un único tirador.

Ese jugador representa a SUERTE.

Mientras continúe ganando conserva el derecho de seguir lanzando los dados.

No pierde automáticamente el turno después de ganar.

El cambio de tirador será definido por las reglas posteriores del juego.

---

# 6. PRIMER POZO

Ejemplo:

Suerte apuesta:
30

Mala apuesta:
30

Pozo inicial:

60

---

# 7. SI GANA MALA

Si Mala gana en la primera resolución:

La partida termina inmediatamente.

Mala cobra el total del pozo.

No existe segunda ronda.

No se duplica el pozo.

Actualmente no se descuenta comisión.

---

# 8. SI GANA SUERTE

Si Suerte gana la primera resolución:

No cobra.

No se paga el pozo.

No se descuenta comisión.

La partida continúa.

---

# 9. DUPLICACIÓN DEL POZO

Después de ganar Suerte:

Debe duplicarse el valor del pozo.

Ejemplo:

Pozo:

60

Debe agregarse:

60

Nuevo pozo:

120

---

# 10. QUIÉN COMPLETA EL POZO

La búsqueda comienza por el jugador ubicado inmediatamente a la derecha del tirador.

Nunca se puede consultar a un jugador fuera del orden.

Ejemplo:

Jugador 1 es tirador.

Se consulta:

Jugador 2

↓

Jugador 3

↓

Jugador 4

↓

Jugador 5

Si nadie acepta:

La búsqueda vuelve a comenzar desde el Jugador 2.

---

# 11. APORTES PARCIALES

Un jugador puede completar solamente una parte del monto requerido.

Ejemplo:

Monto requerido:

60

Jugador 2 aporta:

20

Pendiente:

40

Luego se consulta al siguiente jugador.

---

# 12. ÚLTIMO APOSTADOR

Si un jugador fue quien aceptó la apuesta anterior, tendrá prioridad para continuar financiando el nuevo pozo.

Ejemplo:

Jugador 4 aceptó apostar.

Suerte vuelve a ganar.

El sistema preguntará primero nuevamente al Jugador 4.

Si aporta parcialmente, el recorrido continúa desde el siguiente jugador en sentido horario.

---

# 13. SEGUNDA RESOLUCIÓN

Si Suerte vuelve a ganar:

La partida termina.

Se descuenta la comisión correspondiente.

Suerte cobra el resto.

---

Si Mala gana:

La partida termina.

Mala cobra el pozo completo.

Actualmente no se descuenta comisión.

---

# 14. FILOSOFÍA DEL MOTOR

La interfaz nunca toma decisiones.

El motor responde preguntas como:

¿Quién tira?

¿Quién juega?

¿Quién debe apostar?

¿Cuánto falta para completar el pozo?

¿Quién ganó?

¿Cuánto debe pagarse?

Toda la lógica pertenece al motor.

---

# 15. DECISIONES PENDIENTES

Pendientes de definir:

• Cambio de tirador después de terminar una partida.

• Comisión oficial.

• Límite de tiempo para aceptar apuestas.

• Cantidad máxima de jugadores.

• Cancelación automática de partidas.

• Reconexión de jugadores.

• Manejo de jugadores ausentes.