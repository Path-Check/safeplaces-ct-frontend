import registrationTypes from './types';

const registrationActions = {
  mfaStarted: data => ({
    type: registrationTypes.MFA_STARTED,
    data,
  }),
  submitInformation: data => ({
    type: registrationTypes.SUBMIT_INFORMATION,
    data,
  }),
  submitPhoneNumber: data => ({
    type: registrationTypes.SUBMIT_PHONE,
    data,
  }),
  phoneSent: data => ({
    type: registrationTypes.PHONE_SENT,
    data,
  }),
  submitAccessCode: accessCode => ({
    type: registrationTypes.SUBMIT_ACCESS_CODE,
    accessCode,
  }),
};

export default registrationActions;
