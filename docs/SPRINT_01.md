# SPRINT 01 — DATABASE FOUNDATION

## Estado

En desarrollo.

---

## Objetivo principal

Diseñar la base de datos central de PlayPlatform para soportar:

- Salas multijugador.
- Hasta 5 sillas por sala.
- Jugadores temporales.
- Fichas virtuales.
- Apuestas.
- Partidas.
- Tiradas.
- Comisiones.
- Historial.
- Chat.
- Múltiples juegos.

La estructura deberá servir inicialmente para Pase y permitir incorporar Maka'i y otros juegos en el futuro.

---

## Alcance del Sprint

En este Sprint se definirán:

1. Entidades principales.
2. Relaciones entre tablas.
3. Estados de las salas y partidas.
4. Movimiento seguro de fichas.
5. Registro de apuestas.
6. Historial de resultados.
7. Registro de comisiones.
8. Reglas de seguridad de datos.

---

## Tablas previstas

- games
- rooms
- room_players
- wallets
- wallet_transactions
- game_sessions
- rounds
- bets
- game_events
- commissions
- chat_messages

---

## Criterios de finalización

El Sprint estará completo cuando:

- Todas las tablas estén documentadas.
- Las relaciones estén definidas.
- Los estados principales estén acordados.
- El flujo de fichas esté diseñado.
- El modelo permita incorporar juegos nuevos.
- El SQL inicial esté preparado.
- La estructura haya sido revisada antes de crearla en Supabase.

---

## Regla principal

Ningún saldo podrá modificarse sin generar una transacción.

Ninguna apuesta podrá existir sin fichas bloqueadas.

Ningún resultado podrá pagarse más de una vez.

---

## Próximo Sprint

Sprint 02 — Rooms and Seats.