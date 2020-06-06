const applicationSelectors = {
  getStatus: state => state.application.status,
  getNotification: state => state.application.notification,
  getRenderEditor: state => state.application.renderEditor,
  getMode: state => state.application.mode,
};

export default applicationSelectors;
