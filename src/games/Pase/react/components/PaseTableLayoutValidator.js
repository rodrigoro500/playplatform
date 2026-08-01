class PaseTableLayoutValidator {
  static validateChildren(children) {
    if (children === null || children === undefined) {
      throw new Error(
        "PaseTableLayout children debe existir."
      );
    }
  }

  static validateLayout(layout) {
    if (layout === null || layout === undefined) {
      throw new Error(
        "PaseTableLayout layout debe existir."
      );
    }

    const source =
      typeof layout === "string"
        ? layout
        : JSON.stringify(layout);

    if (!source.includes("pase-table-layout")) {
      throw new Error(
        "PaseTableLayout debe contener pase-table-layout."
      );
    }

    if (!source.includes("pase-table-header")) {
      throw new Error(
        "PaseTableLayout debe contener pase-table-header."
      );
    }

    if (!source.includes("pase-table-body")) {
      throw new Error(
        "PaseTableLayout debe contener pase-table-body."
      );
    }

    if (!source.includes("pase-table-footer")) {
      throw new Error(
        "PaseTableLayout debe contener pase-table-footer."
      );
    }
  }
}

export default PaseTableLayoutValidator;
