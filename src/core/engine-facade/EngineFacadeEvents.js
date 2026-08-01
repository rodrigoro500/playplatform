class EngineFacadeEvents {
    static ENGINE_FACADE_INITIALIZED = "ENGINE_FACADE_INITIALIZED";
    static ENGINE_FACADE_RESET = "ENGINE_FACADE_RESET";
    static ENGINE_FACADE_HEALTH_REQUESTED = "ENGINE_FACADE_HEALTH_REQUESTED";
    static ENGINE_FACADE_RECOVERY_REQUESTED = "ENGINE_FACADE_RECOVERY_REQUESTED";

    static createEngineFacadeInitializedEvent() {
        return {
            type: this.ENGINE_FACADE_INITIALIZED,
            timestamp: new Date().toISOString(),
            payload: {}
        };
    }

    static createEngineFacadeResetEvent() {
        return {
            type: this.ENGINE_FACADE_RESET,
            timestamp: new Date().toISOString(),
            payload: {}
        };
    }

    static createEngineFacadeHealthRequestedEvent(status) {
        return {
            type: this.ENGINE_FACADE_HEALTH_REQUESTED,
            timestamp: new Date().toISOString(),
            payload: {
                status
            }
        };
    }

    static createEngineFacadeRecoveryRequestedEvent(recovery) {
        return {
            type: this.ENGINE_FACADE_RECOVERY_REQUESTED,
            timestamp: new Date().toISOString(),
            payload: {
                recovery
            }
        };
    }
}

export default EngineFacadeEvents;
