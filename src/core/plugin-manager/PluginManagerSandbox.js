import PluginManager from "./PluginManager";
import PluginManagerEvents from "./PluginManagerEvents";

class PluginManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== PLUGIN MANAGER SANDBOX =====");

    const pluginManager =
      new PluginManager();

    console.log("1. Crear una instancia de PluginManager:");
    console.log(pluginManager.toJSON());

    const physicsPlugin =
      pluginManager.registerPlugin(
        "physics-plugin",
        "Physics Plugin",
        "1.0.0",
        {
          module: "physics",
        },
        {
          category: "engine",
        }
      );

    const audioPlugin =
      pluginManager.registerPlugin(
        "audio-plugin",
        "Audio Plugin",
        "1.0.0",
        {
          module: "audio",
        },
        {
          category: "media",
        }
      );

    const uiPlugin =
      pluginManager.registerPlugin(
        "ui-plugin",
        "UI Plugin",
        "1.0.0",
        {
          module: "ui",
        },
        {
          category: "interface",
        }
      );

    const replayPlugin =
      pluginManager.registerPlugin(
        "replay-plugin",
        "Replay Plugin",
        "1.0.0",
        {
          module: "replay",
        },
        {
          category: "recording",
        }
      );

    const statisticsPlugin =
      pluginManager.registerPlugin(
        "statistics-plugin",
        "Statistics Plugin",
        "1.0.0",
        {
          module: "statistics",
        },
        {
          category: "analytics",
        }
      );

    console.log("2. Registrar cinco plugins:");
    console.log([
      physicsPlugin,
      audioPlugin,
      uiPlugin,
      replayPlugin,
      statisticsPlugin,
    ]);

    this.assert(
      pluginManager.hasPlugin("physics-plugin") === true,
      "physics-plugin debe existir."
    );
    this.assert(
      pluginManager.getPlugin("physics-plugin").id === "physics-plugin",
      "Debe obtenerse physics-plugin."
    );
    this.assert(
      pluginManager.getPluginInstance("physics-plugin").module === "physics",
      "Debe obtenerse la instancia de physics-plugin."
    );

    console.log("3. Verificar hasPlugin(), getPlugin() y getPluginInstance():");
    console.log({
      hasPhysicsPlugin: pluginManager.hasPlugin("physics-plugin"),
      physicsPlugin: pluginManager.getPlugin("physics-plugin"),
      physicsPluginInstance: pluginManager.getPluginInstance("physics-plugin"),
    });

    this.assert(
      pluginManager.isEnabled("physics-plugin") === true,
      "physics-plugin debe iniciar enabled."
    );

    console.log("4. Verificar isEnabled():");
    console.log(pluginManager.isEnabled("physics-plugin"));

    pluginManager.disablePlugin("audio-plugin");
    pluginManager.disablePlugin("replay-plugin");

    console.log("5. Deshabilitar audio-plugin y replay-plugin:");
    console.log({
      audioPlugin: pluginManager.getPlugin("audio-plugin"),
      replayPlugin: pluginManager.getPlugin("replay-plugin"),
    });

    const enabledPlugins =
      pluginManager.getEnabledPlugins();

    const disabledPlugins =
      pluginManager.getDisabledPlugins();

    this.assert(
      enabledPlugins.length === 3,
      "Deben existir tres plugins habilitados."
    );
    this.assert(
      disabledPlugins.length === 2,
      "Deben existir dos plugins deshabilitados."
    );

    console.log("6. Verificar getEnabledPlugins() y getDisabledPlugins():");
    console.log({
      enabledPlugins,
      disabledPlugins,
    });

    const toggledAudioPlugin =
      pluginManager.togglePlugin("audio-plugin");

    this.assert(
      toggledAudioPlugin.enabled === true,
      "audio-plugin debe quedar habilitado."
    );

    console.log("7. Ejecutar togglePlugin(audio-plugin):");
    console.log(toggledAudioPlugin);

    const updatedPhysicsPlugin =
      pluginManager.updateMetadata(
        "physics-plugin",
        {
          optimized: true,
        }
      );

    const updatedUiPlugin =
      pluginManager.updateMetadata(
        "ui-plugin",
        {
          theme: "core",
        }
      );

    console.log("8. Actualizar metadata de physics-plugin y ui-plugin:");
    console.log({
      updatedPhysicsPlugin,
      updatedUiPlugin,
    });

    console.log("9. Verificar nuevamente getPlugin():");
    console.log({
      physicsPlugin: pluginManager.getPlugin("physics-plugin"),
      uiPlugin: pluginManager.getPlugin("ui-plugin"),
    });

    const plugins =
      pluginManager.getPlugins();

    console.log("10. Obtener getPlugins():");
    console.log(plugins);

    const count =
      pluginManager.count();

    this.assert(
      count === 5,
      "Deben existir cinco plugins."
    );

    console.log("11. Verificar count():");
    console.log(count);

    const pluginManagerJSON =
      pluginManager.toJSON();

    console.log("12. Serializar utilizando toJSON():");
    console.log(pluginManagerJSON);

    const events = [
      PluginManagerEvents.createPluginRegisteredEvent(physicsPlugin),
      PluginManagerEvents.createPluginUnregisteredEvent("statistics-plugin"),
      PluginManagerEvents.createPluginEnabledEvent("audio-plugin"),
      PluginManagerEvents.createPluginDisabledEvent("replay-plugin"),
      PluginManagerEvents.createPluginMetadataUpdatedEvent(
        "physics-plugin",
        {
          optimized: true,
        }
      ),
      PluginManagerEvents.createPluginManagerClearedEvent(),
    ];

    console.log("13. Crear eventos utilizando PluginManagerEvents:");
    console.log(events);

    const removedPlugin =
      pluginManager.unregisterPlugin("statistics-plugin");

    this.assert(
      removedPlugin.id === "statistics-plugin",
      "statistics-plugin debe eliminarse correctamente."
    );

    console.log("14. Eliminar statistics-plugin:");
    console.log(removedPlugin);

    const countAfterRemove =
      pluginManager.count();

    this.assert(
      countAfterRemove === 4,
      "Deben quedar cuatro plugins."
    );

    console.log("15. Verificar nuevamente count():");
    console.log(countAfterRemove);

    pluginManager.clear();

    console.log("16. Ejecutar clear():");
    console.log(pluginManager.toJSON());

    this.assert(
      pluginManager.count() === 0,
      "PluginManager debe quedar sin plugins."
    );

    console.log("17. Verificar que count() sea 0:");
    console.log(pluginManager.count());

    console.log("18. Mostrar todos los resultados por consola:");
    console.log({
      enabledPlugins,
      disabledPlugins,
      toggledAudioPlugin,
      updatedPhysicsPlugin,
      updatedUiPlugin,
      plugins,
      count,
      pluginManagerJSON,
      events,
      removedPlugin,
      countAfterRemove,
      finalCount: pluginManager.count(),
    });

    console.log("===== PLUGIN MANAGER SANDBOX OK =====");
  }
}

new PluginManagerSandbox();

export default PluginManagerSandbox;
