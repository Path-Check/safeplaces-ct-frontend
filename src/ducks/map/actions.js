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
  locationSelect: locationSelect => ({
    type: mapTypes.LOCATION_SELECT,
    locationSelect,
  }),
};

export default mapActions;
