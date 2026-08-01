import LifecycleManager from "./LifecycleManager";
import LifecycleManagerEvents from "./LifecycleManagerEvents";

class LifecycleManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  createComponent(name) {
    const calls = [];

    return {
      name,
      calls,
      initialize() {
        calls.push("initialize");
      },
      start() {
        calls.push("start");
      },
      pause() {
        calls.push("pause");
      },
      resume() {
        calls.push("resume");
      },
      stop() {
        calls.push("stop");
      },
      destroy() {
        calls.push("destroy");
      },
    };
  }

  run() {
    console.log("===== LIFECYCLE MANAGER SANDBOX =====");

    const lifecycleManager =
      new LifecycleManager();

    console.log("1. Crear una instancia de LifecycleManager:");
    console.log(lifecycleManager.toJSON());

    const wallet =
      lifecycleManager.registerComponent(
        "Wallet",
        this.createComponent("Wallet"),
        {
          module: "wallet",
        }
      );

    const eventBus =
      lifecycleManager.registerComponent(
        "EventBus",
        this.createComponent("EventBus"),
        {
          module: "eventbus",
        }
      );

    const scheduler =
      lifecycleManager.registerComponent(
        "Scheduler",
        this.createComponent("Scheduler"),
        {
          module: "scheduler",
        }
      );

    const pluginManager =
      lifecycleManager.registerComponent(
        "PluginManager",
        this.createComponent("PluginManager"),
        {
          module: "plugin-manager",
        }
      );

    const resourceManager =
      lifecycleManager.registerComponent(
        "ResourceManager",
        this.createComponent("ResourceManager"),
        {
          module: "resource-manager",
        }
      );

    console.log("2. Crear y registrar cinco componentes simulados:");
    console.log([
      wallet,
      eventBus,
      scheduler,
      pluginManager,
      resourceManager,
    ]);

    this.assert(
      lifecycleManager.hasComponent("Wallet") === true,
      "Wallet debe existir."
    );
    this.assert(
      lifecycleManager.getComponent("Wallet").id === "Wallet",
      "Debe obtenerse Wallet."
    );
    this.assert(
      lifecycleManager.getComponentInstance("Wallet").name === "Wallet",
      "Debe obtenerse la instancia de Wallet."
    );

    console.log("3. Verificar hasComponent(), getComponent() y getComponentInstance():");
    console.log({
      hasWallet: lifecycleManager.hasComponent("Wallet"),
      wallet: lifecycleManager.getComponent("Wallet"),
      walletInstance: lifecycleManager.getComponentInstance("Wallet"),
    });

    lifecycleManager.getComponents().forEach(component => {
      lifecycleManager.initializeComponent(component.id);
    });

    console.log("4. Inicializar todos los componentes:");
    console.log(lifecycleManager.toJSON());

    lifecycleManager.getComponents().forEach(component => {
      lifecycleManager.startComponent(component.id);
    });

    console.log("5. Iniciar todos los componentes:");
    console.log(lifecycleManager.toJSON());

    lifecycleManager.pauseComponent("Scheduler");
    lifecycleManager.pauseComponent("PluginManager");

    console.log("6. Pausar Scheduler y PluginManager:");
    console.log({
      scheduler: lifecycleManager.getComponent("Scheduler"),
      pluginManager: lifecycleManager.getComponent("PluginManager"),
    });

    lifecycleManager.resumeComponent("Scheduler");

    console.log("7. Reanudar Scheduler:");
    console.log(lifecycleManager.getComponent("Scheduler"));

    lifecycleManager.stopComponent("EventBus");

    console.log("8. Detener EventBus:");
    console.log(lifecycleManager.getComponent("EventBus"));

    lifecycleManager.destroyComponent("ResourceManager");

    console.log("9. Destruir ResourceManager:");
    console.log(lifecycleManager.getComponent("ResourceManager"));

    const components =
      lifecycleManager.getComponents();

    console.log("10. Obtener getComponents():");
    console.log(components);

    const createdComponents =
      lifecycleManager.getComponentsByState("CREATED");

    const initializedComponents =
      lifecycleManager.getComponentsByState("INITIALIZED");

    const startedComponents =
      lifecycleManager.getComponentsByState("STARTED");

    const pausedComponents =
      lifecycleManager.getComponentsByState("PAUSED");

    const stoppedComponents =
      lifecycleManager.getComponentsByState("STOPPED");

    const destroyedComponents =
      lifecycleManager.getComponentsByState("DESTROYED");

    this.assert(
      startedComponents.length === 2,
      "Deben existir dos componentes STARTED."
    );
    this.assert(
      pausedComponents.length === 1,
      "Debe existir un componente PAUSED."
    );
    this.assert(
      stoppedComponents.length === 1,
      "Debe existir un componente STOPPED."
    );
    this.assert(
      destroyedComponents.length === 1,
      "Debe existir un componente DESTROYED."
    );

    console.log("11. Obtener por estado:");
    console.log({
      createdComponents,
      initializedComponents,
      startedComponents,
      pausedComponents,
      stoppedComponents,
      destroyedComponents,
    });

    const updatedWallet =
      lifecycleManager.updateMetadata(
        "Wallet",
        {
          balanceAware: true,
        }
      );

    const updatedScheduler =
      lifecycleManager.updateMetadata(
        "Scheduler",
        {
          timed: true,
        }
      );

    console.log("12. Actualizar metadata de Wallet y Scheduler:");
    console.log({
      updatedWallet,
      updatedScheduler,
    });

    console.log("13. Verificar nuevamente getComponent():");
    console.log({
      wallet: lifecycleManager.getComponent("Wallet"),
      scheduler: lifecycleManager.getComponent("Scheduler"),
    });

    const count =
      lifecycleManager.count();

    this.assert(
      count === 5,
      "Deben existir cinco componentes."
    );

    console.log("14. Verificar count():");
    console.log(count);

    const lifecycleManagerJSON =
      lifecycleManager.toJSON();

    console.log("15. Serializar utilizando toJSON():");
    console.log(lifecycleManagerJSON);

    const events = [
      LifecycleManagerEvents.createComponentRegisteredEvent(wallet),
      LifecycleManagerEvents.createComponentUnregisteredEvent("PluginManager"),
      LifecycleManagerEvents.createComponentInitializedEvent("Wallet"),
      LifecycleManagerEvents.createComponentStartedEvent("Wallet"),
      LifecycleManagerEvents.createComponentPausedEvent("PluginManager"),
      LifecycleManagerEvents.createComponentResumedEvent("Scheduler"),
      LifecycleManagerEvents.createComponentStoppedEvent("EventBus"),
      LifecycleManagerEvents.createComponentDestroyedEvent("ResourceManager"),
      LifecycleManagerEvents.createComponentStateChangedEvent(
        "Scheduler",
        "STARTED"
      ),
      LifecycleManagerEvents.createComponentMetadataUpdatedEvent(
        "Wallet",
        {
          balanceAware: true,
        }
      ),
      LifecycleManagerEvents.createLifecycleManagerClearedEvent(),
    ];

    console.log("16. Crear eventos utilizando LifecycleManagerEvents:");
    console.log(events);

    const removedComponent =
      lifecycleManager.unregisterComponent("PluginManager");

    this.assert(
      removedComponent.id === "PluginManager",
      "PluginManager debe eliminarse correctamente."
    );

    console.log("17. Eliminar PluginManager:");
    console.log(removedComponent);

    const countAfterRemove =
      lifecycleManager.count();

    this.assert(
      countAfterRemove === 4,
      "Deben quedar cuatro componentes."
    );

    console.log("18. Verificar nuevamente count():");
    console.log(countAfterRemove);

    lifecycleManager.clear();

    console.log("19. Ejecutar clear():");
    console.log(lifecycleManager.toJSON());

    this.assert(
      lifecycleManager.count() === 0,
      "LifecycleManager debe quedar sin componentes."
    );

    console.log("20. Verificar que count() sea 0:");
    console.log(lifecycleManager.count());

    console.log("21. Mostrar todos los resultados por consola:");
    console.log({
      components,
      createdComponents,
      initializedComponents,
      startedComponents,
      pausedComponents,
      stoppedComponents,
      destroyedComponents,
      updatedWallet,
      updatedScheduler,
      count,
      lifecycleManagerJSON,
      events,
      removedComponent,
      countAfterRemove,
      finalCount: lifecycleManager.count(),
    });

    console.log("===== LIFECYCLE MANAGER SANDBOX OK =====");
  }
}

new LifecycleManagerSandbox();

export default LifecycleManagerSandbox;
