# DATABASE

Versión 1.0

---

## PRINCIPIO GENERAL

La base de datos pertenece a la plataforma, no a un juego específico.

Pase, Maka'i y los juegos futuros utilizarán las mismas tablas centrales.

Las reglas particulares de cada juego se guardarán mediante estados y datos configurables, sin duplicar toda la infraestructura.

---

# ENTIDADES PRINCIPALES

## games

Catálogo de juegos disponibles.

Campos previstos:

- id
- code
- name
- description
- is_active
- min_players
- max_players
- created_at

Ejemplos:

- pase
- makai

---

## rooms

Representa una sala creada para una partida.

Campos previstos:

- id
- game_id
- room_code
- status
- max_seats
- created_by
- created_at
- closed_at

Estados iniciales:

- waiting
- betting
- ready
- playing
- finished
- cancelled

---

## room_players

Representa a un jugador ocupando una silla dentro de una sala.

Campos previstos:

- id
- room_id
- nickname
- seat_number
- session_token
- connection_status
- joined_at
- left_at

Reglas:

- Una silla no puede ser ocupada por dos jugadores.
- Un jugador temporal se identifica mediante un token privado.
- Una sala admite como máximo 5 sillas.

---

## wallets

Saldo virtual temporal de cada jugador dentro de una sala o sesión.

Campos previstos:

- id
- room_player_id
- available_balance
- locked_balance
- created_at
- updated_at

Reglas:

- available_balance nunca puede ser negativo.
- locked_balance representa fichas comprometidas en apuestas.
- El saldo no se modifica directamente desde React.

---

## wallet_transactions

Libro contable de todos los movimientos.

Campos previstos:

- id
- wallet_id
- type
- amount
- balance_before
- balance_after
- reference_type
- reference_id
- created_by
- description
- created_at

Tipos previstos:

- admin_credit
- admin_debit
- bet_lock
- bet_release
- bet_loss
- prize
- commission
- refund
- adjustment

Regla:

Las transacciones no se eliminan.

---

## game_sessions

Representa una sesión completa de juego dentro de una sala.

Campos previstos:

- id
- room_id
- game_id
- status
- started_at
- finished_at

---

## rounds

Representa una ronda individual.

Campos previstos:

- id
- game_session_id
- round_number
- status
- active_player_id
- winner_side
- game_state
- started_at
- finished_at

El campo game_state almacenará información específica del juego.

Ejemplo para Pase:

- punto
- tirador
- fase actual

Ejemplo para Maka'i:

- banquero
- turno de decisiones
- cartas repartidas

---

## bets

Representa una apuesta realizada por un jugador.

Campos previstos:

- id
- round_id
- room_player_id
- side
- requested_amount
- matched_amount
- status
- created_at
- settled_at

Estados:

- pending
- matched
- locked
- won
- lost
- refunded
- cancelled

---

## game_events

Registro cronológico de todo lo ocurrido en la partida.

Campos previstos:

- id
- game_session_id
- round_id
- room_player_id
- event_type
- event_data
- created_at

Ejemplos:

- player_joined
- seat_selected
- bet_created
- bets_matched
- dice_rolled
- point_established
- card_dealt
- player_requested_card
- round_finished

---

## commissions

Registra las comisiones de la plataforma.

Campos previstos:

- id
- round_id
- percentage
- gross_winnings
- commission_amount
- charged_to_side
- created_at

---

## chat_messages

Mensajes escritos dentro de una sala.

Campos previstos:

- id
- room_id
- room_player_id
- message
- message_type
- created_at

Tipos:

- player
- system
- admin

---

# SUPABASE V1 - MVP PUBLICADO

Archivo listo para ejecutar:

- `docs/supabase_schema_v1.sql`

## Tablas creadas

- `play_tables`: mesas creadas desde el panel.
- `table_invites`: invitaciones y links para jugadores.
- `table_players`: jugadores que entran a una mesa.
- `wallets`: saldo de fichas por jugador.
- `chip_requests`: solicitudes de carga de fichas.
- `wallet_transactions`: movimientos contables de cada saldo.
- `table_events`: eventos de mesa para historial y sincronizacion.
- `game_snapshots`: estado vivo de la mesa.

## Como crear las tablas

1. Entrar a Supabase.
2. Abrir el proyecto de PlayPlatform.
3. Ir a `SQL Editor`.
4. Crear una consulta nueva.
5. Copiar todo el contenido de `docs/supabase_schema_v1.sql`.
6. Ejecutar con `Run`.

## Politicas de seguridad

La version V1 incluye politicas publicas temporales para poder probar rapido desde Vercel usando la anon key.

Esto sirve para pruebas iniciales, pero no es seguridad final.

Antes de manejar usuarios reales o dinero real hay que reemplazar estas politicas por autenticacion de administrador y permisos por jugador.
