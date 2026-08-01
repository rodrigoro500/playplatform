class PaseReactAdapterEvents {
  static PASE_REACT_ADAPTER_INITIALIZED = "PASE_REACT_ADAPTER_INITIALIZED";
  static PASE_REACT_ADAPTER_REFRESHED = "PASE_REACT_ADAPTER_REFRESHED";
  static PASE_REACT_ADAPTER_SUBSCRIBED = "PASE_REACT_ADAPTER_SUBSCRIBED";
  static PASE_REACT_ADAPTER_UNSUBSCRIBED = "PASE_REACT_ADAPTER_UNSUBSCRIBED";
  static PASE_REACT_ADAPTER_RESET = "PASE_REACT_ADAPTER_RESET";

  static createPaseReactAdapterInitializedEvent() {
    return {
      type: this.PASE_REACT_ADAPTER_INITIALIZED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseReactAdapterRefreshedEvent() {
    return {
      type: this.PASE_REACT_ADAPTER_REFRESHED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseReactAdapterSubscribedEvent() {
    return {
      type: this.PASE_REACT_ADAPTER_SUBSCRIBED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseReactAdapterUnsubscribedEvent() {
    return {
      type: this.PASE_REACT_ADAPTER_UNSUBSCRIBED,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }

  static createPaseReactAdapterResetEvent() {
    return {
      type: this.PASE_REACT_ADAPTER_RESET,
      timestamp: new Date().toISOString(),
      payload: {},
    };
  }
}

export default PaseReactAdapterEvents;
