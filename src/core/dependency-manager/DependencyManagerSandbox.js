import DependencyManager from "./DependencyManager";
import DependencyManagerEvents from "./DependencyManagerEvents";

class DependencyManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== DEPENDENCY MANAGER SANDBOX =====");

    const dependencyManager =
      new DependencyManager();

    console.log("1. Crear una instancia de DependencyManager:");
    console.log(dependencyManager.toJSON());

    const gameWalletDependency =
      dependencyManager.addDependency(
        "game-wallet",
        "game",
        "wallet",
        "REQUIRED",
        {
          reason: "payments",
        }
      );

    const gameEventBusDependency =
      dependencyManager.addDependency(
        "game-eventbus",
        "game",
        "eventbus",
        "REQUIRED",
        {
          reason: "events",
        }
      );

    const gameSchedulerDependency =
      dependencyManager.addDependency(
        "game-scheduler",
        "game",
        "scheduler",
        "OPTIONAL",
        {
          reason: "timed tasks",
        }
      );

    const paseDiceDependency =
      dependencyManager.addDependency(
        "pase-engine-dice-engine",
        "pase-engine",
        "dice-engine",
        "REQUIRED",
        {
          reason: "dice resolution",
        }
      );

    const paseBetDependency =
      dependencyManager.addDependency(
        "pase-engine-bet-manager",
        "pase-engine",
        "bet-manager",
        "REQUIRED",
        {
          reason: "bet handling",
        }
      );

    console.log("2. Agregar las dependencias:");
    console.log([
      gameWalletDependency,
      gameEventBusDependency,
      gameSchedulerDependency,
      paseDiceDependency,
      paseBetDependency,
    ]);

    this.assert(
      dependencyManager.hasDependency("game-wallet") === true,
      "game-wallet debe existir."
    );
    this.assert(
      dependencyManager.getDependency("game-wallet").target === "wallet",
      "Debe obtenerse la dependencia game -> wallet."
    );

    console.log("3. Verificar hasDependency() y getDependency():");
    console.log({
      hasGameWallet: dependencyManager.hasDependency("game-wallet"),
      gameWalletDependency: dependencyManager.getDependency("game-wallet"),
    });

    const dependencies =
      dependencyManager.getDependencies();

    console.log("4. Obtener getDependencies():");
    console.log(dependencies);

    const gameDependencies =
      dependencyManager.getDependenciesBySource("game");

    const paseEngineDependencies =
      dependencyManager.getDependenciesBySource("pase-engine");

    this.assert(
      gameDependencies.length === 3,
      "game debe tener tres dependencias."
    );
    this.assert(
      paseEngineDependencies.length === 2,
      "pase-engine debe tener dos dependencias."
    );

    console.log("5. Obtener por source:");
    console.log({
      gameDependencies,
      paseEngineDependencies,
    });

    const walletDependencies =
      dependencyManager.getDependenciesByTarget("wallet");

    const schedulerDependencies =
      dependencyManager.getDependenciesByTarget("scheduler");

    this.assert(
      walletDependencies.length === 1,
      "wallet debe tener una dependencia."
    );
    this.assert(
      schedulerDependencies.length === 1,
      "scheduler debe tener una dependencia."
    );

    console.log("6. Obtener por target:");
    console.log({
      walletDependencies,
      schedulerDependencies,
    });

    const requiredDependencies =
      dependencyManager.getDependenciesByType("REQUIRED");

    const optionalDependencies =
      dependencyManager.getDependenciesByType("OPTIONAL");

    this.assert(
      requiredDependencies.length === 4,
      "Deben existir cuatro dependencias REQUIRED."
    );
    this.assert(
      optionalDependencies.length === 1,
      "Debe existir una dependencia OPTIONAL."
    );

    console.log("7. Obtener por tipo:");
    console.log({
      requiredDependencies,
      optionalDependencies,
    });

    const activeDependencies =
      dependencyManager.getDependenciesByStatus("ACTIVE");

    const inactiveDependencies =
      dependencyManager.getDependenciesByStatus("INACTIVE");

    this.assert(
      activeDependencies.length === 5,
      "Deben existir cinco dependencias ACTIVE."
    );
    this.assert(
      inactiveDependencies.length === 0,
      "No deben existir dependencias INACTIVE inicialmente."
    );

    console.log("8. Obtener por estado:");
    console.log({
      activeDependencies,
      inactiveDependencies,
    });

    const deactivatedGameScheduler =
      dependencyManager.deactivateDependency("game-scheduler");

    this.assert(
      deactivatedGameScheduler.status === "INACTIVE",
      "game-scheduler debe quedar INACTIVE."
    );

    console.log("9. Desactivar game -> scheduler:");
    console.log(deactivatedGameScheduler);

    const activatedGameScheduler =
      dependencyManager.activateDependency("game-scheduler");

    this.assert(
      activatedGameScheduler.status === "ACTIVE",
      "game-scheduler debe quedar ACTIVE."
    );

    console.log("10. Activar nuevamente game -> scheduler:");
    console.log(activatedGameScheduler);

    const updatedPaseDiceDependency =
      dependencyManager.updateMetadata(
        "pase-engine-dice-engine",
        {
          verified: true,
        }
      );

    const updatedGameWalletDependency =
      dependencyManager.updateMetadata(
        "game-wallet",
        {
          priority: "high",
        }
      );

    console.log("11. Actualizar metadata:");
    console.log({
      updatedPaseDiceDependency,
      updatedGameWalletDependency,
    });

    console.log("12. Verificar nuevamente getDependency():");
    console.log({
      paseDiceDependency:
        dependencyManager.getDependency("pase-engine-dice-engine"),
      gameWalletDependency:
        dependencyManager.getDependency("game-wallet"),
    });

    const count =
      dependencyManager.count();

    this.assert(
      count === 5,
      "Deben existir cinco dependencias."
    );

    console.log("13. Verificar count():");
    console.log(count);

    const dependencyManagerJSON =
      dependencyManager.toJSON();

    console.log("14. Serializar utilizando toJSON():");
    console.log(dependencyManagerJSON);

    const events = [
      DependencyManagerEvents.createDependencyAddedEvent(gameWalletDependency),
      DependencyManagerEvents.createDependencyRemovedEvent("game-eventbus"),
      DependencyManagerEvents.createDependencyActivatedEvent("game-scheduler"),
      DependencyManagerEvents.createDependencyDeactivatedEvent("game-scheduler"),
      DependencyManagerEvents.createDependencyStatusChangedEvent(
        "game-scheduler",
        "ACTIVE"
      ),
      DependencyManagerEvents.createDependencyMetadataUpdatedEvent(
        "game-wallet",
        {
          priority: "high",
        }
      ),
      DependencyManagerEvents.createDependencyManagerClearedEvent(),
    ];

    console.log("15. Crear eventos utilizando DependencyManagerEvents:");
    console.log(events);

    const removedDependency =
      dependencyManager.removeDependency("game-eventbus");

    this.assert(
      removedDependency.id === "game-eventbus",
      "game-eventbus debe eliminarse correctamente."
    );

    console.log("16. Eliminar game -> eventbus:");
    console.log(removedDependency);

    const countAfterRemove =
      dependencyManager.count();

    this.assert(
      countAfterRemove === 4,
      "Deben quedar cuatro dependencias."
    );

    console.log("17. Verificar nuevamente count():");
    console.log(countAfterRemove);

    dependencyManager.clear();

    console.log("18. Ejecutar clear():");
    console.log(dependencyManager.toJSON());

    this.assert(
      dependencyManager.count() === 0,
      "DependencyManager debe quedar sin dependencias."
    );

    console.log("19. Verificar que count() sea 0:");
    console.log(dependencyManager.count());

    console.log("20. Mostrar todos los resultados por consola:");
    console.log({
      dependencies,
      gameDependencies,
      paseEngineDependencies,
      walletDependencies,
      schedulerDependencies,
      requiredDependencies,
      optionalDependencies,
      activeDependencies,
      inactiveDependencies,
      updatedPaseDiceDependency,
      updatedGameWalletDependency,
      count,
      dependencyManagerJSON,
      events,
      removedDependency,
      countAfterRemove,
      finalCount: dependencyManager.count(),
    });

    console.log("===== DEPENDENCY MANAGER SANDBOX OK =====");
  }
}

new DependencyManagerSandbox();

export default DependencyManagerSandbox;
