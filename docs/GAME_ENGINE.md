# GAME ENGINE

Versión 1.0

---

# DEFINICIÓN

El Game Engine es el núcleo principal de la plataforma.

Su responsabilidad es administrar todo lo relacionado con las partidas sin importar el juego que se esté ejecutando.

---

# RESPONSABILIDADES

✓ Crear salas

✓ Administrar jugadores

✓ Administrar sillas

✓ Administrar fichas

✓ Administrar apuestas

✓ Validar reglas generales

✓ Sincronizar jugadores

✓ Registrar historial

✓ Cobrar comisiones

✓ Registrar estadísticas

✓ Administrar turnos

---

# EL MOTOR NO CONOCE LOS JUEGOS

El Motor Principal nunca sabrá cómo se juega Pase.

Tampoco sabrá cómo se juega Maka'i.

Los juegos solamente informarán:

• Inicio

• Estado

• Resultado

El resto será responsabilidad del Motor.

---

# FLUJO GENERAL

Jugador

↓

Sala

↓

Motor

↓

Juego

↓

Resultado

↓

Motor

↓

Pago

↓

Historial

↓

Estadísticas

---

# REGLA

Todo juego nuevo deberá utilizar el mismo Motor Principal.