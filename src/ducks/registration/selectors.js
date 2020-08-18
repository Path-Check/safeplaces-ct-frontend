const registrationSelectors = {
  getMFAToken: state => state.registration.mfaToken,
  getOobCode: state => state.registration.oobCode,
  phoneNumber: state => state.registration.phoneNumber,
  getRegistration: state => state.registration,
};

export default registrationSelectors;
