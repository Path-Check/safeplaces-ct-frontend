import registrationTypes from './types';

const initialState = {
  stage: 0,
  details: null,
  code: null,
};

export default function reducer(state = initialState, action) {
  const { type, stage, code, data } = action;
  switch (type) {
    case registrationTypes.REGISTRATION_STAGE:
      return {
        ...state,
        stage,
      };
    case registrationTypes.SUBMIT_ACCESS_CODE:
      return {
        ...state,
        code,
      };
    case registrationTypes.SUBMIT_INFORMATION:
      return {
        ...state,
        details: data,
      };
    default:
      return state;
  }
}
