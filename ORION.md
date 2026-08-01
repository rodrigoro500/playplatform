# PlayPlatform

## Filosofía

- PlayPlatform es un motor de juegos modular.
- Toda la lógica vive en el Engine.
- La UI nunca contiene reglas de negocio.
- Cada juego es independiente.
- Todo componente debe ser reutilizable.
- Cada cambio debe mantener compatibilidad con el resto del sistema.
- El código debe priorizar claridad antes que complejidad.
- Cada Sprint debe dejar el proyecto funcional.
- Nunca romper funcionalidades existentes.
- Toda nueva funcionalidad debe poder probarse desde Sandbox.

## Arquitectura

PlayPlatform

Core
- BaseGameEngine
- EventManager
- Wallet
- Transactions
- Validators

Games
- Pase
- (futuros juegos)

Cada juego contiene:

- Engine
- Table
- Round
- Managers
- Entities
- Validators
- Resolvers
- Events
- Sandbox

Reglas:

- El Engine coordina todo.
- Los Managers administran módulos específicos.
- Las Entities contienen estado.
- Los Validators validan reglas.
- Los Resolvers resuelven lógica.
- La UI nunca contiene lógica del juego.
- Los Sandboxes son obligatorios para probar cada Sprint.

## Convenciones de código

- Una clase por archivo.
- Un archivo por responsabilidad.
- Métodos cortos y con una única responsabilidad.
- No duplicar lógica.
- Priorizar composición sobre herencia.
- Evitar código muerto.
- Validar siempre los parámetros de entrada.
- Lanzar errores descriptivos.
- Mantener consistencia en nombres y formato.
- No escribir lógica de negocio en la interfaz.
- Documentar únicamente cuando aporte valor.
- Mantener compatibilidad con la arquitectura existente.

## Convenciones de nombres

Clases:
- PascalCase
- Ejemplo: PaseEngine

Métodos:
- camelCase
- Ejemplo: resolveRound()

Variables:
- camelCase

Constantes:
- UPPER_SNAKE_CASE

Archivos:
- PascalCase para clases.
- Un archivo por clase.

Carpetas:
- camelCase.

Eventos:
- Nombre descriptivo terminado en Event cuando corresponda.

Interfaces futuras:
- Prefijo I.

No utilizar abreviaturas innecesarias.

Los nombres deben describir claramente su responsabilidad.

## Organización de carpetas

src/

core/
- engine/
- wallet/
- events/
- transactions/
- validators/
- utils/

games/
- pase/
  - engine/
  - managers/
  - entities/
  - validators/
  - resolvers/
  - events/
  - sandbox/

ui/

shared/

docs/

Reglas:

- Cada juego vive dentro de games.
- Ningún juego depende de otro.
- El código compartido pertenece a core o shared.
- Los Sandboxes pertenecen a cada juego.
- No colocar lógica de negocio dentro de ui.

## Reglas para Engines

- El Engine es el punto central del juego.
- Coordina Managers, Entities, Validators y Resolvers.
- Nunca contiene lógica de interfaz.
- No accede directamente a componentes UI.
- Expone únicamente métodos públicos necesarios.
- Mantiene el estado global del juego.
- Toda acción importante genera eventos.
- Toda modificación del estado debe ser consistente.
- Debe ser completamente testeable desde Sandbox.
- Debe mantener compatibilidad con versiones anteriores cuando sea posible.

## Reglas para Managers

- Cada Manager tiene una única responsabilidad.
- No contiene lógica de interfaz.
- No depende de otros Managers salvo por el Engine.
- El Engine coordina todas las llamadas.
- No modifica directamente entidades que no administra.
- Debe ser reutilizable.
- Debe validar su estado antes de ejecutar acciones.
- Debe lanzar errores claros cuando corresponda.
- Debe poder probarse de forma independiente.
- Debe mantener un acoplamiento mínimo con el resto del sistema.

## Reglas para Entities

- Una Entity representa únicamente estado.
- No contiene lógica de negocio compleja.
- No conoce la interfaz.
- No depende de Managers.
- Puede contener validaciones simples de integridad.
- Debe ser fácilmente serializable.
- Debe poder restaurarse desde JSON cuando corresponda.
- Debe mantener consistencia interna.
- No debe generar efectos secundarios.
- Debe ser reutilizable por cualquier Engine.

## Reglas para Validators

