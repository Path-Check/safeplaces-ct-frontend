import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/_global/Modal';

import TextInput from '@wfp/ui/lib/components/TextInput';
import Button from 'components/_shared/Button';
import casesSelectors from 'ducks/cases/selectors';

import applicationActions from 'ducks/application/actions';
import casesActions from 'ducks/cases/actions';
import FormWrapper from 'components/_shared/Forms/FormWrapper';

const ResetPassword = () => {
  const dispatch = useDispatch();

  return (
    <Modal style="b" closeAction={() => dispatch(casesActions.deleteCase())}>
      <FormWrapper
        title="Forgot your password"
        intro="Enter the email address associated with your account, and we’ll email you a link to reset your password."
      >
        <form>
          <TextInput
            id="reset-email"
            labelText="Email address"
            type="email"
            name="resetEmail"
            placeholder="tracer@yourha.org"
          />
          <Button type="submit">Send reset link</Button>
        </form>
      </FormWrapper>
    </Modal>
  );
};

export default ResetPassword;
