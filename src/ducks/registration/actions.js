import registrationTypes from './types';

const registrationActions = {
  submitInformation: data => ({
    type: registrationTypes.SUBMIT_INFORMATION,
    data,
  }),
  submitAccessCode: accessCode => ({
    type: registrationTypes.SUBMIT_ACCESS_CODE,
    accessCode,
  }),
  setRegisrationStage: stage => ({
    type: registrationTypes.REGISTRATION_STAGE,
    stage,
  }),
};

export default registrationActions;
