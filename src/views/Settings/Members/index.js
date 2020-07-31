import React, { useState } from 'react';
import {
  menuIcon,
  container,
  title,
  left,
  right,
  membersContainer,
  itemContainer,
  subtitle,
  emailText,
  roleText,
  addMemberContainer,
  comboControl,
  textInput,
  addButton,
} from './styles.module.scss';
import { TextInput } from '@wfp/ui';
import emailValidator from '../../../helpers/emailValidator';
import Select from 'components/_shared/Select/Select';
import { FixedSizeList as List } from 'react-window';
import getListHeight from '../../../helpers/getListHeight';
import Button from '../../../components/_shared/Button';
import { marker } from '../../../components/_shared/Map/Marker/Marker.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import Dropdown from './Dropdown';
import { useDispatch, useSelector } from 'react-redux';
import usersActions from '../../../ducks/users/actions';
import authSelectors from '../../../ducks/auth/selectors';

const Members = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => authSelectors.getCurrentUser(state));

  const mockData = [
    { name: 'darth.vader@darkside.com', role: 'Admin' },
    { name: 'sauron@mordor.com', role: 'Contact Tracer' },
    { name: 'saruman@isengard.com', role: 'Admin' },
    { name: 'Gandalf', role: 'Contact Tracer' },
    { name: 'Darth Vader', role: 'Admin' },
    { name: 'Gandalf', role: 'Contact Tracer' },
    { name: 'Darth Vader', role: 'Admin' },
    { name: 'Gandalf', role: 'Contact Tracer' },
    { name: 'Darth Vader', role: 'Admin' },
    { name: 'Gandalf', role: 'Contact Tracer' },
  ];
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
  const onEmail = ({ target: { value } }) => {
    if (value.length) {
      setIsValidEmail(emailValidator(value));
    }
    setEmail(value);
  };

  const rowRenderer = ({ data, index, style }) => {
    const { name, role } = data[index];

    return (
      <div className={itemContainer} style={style} key={name}>
        <div title={name} className={emailText}>
          {name}
        </div>
        <div className={roleText}>{role}</div>
        <Dropdown />
      </div>
    );
  };

  const renderMembers = () => {
    return (
      <List
        itemCount={mockData.length}
        height={getListHeight(mockData, 72, 350)}
        width="100%"
        itemSize={72}
        itemData={mockData}
      >
        {rowRenderer}
      </List>
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
            className={textInput}
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
          <h3 className={`${left} ${subtitle}`}>Name</h3>
          <h3 className={`${right} ${subtitle}`}>Role</h3>
        </div>
        {renderMembers()}
      </div>
    </div>
  );
};

export default Members;
