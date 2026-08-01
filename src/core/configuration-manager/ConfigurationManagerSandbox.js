import ConfigurationManager from "./ConfigurationManager";
import ConfigurationManagerEvents from "./ConfigurationManagerEvents";

class ConfigurationManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== CONFIGURATION MANAGER SANDBOX =====");

    const configurationManager =
      new ConfigurationManager();

    console.log("1. Crear una instancia de ConfigurationManager:");
    console.log(configurationManager.toJSON());

    const gameMaxPlayers =
      configurationManager.set(
        "game.maxPlayers",
        10,
        "game",
        "Cantidad maxima de jugadores.",
        {
          required: true,
        }
      );

    const gameMinPlayers =
      configurationManager.set(
        "game.minPlayers",
        2,
        "game",
        "Cantidad minima de jugadores."
      );

    const gameDefaultBet =
      configurationManager.set(
        "game.defaultBet",
        100,
        "game",
        "Apuesta por defecto."
      );

    const uiTheme =
      configurationManager.set(
        "ui.theme",
        "dark",
        "ui",
        "Tema visual."
      );

    const uiLanguage =
      configurationManager.set(
        "ui.language",
        "es",
        "ui",
        "Idioma de la interfaz."
      );

    const walletDefaultBalance =
      configurationManager.set(
        "wallet.defaultBalance",
        0,
        "wallet",
        "Saldo inicial de wallet."
      );

    const schedulerTickRate =
      configurationManager.set(
        "scheduler.tickRate",
        60,
        "scheduler",
        "Frecuencia de ticks."
      );

    console.log("2. Registrar las configuraciones:");
    console.log([
      gameMaxPlayers,
      gameMinPlayers,
      gameDefaultBet,
      uiTheme,
      uiLanguage,
      walletDefaultBalance,
      schedulerTickRate,
    ]);

    this.assert(
      configurationManager.has("game.maxPlayers") === true,
      "game.maxPlayers debe existir."
    );
    this.assert(
      configurationManager.get("game.maxPlayers") === 10,
      "game.maxPlayers debe ser 10."
    );

    console.log("3. Verificar has() y get():");
    console.log({
      hasGameMaxPlayers: configurationManager.has("game.maxPlayers"),
      gameMaxPlayers: configurationManager.get("game.maxPlayers"),
    });

    const keys =
      configurationManager.getKeys();

    const values =
      configurationManager.getValues();

    const entries =
      configurationManager.getEntries();

    const configurations =
      configurationManager.getConfigurations();

    console.log("4. Obtener keys, values, entries y configurations:");
    console.log({
      keys,
      values,
      entries,
      configurations,
    });

    const gameConfigurations =
      configurationManager.getConfigurationsByCategory("game");

    const uiConfigurations =
      configurationManager.getConfigurationsByCategory("ui");

    const walletConfigurations =
      configurationManager.getConfigurationsByCategory("wallet");

    const schedulerConfigurations =
      configurationManager.getConfigurationsByCategory("scheduler");

    this.assert(
      gameConfigurations.length === 3,
      "Deben existir tres configuraciones game."
    );
    this.assert(
      uiConfigurations.length === 2,
      "Deben existir dos configuraciones ui."
    );

    console.log("5. Obtener configuraciones por categoria:");
    console.log({
      gameConfigurations,
      uiConfigurations,
      walletConfigurations,
      schedulerConfigurations,
    });

    const updatedDefaultBet =
      configurationManager.update(
        "game.defaultBet",
        250
      );

    const updatedUiTheme =
      configurationManager.update(
        "ui.theme",
        "light"
      );

    console.log("6. Actualizar game.defaultBet y ui.theme:");
    console.log({
      updatedDefaultBet,
      updatedUiTheme,
    });

    const updatedWalletMetadata =
      configurationManager.updateMetadata(
        "wallet.defaultBalance",
        {
          editable: false,
        }
      );

    const updatedSchedulerMetadata =
      configurationManager.updateMetadata(
        "scheduler.tickRate",
        {
          unit: "fps",
        }
      );

    console.log("7. Actualizar metadata:");
    console.log({
      updatedWalletMetadata,
      updatedSchedulerMetadata,
    });

    const updatedGameMaxDescription =
      configurationManager.setDescription(
        "game.maxPlayers",
        "Maximo de jugadores permitidos."
      );

    const updatedUiLanguageDescription =
      configurationManager.setDescription(
        "ui.language",
        "Idioma activo de la interfaz."
      );

    console.log("8. Actualizar description:");
    console.log({
      updatedGameMaxDescription,
      updatedUiLanguageDescription,
    });

    this.assert(
      configurationManager.getDescription("game.maxPlayers") ===
        "Maximo de jugadores permitidos.",
      "La descripcion de game.maxPlayers debe actualizarse."
    );
    this.assert(
      configurationManager.getCategory("ui.language") === "ui",
      "ui.language debe pertenecer a ui."
    );
    this.assert(
      configurationManager.get("game.defaultBet") === 250,
      "game.defaultBet debe ser 250."
    );

    console.log("9. Verificar getDescription(), getCategory() y get():");
    console.log({
      description: configurationManager.getDescription("game.maxPlayers"),
      category: configurationManager.getCategory("ui.language"),
      defaultBet: configurationManager.get("game.defaultBet"),
    });

    const count =
      configurationManager.count();

    this.assert(
      count === 7,
      "Deben existir siete configuraciones."
    );

    console.log("10. Verificar count():");
    console.log(count);

    const configurationManagerJSON =
      configurationManager.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(configurationManagerJSON);

    const events = [
      ConfigurationManagerEvents.createConfigurationCreatedEvent(gameMaxPlayers),
      ConfigurationManagerEvents.createConfigurationUpdatedEvent(updatedDefaultBet),
      ConfigurationManagerEvents.createConfigurationRemovedEvent("ui.theme"),
      ConfigurationManagerEvents.createConfigurationMetadataUpdatedEvent(
        "wallet.defaultBalance",
        {
          editable: false,
        }
      ),
      ConfigurationManagerEvents.createConfigurationDescriptionUpdatedEvent(
        "game.maxPlayers",
        "Maximo de jugadores permitidos."
      ),
      ConfigurationManagerEvents.createConfigurationManagerClearedEvent(),
    ];

    console.log("12. Crear eventos utilizando ConfigurationManagerEvents:");
    console.log(events);

    const removedConfiguration =
      configurationManager.remove("ui.theme");

    this.assert(
      removedConfiguration.key === "ui.theme",
      "ui.theme debe eliminarse correctamente."
    );

    console.log("13. Eliminar ui.theme:");
    console.log(removedConfiguration);

    const countAfterRemove =
      configurationManager.count();

    this.assert(
      countAfterRemove === 6,
      "Deben quedar seis configuraciones."
    );

    console.log("14. Verificar nuevamente count():");
    console.log(countAfterRemove);

    configurationManager.clear();

    console.log("15. Ejecutar clear():");
    console.log(configurationManager.toJSON());

    this.assert(
      configurationManager.count() === 0,
      "ConfigurationManager debe quedar sin configuraciones."
    );

    console.log("16. Verificar que count() sea 0:");
    console.log(configurationManager.count());

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      keys,
      values,
      entries,
      configurations,
      gameConfigurations,
      uiConfigurations,
      walletConfigurations,
      schedulerConfigurations,
      count,
      configurationManagerJSON,
      events,
      removedConfiguration,
      countAfterRemove,
      finalCount: configurationManager.count(),
    });

    console.log("===== CONFIGURATION MANAGER SANDBOX OK =====");
  }
}

new ConfigurationManagerSandbox();

export default ConfigurationManagerSandbox;
