import EngineSerializer from "./EngineSerializer";
import EngineSerializerEvents from "./EngineSerializerEvents";

class EngineSerializerSandbox {
  constructor() {
    this.run();
  }

  assert(condition, message) {
    if (!condition) {
      throw new Error(message);
    }
  }

  run() {
    console.log("===== ENGINE SERIALIZER SANDBOX =====");

    const manager = {};

    console.log("1. Crear un objeto simulado:");
    console.log({
      manager,
    });

    const serializer =
      new EngineSerializer();

    console.log("2. Crear una instancia de EngineSerializer:");
    console.log(serializer.toJSON());

    const initialStatus =
      serializer.getStatus();

    this.assert(
      initialStatus.manager === false &&
        initialStatus.hasSerializedData === false &&
        initialStatus.hasLastExport === false &&
        initialStatus.hasLastImport === false,
      "EngineSerializer debe iniciar sin manager ni datos serializados."
    );
    this.assert(
      serializer.getSerializedData() === null,
      "serializedData debe iniciar null."
    );
    this.assert(
      serializer.getLastExport() === null,
      "lastExport debe iniciar null."
    );
    this.assert(
      serializer.getLastImport() === null,
      "lastImport debe iniciar null."
    );

    console.log("3. Verificar estado inicial:");
    console.log({
      status: initialStatus,
      serializedData: serializer.getSerializedData(),
      lastExport: serializer.getLastExport(),
      lastImport: serializer.getLastImport(),
    });

    serializer.setManager(manager);

    console.log("4. Asignar dependencia:");
    console.log(serializer.getStatus());

    const statusWithManager =
      serializer.getStatus();

    this.assert(
      statusWithManager.manager === true,
      "Manager debe estar asignado."
    );

    console.log("5. Verificar nuevamente getStatus():");
    console.log(statusWithManager);

    const serializedData =
      serializer.export({
        engine: "Core",
        version: "1.0.0",
        state: "READY",
      });

    this.assert(
      typeof serializedData === "string" &&
        serializedData.trim() !== "",
      "export() debe devolver un string serializado."
    );

    console.log("6. Ejecutar export():");
    console.log(serializedData);

    this.assert(
      serializer.getSerializedData() === serializedData,
      "getSerializedData() debe devolver el ultimo dato serializado."
    );
    this.assert(
      typeof serializer.getLastExport() === "string" &&
        serializer.getLastExport().trim() !== "",
      "lastExport debe ser un string no vacio."
    );

    console.log("7. Verificar getSerializedData() y getLastExport():");
    console.log({
      serializedData: serializer.getSerializedData(),
      lastExport: serializer.getLastExport(),
    });

    const importedData =
      serializer.import(serializedData);

    this.assert(
      typeof serializer.getLastImport() === "string" &&
        serializer.getLastImport().trim() !== "",
      "lastImport debe ser un string no vacio."
    );
    this.assert(
      Object.prototype.hasOwnProperty.call(importedData, "timestamp") &&
        Object.prototype.hasOwnProperty.call(importedData, "version") &&
        Object.prototype.hasOwnProperty.call(importedData, "data"),
      "El objeto importado debe contener timestamp, version y data."
    );

    console.log("8. Ejecutar import(serializedData):");
    console.log({
      importedData,
      lastImport: serializer.getLastImport(),
    });

    const statusAfterImport =
      serializer.getStatus();

    console.log("9. Obtener getStatus():");
    console.log(statusAfterImport);

    const serializerJSON =
      serializer.toJSON();

    console.log("10. Serializar utilizando toJSON():");
    console.log(serializerJSON);

    const events = [
      EngineSerializerEvents.createEngineSerializerExportCompletedEvent(
        serializedData
      ),
      EngineSerializerEvents.createEngineSerializerImportCompletedEvent(
        importedData
      ),
      EngineSerializerEvents.createEngineSerializerClearedEvent(),
      EngineSerializerEvents.createEngineSerializerResetEvent(),
    ];

    console.log("11. Crear eventos utilizando EngineSerializerEvents:");
    console.log(events);

    const cleared =
      serializer.clear();

    this.assert(
      cleared === true,
      "clear() debe devolver true."
    );
    this.assert(
      serializer.getSerializedData() === null,
      "serializedData debe quedar null tras clear."
    );
    this.assert(
      serializer.getLastExport() === null,
      "lastExport debe quedar null tras clear."
    );
    this.assert(
      serializer.getLastImport() === null,
      "lastImport debe quedar null tras clear."
    );

    console.log("12. Ejecutar clear():");
    console.log({
      serializedData: serializer.getSerializedData(),
      lastExport: serializer.getLastExport(),
      lastImport: serializer.getLastImport(),
    });

    const reset =
      serializer.reset();

    this.assert(
      reset === true,
      "reset() debe devolver true."
    );

    console.log("13. Ejecutar reset():");
    console.log(reset);

    const resetStatus =
      serializer.getStatus();

    this.assert(
      resetStatus.manager === false &&
        resetStatus.hasSerializedData === false &&
        resetStatus.hasLastExport === false &&
        resetStatus.hasLastImport === false,
      "EngineSerializer debe limpiar manager y datos tras reset."
    );
    this.assert(
      serializer.getSerializedData() === null,
      "serializedData debe quedar null tras reset."
    );
    this.assert(
      serializer.getLastExport() === null,
      "lastExport debe quedar null tras reset."
    );
    this.assert(
      serializer.getLastImport() === null,
      "lastImport debe quedar null tras reset."
    );

    console.log("14. Verificar nuevamente getStatus(), getSerializedData(), getLastExport() y getLastImport():");
    console.log({
      status: resetStatus,
      serializedData: serializer.getSerializedData(),
      lastExport: serializer.getLastExport(),
      lastImport: serializer.getLastImport(),
    });

    console.log("15. Mostrar todos los resultados por consola:");
    console.log({
      initialStatus,
      statusWithManager,
      serializedData,
      importedData,
      statusAfterImport,
      serializerJSON,
      events,
      cleared,
      resetStatus,
    });

    console.log("===== ENGINE SERIALIZER SANDBOX OK =====");
  }
}

new EngineSerializerSandbox();

export default EngineSerializerSandbox;
