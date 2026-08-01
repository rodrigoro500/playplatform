import ResourceManager from "./ResourceManager";
import ResourceManagerEvents from "./ResourceManagerEvents";

class ResourceManagerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== RESOURCE MANAGER SANDBOX =====");

    const resourceManager =
      new ResourceManager();

    console.log("1. Crear una instancia de ResourceManager:");
    console.log(resourceManager.toJSON());

    const texture1 =
      resourceManager.addResource(
        "texture-1",
        "texture",
        {
          path: "/assets/texture-1.png",
        },
        {
          format: "png",
        }
      );

    const texture2 =
      resourceManager.addResource(
        "texture-2",
        "texture",
        {
          path: "/assets/texture-2.png",
        },
        {
          format: "png",
        }
      );

    const sound1 =
      resourceManager.addResource(
        "sound-1",
        "sound",
        {
          path: "/assets/sound-1.mp3",
        },
        {
          format: "mp3",
        }
      );

    const playerCache =
      resourceManager.addResource(
        "player-cache",
        "cache",
        {
          players: [],
        },
        {
          scope: "player",
        }
      );

    const gameConfig =
      resourceManager.addResource(
        "game-config",
        "config",
        {
          maxPlayers: 10,
        },
        {
          scope: "game",
        }
      );

    console.log("2. Agregar los recursos:");
    console.log([
      texture1,
      texture2,
      sound1,
      playerCache,
      gameConfig,
    ]);

    this.assert(
      resourceManager.hasResource("texture-1") === true,
      "texture-1 debe existir."
    );
    this.assert(
      resourceManager.getResource("texture-1").id === "texture-1",
      "Debe obtenerse texture-1."
    );
    this.assert(
      resourceManager.getResourceValue("texture-1").path === "/assets/texture-1.png",
      "Debe obtenerse el value de texture-1."
    );

    console.log("3. Verificar hasResource(), getResource() y getResourceValue():");
    console.log({
      hasTexture1: resourceManager.hasResource("texture-1"),
      texture1: resourceManager.getResource("texture-1"),
      texture1Value: resourceManager.getResourceValue("texture-1"),
    });

    const updatedTexture1 =
      resourceManager.updateResource(
        "texture-1",
        {
          path: "/assets/texture-1-updated.png",
        }
      );

    const texture1WithMetadata =
      resourceManager.updateMetadata(
        "texture-1",
        {
          optimized: true,
        }
      );

    console.log("4. Actualizar value y metadata de texture-1:");
    console.log({
      updatedTexture1,
      texture1WithMetadata,
    });

    const texture1InUse =
      resourceManager.markAsInUse("texture-1");

    const texture2Disabled =
      resourceManager.disableResource("texture-2");

    const texture1Available =
      resourceManager.markAsAvailable("texture-1");

    console.log("5. Cambiar estados:");
    console.log({
      texture1InUse,
      texture2Disabled,
      texture1Available,
    });

    const resources =
      resourceManager.getResources();

    const textureResources =
      resourceManager.getResourcesByType("texture");

    const soundResources =
      resourceManager.getResourcesByType("sound");

    const availableResources =
      resourceManager.getResourcesByStatus("AVAILABLE");

    const inUseResources =
      resourceManager.getResourcesByStatus("IN_USE");

    const disabledResources =
      resourceManager.getResourcesByStatus("DISABLED");

    this.assert(
      textureResources.length === 2,
      "Deben existir dos recursos texture."
    );
    this.assert(
      soundResources.length === 1,
      "Debe existir un recurso sound."
    );
    this.assert(
      disabledResources.length === 1,
      "Debe existir un recurso DISABLED."
    );

    console.log("6. Obtener recursos y filtros:");
    console.log({
      resources,
      textureResources,
      soundResources,
      availableResources,
      inUseResources,
      disabledResources,
    });

    const count =
      resourceManager.count();

    this.assert(
      count === 5,
      "Deben existir cinco recursos."
    );

    console.log("7. Verificar count():");
    console.log(count);

    const resourceManagerJSON =
      resourceManager.toJSON();

    console.log("8. Serializar utilizando toJSON():");
    console.log(resourceManagerJSON);

    const events = [
      ResourceManagerEvents.createResourceAddedEvent(texture1),
      ResourceManagerEvents.createResourceUpdatedEvent(updatedTexture1),
      ResourceManagerEvents.createResourceRemovedEvent("game-config"),
      ResourceManagerEvents.createResourceStatusChangedEvent(
        "texture-2",
        "DISABLED"
      ),
      ResourceManagerEvents.createResourceMetadataUpdatedEvent(
        "texture-1",
        {
          optimized: true,
        }
      ),
      ResourceManagerEvents.createResourceManagerClearedEvent(),
    ];

    console.log("9. Crear eventos utilizando ResourceManagerEvents:");
    console.log(events);

    const removedResource =
      resourceManager.removeResource("game-config");

    this.assert(
      removedResource.id === "game-config",
      "game-config debe eliminarse correctamente."
    );

    console.log("10. Eliminar un recurso:");
    console.log(removedResource);

    const countAfterRemove =
      resourceManager.count();

    this.assert(
      countAfterRemove === 4,
      "Deben quedar cuatro recursos."
    );

    console.log("11. Verificar nuevamente count():");
    console.log(countAfterRemove);

    resourceManager.clear();

    console.log("12. Ejecutar clear():");
    console.log(resourceManager.toJSON());

    this.assert(
      resourceManager.count() === 0,
      "ResourceManager debe quedar sin recursos."
    );

    console.log("13. Verificar que count() sea 0:");
    console.log(resourceManager.count());

    console.log("14. Mostrar todos los resultados por consola:");
    console.log({
      resources,
      textureResources,
      soundResources,
      availableResources,
      inUseResources,
      disabledResources,
      count,
      resourceManagerJSON,
      events,
      removedResource,
      countAfterRemove,
      finalCount: resourceManager.count(),
    });

    console.log("===== RESOURCE MANAGER SANDBOX OK =====");
  }
}

new ResourceManagerSandbox();

export default ResourceManagerSandbox;
