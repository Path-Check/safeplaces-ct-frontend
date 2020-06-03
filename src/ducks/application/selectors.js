const applicationSelectors = {
  getStatus: state => state.application.status,
  getNotification: state => state.application.notification,
  getRenderEditor: state => state.application.renderEditor,
};

export default applicationSelectors;
