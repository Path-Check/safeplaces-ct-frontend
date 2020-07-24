import React, { useState } from 'react';
import {
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

const Members = () => {
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
      value: 'tracer',
      label: 'Contact Tracer',
    },
    {
      value: 'admin',
      label: 'Administrator',
    },
    {
      value: 'superadmin',
      label: 'Super Admin',
    },
  ];
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
            invalid={email.length && !isValidEmail}
            invalidText={'Please enter a valid email'}
          />
          <Select options={options} />
          <Button className={addButton}>Add</Button>
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
