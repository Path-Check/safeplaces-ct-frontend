import React, { useEffect, useState } from 'react';
import {
  addButton,
  addMemberContainer,
  comboControl,
  container,
  emailText,
  itemContainer,
  left,
  membersContainer,
  noUsers,
  right,
  roleText,
  subtitle,
  title,
} from './styles.module.scss';
import { TextInput } from '@wfp/ui';
import emailValidator from '../../../helpers/emailValidator';
import Select from 'components/_shared/Select/Select';
import { FixedSizeList as List } from 'react-window';
import getListHeight from '../../../helpers/getListHeight';
import Button from '../../../components/_shared/Button';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import usersActions from '../../../ducks/users/actions';
import authSelectors from '../../../ducks/auth/selectors';
import userSelectors from '../../../ducks/users/selectors';

const Members = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => authSelectors.getCurrentUser(state));
  const usersList = useSelector(state => userSelectors.getAllUsers(state));

  const options = [
    {
      value: 'contact_tracer',
      label: 'Contact Tracer',
    },
    {
      value: 'admin',
      label: 'Admin',
    },
    {
      value: 'super_admin',
      label: 'Super Admin',
    },
  ];
  const [role, setRole] = useState('contact_tracer');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);

  useEffect(() => {
    dispatch(usersActions.getAllUsersRequest());
  }, []);

  const onEmail = ({ target: { value } }) => {
    if (value.length) {
      setIsValidEmail(emailValidator(value));
    }
    setEmail(value);
  };

  const rowRenderer = ({ data, index, style }) => {
    const { id, email, role } = data[index];

    return (
      <div className={itemContainer} style={style} key={email}>
        <div title={email} className={emailText}>
          {email}
        </div>
        <div className={roleText}>{role && role.replace('_', ' ')}</div>
        <Dropdown id={id} role={role} />
      </div>
    );
  };

  const renderMembers = () => {
    return usersList && usersList.length ? (
      <List
        itemCount={usersList.length}
        height={getListHeight(usersList, 72, 350)}
        width="100%"
        itemSize={72}
        itemData={usersList}
      >
        {rowRenderer}
      </List>
    ) : (
      <div className={noUsers}>
        <h3 className={subtitle}>No users added yet...</h3>
      </div>
    );
  };

  const addNewUser = () => {
    dispatch(
      usersActions.createUserRequest({
        email,
        role,
        organization_id: String(currentUser.id),
      }),
    );
  };

  return (
    <div className={container}>
      <h3 className={title}>Add new member</h3>
      <div className={addMemberContainer}>
        <div className={comboControl}>
          <TextInput
            id="email-input"
            hideLabel
            placeholder="Email address"
            labelText=""
            onChange={onEmail}
            autoCorrect="off"
            autoCapitalize="off"
            name="email"
            type="email"
            invalid={email.length && !isValidEmail}
            invalidText={'Please enter a valid email'}
          />
          <Select onSelect={setRole} options={options} />
          <Button
            disabled={!email.length || !isValidEmail || !role.length}
            onClick={addNewUser}
            className={addButton}
          >
            Add
          </Button>
        </div>
      </div>

      <div
        style={{ marginTop: email.length && !isValidEmail ? 26 : 48 }}
        className={membersContainer}
      >
        <h3 className={title}>Existing members</h3>
        <div className={itemContainer}>
          <h3 className={`${left} ${subtitle}`}>Email</h3>
          <h3 className={`${right} ${subtitle}`}>Role</h3>
        </div>
        {renderMembers()}
      </div>
    </div>
  );
};

export default Members;
