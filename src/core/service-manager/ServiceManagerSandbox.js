import ServiceManager from "./ServiceManager";
import ServiceManagerEvents from "./ServiceManagerEvents";

class ServiceManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== SERVICE MANAGER SANDBOX =====");

    const serviceManager =
      new ServiceManager();

    console.log("1. Crear una instancia de ServiceManager:");
    console.log(serviceManager.toJSON());

    const persistenceService =
      serviceManager.registerService(
        "persistence-service",
        "Persistence Service",
        {
          module: "persistence",
        },
        {
          category: "storage",
        }
      );

    const audioService =
      serviceManager.registerService(
        "audio-service",
        "Audio Service",
        {
          module: "audio",
        },
        {
          category: "media",
        }
      );

    const networkService =
      serviceManager.registerService(
        "network-service",
        "Network Service",
        {
          module: "network",
        },
        {
          category: "connectivity",
        }
      );

    const aiService =
      serviceManager.registerService(
        "ai-service",
        "AI Service",
        {
          module: "ai",
        },
        {
          category: "intelligence",
        }
      );

    const notificationService =
      serviceManager.registerService(
        "notification-service",
        "Notification Service",
        {
          module: "notification",
        },
        {
          category: "communication",
        }
      );

    console.log("2. Registrar cinco servicios:");
    console.log([
      persistenceService,
      audioService,
      networkService,
      aiService,
      notificationService,
    ]);

    this.assert(
      serviceManager.hasService("persistence-service") === true,
      "persistence-service debe existir."
    );
    this.assert(
      serviceManager.getService("persistence-service").id === "persistence-service",
      "Debe obtenerse persistence-service."
    );
    this.assert(
      serviceManager.getServiceInstance("persistence-service").module === "persistence",
      "Debe obtenerse la instancia de persistence-service."
    );

    console.log("3. Verificar hasService(), getService() y getServiceInstance():");
    console.log({
      hasPersistenceService: serviceManager.hasService("persistence-service"),
      persistenceService: serviceManager.getService("persistence-service"),
      persistenceServiceInstance:
        serviceManager.getServiceInstance("persistence-service"),
    });

    this.assert(
      serviceManager.isActive("persistence-service") === true,
      "persistence-service debe iniciar ACTIVE."
    );

    console.log("4. Verificar isActive():");
    console.log(serviceManager.isActive("persistence-service"));

    serviceManager.deactivateService("audio-service");
    serviceManager.deactivateService("ai-service");

    console.log("5. Desactivar audio-service y ai-service:");
    console.log({
      audioService: serviceManager.getService("audio-service"),
      aiService: serviceManager.getService("ai-service"),
    });

    serviceManager.disableService("notification-service");

    console.log("6. Deshabilitar notification-service:");
    console.log(serviceManager.getService("notification-service"));

    const reactivatedAudioService =
      serviceManager.activateService("audio-service");

    this.assert(
      reactivatedAudioService.status === "ACTIVE",
      "audio-service debe quedar ACTIVE."
    );

    console.log("7. Reactivar audio-service:");
    console.log(reactivatedAudioService);

    const services =
      serviceManager.getServices();

    const activeServices =
      serviceManager.getServicesByStatus("ACTIVE");

    const inactiveServices =
      serviceManager.getServicesByStatus("INACTIVE");

    const disabledServices =
      serviceManager.getServicesByStatus("DISABLED");

    this.assert(
      activeServices.length === 3,
      "Deben existir tres servicios ACTIVE."
    );
    this.assert(
      inactiveServices.length === 1,
      "Debe existir un servicio INACTIVE."
    );
    this.assert(
      disabledServices.length === 1,
      "Debe existir un servicio DISABLED."
    );

    console.log("8. Obtener servicios y filtros por estado:");
    console.log({
      services,
      activeServices,
      inactiveServices,
      disabledServices,
    });

    const updatedPersistenceService =
      serviceManager.updateMetadata(
        "persistence-service",
        {
          encrypted: true,
        }
      );

    const updatedNetworkService =
      serviceManager.updateMetadata(
        "network-service",
        {
          protocol: "websocket",
        }
      );

    console.log("9. Actualizar metadata de persistence-service y network-service:");
    console.log({
      updatedPersistenceService,
      updatedNetworkService,
    });

    console.log("10. Verificar nuevamente getService():");
    console.log({
      persistenceService: serviceManager.getService("persistence-service"),
      networkService: serviceManager.getService("network-service"),
    });

    const count =
      serviceManager.count();

    this.assert(
      count === 5,
      "Deben existir cinco servicios."
    );

    console.log("11. Verificar count():");
    console.log(count);

    const serviceManagerJSON =
      serviceManager.toJSON();

    console.log("12. Serializar utilizando toJSON():");
    console.log(serviceManagerJSON);

    const events = [
      ServiceManagerEvents.createServiceRegisteredEvent(persistenceService),
      ServiceManagerEvents.createServiceUnregisteredEvent("ai-service"),
      ServiceManagerEvents.createServiceActivatedEvent("audio-service"),
      ServiceManagerEvents.createServiceDeactivatedEvent("ai-service"),
      ServiceManagerEvents.createServiceDisabledEvent("notification-service"),
      ServiceManagerEvents.createServiceStatusChangedEvent(
        "notification-service",
        "DISABLED"
      ),
      ServiceManagerEvents.createServiceMetadataUpdatedEvent(
        "persistence-service",
        {
          encrypted: true,
        }
      ),
      ServiceManagerEvents.createServiceManagerClearedEvent(),
    ];

    console.log("13. Crear eventos utilizando ServiceManagerEvents:");
    console.log(events);

    const removedService =
      serviceManager.unregisterService("ai-service");

    this.assert(
      removedService.id === "ai-service",
      "ai-service debe eliminarse correctamente."
    );

    console.log("14. Eliminar ai-service:");
    console.log(removedService);

    const countAfterRemove =
      serviceManager.count();

    this.assert(
      countAfterRemove === 4,
      "Deben quedar cuatro servicios."
    );

    console.log("15. Verificar nuevamente count():");
    console.log(countAfterRemove);

    serviceManager.clear();

    console.log("16. Ejecutar clear():");
    console.log(serviceManager.toJSON());

    this.assert(
      serviceManager.count() === 0,
      "ServiceManager debe quedar sin servicios."
    );

    console.log("17. Verificar que count() sea 0:");
    console.log(serviceManager.count());

    console.log("18. Mostrar todos los resultados por consola:");
    console.log({
      services,
      activeServices,
      inactiveServices,
      disabledServices,
      updatedPersistenceService,
      updatedNetworkService,
      count,
      serviceManagerJSON,
      events,
      removedService,
      countAfterRemove,
      finalCount: serviceManager.count(),
    });

    console.log("===== SERVICE MANAGER SANDBOX OK =====");
  }
}

new ServiceManagerSandbox();

export default ServiceManagerSandbox;
