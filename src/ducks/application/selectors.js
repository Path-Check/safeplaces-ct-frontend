const applicationSelectors = {
  getStatus: state => state.application.status,
  getNotification: state => state.application.notification,
};

export default applicationSelectors;
