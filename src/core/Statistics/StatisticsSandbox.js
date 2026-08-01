import Statistics from "./Statistics";
import StatisticsEvents from "./StatisticsEvents";

class StatisticsSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== STATISTICS SANDBOX =====");

    const statistics =
      new Statistics();

    console.log("1. Crear una instancia de Statistics:");
    console.log(statistics.toJSON());

    const firstIncrement =
      statistics.increment("roundsPlayed");

    this.assert(
      firstIncrement === 1,
      "roundsPlayed debe iniciar en 1."
    );

    console.log("2. Incrementar una estadistica:");
    console.log(firstIncrement);

    const secondIncrement =
      statistics.increment(
        "roundsPlayed",
        2
      );

    this.assert(
      secondIncrement === 3,
      "roundsPlayed debe quedar en 3."
    );

    console.log("3. Incrementar nuevamente la misma estadistica:");
    console.log(secondIncrement);

    const decrement =
      statistics.decrement("roundsPlayed");

    this.assert(
      decrement === 2,
      "roundsPlayed debe quedar en 2."
    );

    console.log("4. Decrementar la estadistica:");
    console.log(decrement);

    const secondStatistic =
      statistics.increment(
        "wins",
        5
      );

    console.log("5. Crear una segunda estadistica:");
    console.log(secondStatistic);

    const thirdStatistic =
      statistics.set(
        "losses",
        3
      );

    console.log("6. Utilizar set() sobre una tercera estadistica:");
    console.log(thirdStatistic);

    const existingStatistic =
      statistics.get("roundsPlayed");

    this.assert(
      existingStatistic === 2,
      "roundsPlayed debe existir con valor 2."
    );

    console.log("7. Obtener una estadistica existente:");
    console.log(existingStatistic);

    const missingStatistic =
      statistics.get("draws");

    this.assert(
      missingStatistic === 0,
      "Una estadistica inexistente debe devolver 0."
    );

    console.log("8. Obtener una estadistica inexistente:");
    console.log(missingStatistic);

    this.assert(
      statistics.has("wins") === true,
      "wins debe existir."
    );

    console.log("9. Verificar has():");
    console.log({
      wins: statistics.has("wins"),
      draws: statistics.has("draws"),
    });

    const allStatistics =
      statistics.getAll();

    console.log("10. Obtener todas las estadisticas:");
    console.log(allStatistics);

    const keys =
      statistics.getKeys();

    this.assert(
      keys.length === 3,
      "Deben existir tres claves."
    );

    console.log("11. Obtener todas las claves:");
    console.log(keys);

    const statisticCount =
      statistics.count();

    this.assert(
      statisticCount === 3,
      "Deben existir tres estadisticas."
    );

    console.log("12. Contar estadisticas:");
    console.log(statisticCount);

    const resetValue =
      statistics.reset("roundsPlayed");

    this.assert(
      resetValue === 0,
      "roundsPlayed debe reiniciarse en 0."
    );

    console.log("13. Reiniciar una estadistica:");
    console.log(statistics.get("roundsPlayed"));

    const removedStatistic =
      statistics.remove("losses");

    this.assert(
      removedStatistic === true,
      "losses debe eliminarse correctamente."
    );

    console.log("14. Eliminar una estadistica:");
    console.log(removedStatistic);

    const statisticsJSON =
      statistics.toJSON();

    console.log("15. Serializar utilizando toJSON():");
    console.log(statisticsJSON);

    const events = [
      StatisticsEvents.createStatisticIncrementedEvent(
        "roundsPlayed",
        firstIncrement
      ),
      StatisticsEvents.createStatisticDecrementedEvent(
        "roundsPlayed",
        decrement
      ),
      StatisticsEvents.createStatisticSetEvent(
        "losses",
        thirdStatistic
      ),
      StatisticsEvents.createStatisticResetEvent("roundsPlayed"),
      StatisticsEvents.createStatisticRemovedEvent("losses"),
      StatisticsEvents.createStatisticsClearedEvent(),
    ];

    console.log("16. Crear eventos utilizando StatisticsEvents:");
    console.log(events);

    statistics.clear();

    console.log("17. Limpiar completamente Statistics:");
    console.log(statistics.toJSON());

    this.assert(
      statistics.count() === 0,
      "Statistics debe quedar sin estadisticas."
    );

    console.log("18. Verificar que count() sea 0:");
    console.log(statistics.count());

    console.log("19. Mostrar todos los resultados por consola:");
    console.log({
      allStatistics,
      keys,
      statisticCount,
      statisticsJSON,
      events,
      finalCount: statistics.count(),
    });

    console.log("===== STATISTICS SANDBOX OK =====");
  }
}

new StatisticsSandbox();

export default StatisticsSandbox;
