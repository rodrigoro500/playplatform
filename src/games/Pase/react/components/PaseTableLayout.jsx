function PaseTableLayout({
  children,
}) {
  return (
    <div className="pase-table-layout">
      <div className="pase-table-header">
      </div>

      <div className="pase-table-body">
        {children}
      </div>

      <div className="pase-table-footer">
      </div>
    </div>
  );
}

export {
  PaseTableLayout,
};

export default PaseTableLayout;
