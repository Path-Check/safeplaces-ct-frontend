import React from 'react';

import PersonalInformation from 'views/Registration/PersonalInformation';
import AccessCode from 'views/Registration/AccessCode';
import registrationSelectors from 'ducks/registration/selectors';
import { useSelector } from 'react-redux';

const RegistrationView = () => {
  const registrationStage = useSelector(state =>
    registrationSelectors.registrationStage(state),
  );

  return (
    <>{registrationStage === 2 ? <AccessCode /> : <PersonalInformation />}</>
  );
};

export default RegistrationView;
