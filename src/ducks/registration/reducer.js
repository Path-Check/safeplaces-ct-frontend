import tagsTypes from './types';
import registrationTypes from './types';

const initialState = {
  registrationStage: 0,
};

export default function reducer(state = initialState, action) {
  const { type, registrationStage } = action;
  switch (type) {
    case registrationTypes.REGISTRATION_STAGE:
      return {
        ...state,
        registrationStage,
      };
    default:
      return state;
  }
}
