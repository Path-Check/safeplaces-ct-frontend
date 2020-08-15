import React from 'react';
import { mount } from 'enzyme';
import Login from './index';
import { TextInput } from '@wfp/ui';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import PasswordInput from '../../../components/_shared/PasswordInput';
import Button from '../../../components/_shared/Button';
import { MemoryRouter } from 'react-router';

const mockStore = configureStore([]);

describe('Login', () => {
  const runAllPromises = () => new Promise(setImmediate);

  let store;

  beforeAll(() => {
    store = mockStore({
      auth: {
        fetching: false,
        error: null,
        errorResponse: null,
        token: 'abcdefg12345678',
        currentUser: 'Jest',
      },
    });
  });

  it('should render and show the username, password, and submit form elements.', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find(TextInput)).toHaveLength(2);
    expect(wrapper.find(PasswordInput)).toHaveLength(1);
    expect(wrapper.find(Button)).toHaveLength(2);
  });

  it('should disable the login button when an invalid/incomplete email address is input', async () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    expect(wrapper.find('#login-button').at(0).prop('disabled')).toBeTruthy();
  });

  // Example interaction test which has async resolution
  it('should enable the login button when valid input is received', async () => {
    // Use the full `mount` method so that the component and all children
    // are mounted/rendered
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>,
    );

    // Find the e-mail input and simulate an onChange event
    wrapper.find(TextInput).at(0).prop('onChange')({
      target: { value: 'test@email.net' },
    });

    // Find the password input and simulate an onChange event
    wrapper.find(PasswordInput).at(0).prop('onChange')({
      target: { value: 'supersecretpassword' },
    });

    // Need to wait for all promises to resolve
    await runAllPromises();

    wrapper.update();
    // Expect the login button to no longer be disabled
    expect(wrapper.find('#login-button').at(0).prop('disabled')).toBeFalsy();
  });
});
