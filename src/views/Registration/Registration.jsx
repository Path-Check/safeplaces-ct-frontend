import React from 'react';

import PersonalInformation from 'views/Registration/PersonalInformation';
import AccessCode from 'views/Registration/AccessCode';

const RegistrationView = () => {
  const submittedInformation = 1;

  return <>{submittedInformation ? <PersonalInformation /> : <AccessCode />}</>;
};

export default RegistrationView;