- Toda validación debe estar centralizada.
- Un Validator nunca modifica el estado.
- Solo devuelve éxito o lanza un error descriptivo.
- Debe ser determinístico.
- No depende de la interfaz.
- No depende de la persistencia.
- Puede reutilizarse entre juegos cuando corresponda.
- Debe validar parámetros antes de ejecutar lógica.
- Debe ser fácilmente testeable.
- Debe mantener una única responsabilidad.

## Reglas para Resolvers

- Un Resolver contiene lógica de resolución.
- Nunca administra estado permanente.
- Recibe datos ya validados.
- Devuelve resultados determinísticos.
- No depende de la interfaz.
- No modifica directamente Managers.
- No realiza persistencia.
- Puede reutilizarse por otros juegos cuando corresponda.
- Debe tener una única responsabilidad.
- Debe ser completamente testeable desde Sandbox.

## Reglas para Eventos

- Todo evento representa un hecho ocurrido.
- Los eventos son inmutables.
- Deben tener nombres descriptivos.
- Deben incluir únicamente la información necesaria.
- No contienen lógica de negocio.
- Pueden ser utilizados por cualquier módulo.
- Deben facilitar el desacoplamiento entre componentes.
- Deben ser serializables cuando corresponda.
- El Engine es responsable de emitir los eventos.
- Deben poder utilizarse para auditoría y depuración.

## Reglas para Wallet

- El Wallet administra el saldo de cada jugador.
- Todo movimiento genera una transacción.
- Nunca permite saldos negativos.
- Todas las operaciones deben validarse previamente.
- El Engine solicita las operaciones; el Wallet las ejecuta.
- Toda transacción debe quedar registrada.
- El Wallet no contiene lógica específica de ningún juego.
- Debe ser reutilizable para cualquier juego de PlayPlatform.
- Debe ser completamente testeable desde Sandbox.
- Debe garantizar la integridad de los saldos en todo momento.

## Reglas para nuevos juegos

- Todo nuevo juego debe ser independiente.
- Debe implementar su propio Engine.
- Debe tener su propio Sandbox.
- Debe reutilizar Core siempre que sea posible.
- No debe modificar la lógica de otros juegos.
- Debe organizarse siguiendo la estructura oficial de PlayPlatform.
- Debe incluir Managers, Entities, Validators, Resolvers y Events cuando sean necesarios.
- Debe ser compatible con Wallet y EventManager.
- Debe poder evolucionar sin afectar otros juegos.
- Todo nuevo juego debe ser documentado antes de su implementación.

## Reglas para documentación

- Todo módulo importante debe estar documentado.
- La documentación debe reflejar el comportamiento real del código.
- Actualizar la documentación en cada Sprint que modifique la arquitectura.
- Utilizar Markdown como formato oficial.
- Mantener ejemplos cuando aporten valor.
- Evitar documentación redundante.
- Toda clase pública debe describir su responsabilidad.
- Toda arquitectura nueva debe documentarse antes de implementarse.
- Mantener un historial de decisiones importantes.
- La documentación forma parte del proyecto y debe mantenerse actualizada.

## Flujo de desarrollo

1. Diseñar la arquitectura.
2. Definir el Sprint.
3. Actualizar la documentación.
4. Implementar la funcionalidad.
5. Ejecutar Sandbox.
6. Validar resultados.
7. Corregir errores.
8. Aprobar Sprint.
9. Integrar al proyecto principal.

Reglas:

- Nunca implementar sin diseño previo.
- Nunca omitir las pruebas del Sandbox.
- Todo Sprint debe dejar el proyecto estable.
- No romper compatibilidad con módulos existentes.
- Toda modificación importante debe reflejarse en la documentación.

## Flujo de Sprints

1. Analizar el requerimiento.
2. Diseñar la solución.
3. Dividir el trabajo en pasos pequeños.
4. Implementar un paso por vez.
5. Validar cada paso desde Sandbox.
6. Corregir errores antes de continuar.
7. Actualizar la documentación.
8. Finalizar el Sprint únicamente cuando todas las validaciones sean correctas.

Reglas:

- No avanzar al siguiente Sprint con errores pendientes.
- Cada Sprint debe ser independiente.
- Mantener compatibilidad con la arquitectura existente.
- Mantener el historial de cambios.
- Todo Sprint debe poder revertirse si fuera necesario.
- El proyecto debe permanecer funcional después de cada Sprint.
