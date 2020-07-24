import registrationTypes from './types';

const registrationActions = {
  submitInformation: data => ({
    type: registrationTypes.TAGS,
    data,
  }),
  submitAccessCode: accessCode => ({
    type: registrationTypes.TAGS,
    accessCode,
  }),
};

export default registrationActions;
