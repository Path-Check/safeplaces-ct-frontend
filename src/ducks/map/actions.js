import mapTypes from './types';

const mapActions = {
  setLocation: location => ({
    type: mapTypes.SET_LOCATION,
    location,
  }),
  updateLocation: location => ({
    type: mapTypes.UPDATE_LOCATION,
    location,
  }),
};

export default mapActions;
