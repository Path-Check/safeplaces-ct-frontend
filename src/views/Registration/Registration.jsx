import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { InlineLoading, TextInput } from '@wfp/ui';
import styles from './Registration.module.scss';

import Button from 'components/_shared/Button';

import FormWrapper from 'components/_shared/Forms/FormWrapper';
import emailValidator from 'helpers/emailValidator';

const RegistrationView = () => {
  return (
    <>
      <PersonalInformation />
      <AccessCode />
    </>
  );
};

export default RegistrationView;
