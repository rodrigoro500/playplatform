# PLAY PLATFORM

# ARQUITECTURA GENERAL

Versión 1.0

---

## FILOSOFÍA

La plataforma NO está diseñada para un solo juego.

Está diseñada para administrar salas de juegos.

Cada juego será un módulo independiente que utilizará un mismo motor principal.

---

# ESTRUCTURA

Play Platform

│

├── Motor Principal

│

├── Usuarios

├── Salas

├── Sillas

├── Fichas

├── Apuestas

├── Chat

├── Audio

├── Estadísticas

├── Historial

├── Panel Administrativo

│

└── Juegos

        │

        ├── Pase

        ├── Maka'i

        └── Juegos futuros

---

# RESPONSABILIDAD DEL MOTOR

El Motor Principal será responsable de:

• Crear salas.

• Administrar jugadores.

• Controlar las sillas.

• Validar apuestas.

• Bloquear fichas.

• Liberar fichas.

• Registrar el historial.

• Registrar estadísticas.

• Cobrar comisiones.

• Controlar los turnos.

• Sincronizar el juego en tiempo real.

---

# RESPONSABILIDAD DE LOS JUEGOS

Cada juego solamente deberá contener:

• Reglas.

• Animaciones.

• Resultado.

Nunca administrará usuarios.

Nunca administrará fichas.

Nunca administrará pagos.

Todo eso será responsabilidad del Motor Principal.

---

# PRINCIPIO DE ESCALABILIDAD

Agregar un nuevo juego NO deberá requerir modificar el Motor Principal.

El nuevo juego simplemente utilizará los servicios ya existentes.

---

# MÓDULOS PRINCIPALES

1. Core Engine

2. Rooms

3. Wallet

4. Bets

5. Players

6. Statistics

7. Chat

8. Audio

9. Admin

10. Games

---

# OBJETIVO

Que dentro de cinco años la plataforma pueda incorporar nuevos juegos sin modificar su arquitectura principal.