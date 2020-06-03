import React from 'react';
import { useForm } from 'react-hook-form';
import { Blockquote, Button, TextInput } from '@wfp/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignIn } from '@fortawesome/pro-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeSettingsApi, getSettingsApi } from '../../ducks/settingsApi';
import ButtonRouter from 'components/_legacy/ButtonRouter';
import authSelectors from 'ducks/auth/selectors';

export default function ApiPage() {
  const token = useSelector(authSelectors.getToken);

  const { handleSubmit, register } = useForm({
    defaultValues: useSelector(getSettingsApi),
  });
  const dispatch = useDispatch();
  const onSubmit = values => {
    dispatch(changeSettingsApi(values));
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {token ? (
          <Blockquote>
            You are currently authentificated to a API
            <br />
            Token: {token}
          </Blockquote>
        ) : (
          <Blockquote>
            You are currently not authentificated to a API
          </Blockquote>
        )}
        <TextInput name="apiurl" labelText="Api url" inputRef={register} />
        <Button type="submit">Save</Button>{' '}
        <ButtonRouter
          kind="secondary"
          icon={<FontAwesomeIcon icon={faSignIn} />}
          to={'/login'}
        >
          Go to authentification
        </ButtonRouter>
      </form>
    </div>
  );
}
