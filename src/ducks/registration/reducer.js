import registrationTypes from './types';

const initialState = {
  mfaToken: null,
  oobCode: null,
  phoneNumber: null,
};

export default function reducer(state = initialState, action) {
  const { type, data } = action;
  switch (type) {
    case registrationTypes.MFA_STARTED:
      return {
        ...state,
        mfaToken: data,
      };
    case registrationTypes.PHONE_SENT:
      return {
        ...state,
        phoneNumber: data.phoneNumber,
        oobCode: data.oob_code,
      };
    default:
      return state;
  }
}
