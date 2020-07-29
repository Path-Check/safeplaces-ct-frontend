import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/pro-solid-svg-icons';

import { passwordInput } from './PasswordInput.module.scss';

const PasswordInput = ({ id, label, name, onChange }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={passwordInput}>
      <input
        id={id}
        labelText={label}
        type={showPassword ? 'text' : 'password'}
        required
        name={name}
        onChange={onChange}
      />
      <button type="button" onClick={() => setShowPassword(!showPassword)}>
        <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
      </button>
    </div>
  );
};

export default PasswordInput;
