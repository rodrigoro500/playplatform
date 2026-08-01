import EngineRegistry from "./EngineRegistry";
import EngineRegistryEvents from "./EngineRegistryEvents";

class EngineRegistrySandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE REGISTRY SANDBOX =====");

    const engineRegistry =
      new EngineRegistry();

    console.log("1. Crear una instancia de EngineRegistry:");
    console.log(engineRegistry.toJSON());

    const walletManager =
      engineRegistry.registerModule(
        "WalletManager",
        {},
        "wallet",
        "1.0.0",
        {
          core: true,
        }
      );

    const eventBus =
      engineRegistry.registerModule(
        "EventBus",
        {},
        "events",
        "1.0.0"
      );

    const scheduler =
      engineRegistry.registerModule(
        "Scheduler",
        {},
        "time",
        "1.0.0"
      );

    const pluginManager =
      engineRegistry.registerModule(
        "PluginManager",
        {},
        "plugins",
        "1.0.0"
      );

    const serviceManager =
      engineRegistry.registerModule(
        "ServiceManager",
        {},
        "services",
        "1.0.0"
      );

    const configurationManager =
      engineRegistry.registerModule(
        "ConfigurationManager",
        {},
        "configuration",
        "1.0.0",
        {
          editable: true,
        }
      );

    const lifecycleManager =
      engineRegistry.registerModule(
        "LifecycleManager",
        {},
        "lifecycle",
        "1.0.0"
      );

    console.log("2. Registrar los modulos:");
    console.log([
      walletManager,
      eventBus,
      scheduler,
      pluginManager,
      serviceManager,
      configurationManager,
      lifecycleManager,
    ]);

    this.assert(
      engineRegistry.hasModule("WalletManager") === true,
      "WalletManager debe existir."
    );
    this.assert(
      engineRegistry.getModule("WalletManager").id === "WalletManager",
      "Debe obtenerse WalletManager."
    );
    this.assert(
      typeof engineRegistry.getModuleInstance("WalletManager") === "object",
      "Debe obtenerse la instancia de WalletManager."
    );

    console.log("3. Verificar hasModule(), getModule() y getModuleInstance():");
    console.log({
      hasWalletManager: engineRegistry.hasModule("WalletManager"),
      walletManager: engineRegistry.getModule("WalletManager"),
      walletManagerInstance: engineRegistry.getModuleInstance("WalletManager"),
    });

    const modules =
      engineRegistry.getModules();

    const walletModules =
      engineRegistry.getModulesByCategory("wallet");

    const pluginModules =
      engineRegistry.getModulesByCategory("plugins");

    console.log("4. Obtener getModules() y getModulesByCategory():");
    console.log({
      modules,
      walletModules,
      pluginModules,
    });

    engineRegistry.disableModule("PluginManager");
    engineRegistry.disableModule("Scheduler");

    console.log("5. Deshabilitar PluginManager y Scheduler:");
    console.log({
      pluginManager: engineRegistry.getModule("PluginManager"),
      scheduler: engineRegistry.getModule("Scheduler"),
    });

    this.assert(
      engineRegistry.isEnabled("PluginManager") === false,
      "PluginManager debe quedar deshabilitado."
    );

    const enabledModules =
      engineRegistry.getEnabledModules();

    const disabledModules =
      engineRegistry.getDisabledModules();

    this.assert(
      enabledModules.length === 5,
      "Deben existir cinco modulos habilitados."
    );
    this.assert(
      disabledModules.length === 2,
      "Deben existir dos modulos deshabilitados."
    );

    console.log("6. Verificar isEnabled(), getEnabledModules() y getDisabledModules():");
    console.log({
      pluginManagerEnabled: engineRegistry.isEnabled("PluginManager"),
      enabledModules,
      disabledModules,
    });

    const toggledScheduler =
      engineRegistry.toggleModule("Scheduler");

    this.assert(
      toggledScheduler.enabled === true,
      "Scheduler debe quedar habilitado."
    );

    console.log("7. Alternar Scheduler:");
    console.log(toggledScheduler);

    const updatedWalletManager =
      engineRegistry.updateMetadata(
        "WalletManager",
        {
          transactions: true,
        }
      );

    const updatedConfigurationManager =
      engineRegistry.updateMetadata(
        "ConfigurationManager",
        {
          hotReload: false,
        }
      );

    console.log("8. Actualizar metadata de WalletManager y ConfigurationManager:");
    console.log({
      updatedWalletManager,
      updatedConfigurationManager,
    });

    console.log("9. Verificar nuevamente getModule():");
    console.log({
      walletManager: engineRegistry.getModule("WalletManager"),
      configurationManager:
        engineRegistry.getModule("ConfigurationManager"),
    });

    const count =
      engineRegistry.count();

    this.assert(
      count === 7,
      "Deben existir siete modulos."
    );

    console.log("10. Obtener count():");
    console.log(count);

    const engineRegistryJSON =
      engineRegistry.toJSON();

    console.log("11. Serializar utilizando toJSON():");
    console.log(engineRegistryJSON);

    const events = [
      EngineRegistryEvents.createModuleRegisteredEvent(walletManager),
      EngineRegistryEvents.createModuleUnregisteredEvent("ServiceManager"),
      EngineRegistryEvents.createModuleEnabledEvent("Scheduler"),
      EngineRegistryEvents.createModuleDisabledEvent("PluginManager"),
      EngineRegistryEvents.createModuleToggledEvent(
        "Scheduler",
        true
      ),
      EngineRegistryEvents.createModuleMetadataUpdatedEvent(
        "WalletManager",
        {
          transactions: true,
        }
      ),
      EngineRegistryEvents.createEngineRegistryClearedEvent(),
    ];

    console.log("12. Crear eventos utilizando EngineRegistryEvents:");
    console.log(events);

    const removedModule =
      engineRegistry.unregisterModule("ServiceManager");

    this.assert(
      removedModule.id === "ServiceManager",
      "ServiceManager debe eliminarse correctamente."
    );

    console.log("13. Eliminar ServiceManager:");
    console.log(removedModule);

    const countAfterRemove =
      engineRegistry.count();

    this.assert(
      countAfterRemove === 6,
      "Deben quedar seis modulos."
    );

    console.log("14. Verificar count():");
    console.log(countAfterRemove);

    engineRegistry.clear();

    console.log("15. Ejecutar clear():");
    console.log(engineRegistry.toJSON());

    this.assert(
      engineRegistry.count() === 0,
      "EngineRegistry debe quedar sin modulos."
    );

    console.log("16. Verificar que count() sea 0:");
    console.log(engineRegistry.count());

    console.log("17. Mostrar todos los resultados por consola:");
    console.log({
      modules,
      walletModules,
      pluginModules,
      enabledModules,
      disabledModules,
      toggledScheduler,
      updatedWalletManager,
      updatedConfigurationManager,
      count,
      engineRegistryJSON,
      events,
      removedModule,
      countAfterRemove,
      finalCount: engineRegistry.count(),
    });

    console.log("===== ENGINE REGISTRY SANDBOX OK =====");
  }
}

new EngineRegistrySandbox();

export default EngineRegistrySandbox;
