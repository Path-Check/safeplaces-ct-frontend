import { useState, useEffect } from 'react';

const passwordTest = new RegExp(
  '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})',
);

export const useValidatePassword = password => {
  const [passwordValid, setPasswordValid] = useState(false);

  const checkPassword = password => passwordTest.test(password);

  useEffect(() => {
    const isValid = checkPassword(password);

    setPasswordValid(isValid);
  }, [password]);

  return [passwordValid];
};
