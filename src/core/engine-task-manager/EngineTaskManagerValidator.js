class EngineTaskManagerValidator {
  static validateManager(manager) {
    if (manager === null) {
      throw new Error(
        "EngineTaskManager manager no puede ser null."
      );
    }

    if (typeof manager !== "object") {
      throw new Error(
        "EngineTaskManager manager debe ser un objeto."
      );
    }
  }

  static validateInitialized(initialized) {
    if (typeof initialized !== "boolean") {
      throw new Error(
        "EngineTaskManager initialized debe ser boolean."
      );
    }
  }

  static validateTaskName(name) {
    if (
      typeof name !== "string" ||
      name.trim() === ""
    ) {
      throw new Error(
        "El nombre de la tarea debe ser un string no vacio."
      );
    }
  }

  static validateTask(task) {
    if (typeof task !== "function") {
      throw new Error(
        "La tarea debe ser una funcion."
      );
    }
  }

  static validateTaskRegistry(tasks) {
    if (!(tasks instanceof Map)) {
      throw new Error(
        "tasks debe ser una instancia de Map."
      );
    }

    tasks.forEach((task, name) => {
      EngineTaskManagerValidator.validateTaskName(name);
      EngineTaskManagerValidator.validateTask(task);
    });
  }

  static validateEngineTaskManager(engineTaskManager) {
    if (
      engineTaskManager === null ||
      typeof engineTaskManager !== "object"
    ) {
      throw new Error(
        "EngineTaskManager debe ser un objeto valido."
      );
    }

    EngineTaskManagerValidator.validateManager(
      engineTaskManager.manager
    );
    EngineTaskManagerValidator.validateInitialized(
      engineTaskManager.initialized
    );
    EngineTaskManagerValidator.validateTaskRegistry(
      engineTaskManager.tasks
    );
  }
}

export default EngineTaskManagerValidator;
