class EngineFacadeValidator {
    static validateManager(manager) {
        if (manager === null) {
            throw new Error("Manager cannot be null.");
        }

        if (typeof manager !== "object") {
            throw new Error("Manager must be an object.");
        }
    }

    static validateHealthManager(healthManager) {
        if (healthManager === null) {
            throw new Error("HealthManager cannot be null.");
        }

        if (typeof healthManager !== "object") {
            throw new Error("HealthManager must be an object.");
        }
    }

    static validateRecoveryManager(recoveryManager) {
        if (recoveryManager === null) {
            throw new Error("RecoveryManager cannot be null.");
        }

        if (typeof recoveryManager !== "object") {
            throw new Error("RecoveryManager must be an object.");
        }
    }

    static validateEngineFacade(engineFacade) {
        if (engineFacade === null || typeof engineFacade !== "object") {
            throw new Error("EngineFacade must be an object.");
        }

        this.validateManager(engineFacade.manager);
        this.validateHealthManager(engineFacade.healthManager);
        this.validateRecoveryManager(engineFacade.recoveryManager);

        if (typeof engineFacade.initialized !== "boolean") {
            throw new Error("EngineFacade initialized must be a boolean.");
        }
    }
}

export default EngineFacadeValidator;
