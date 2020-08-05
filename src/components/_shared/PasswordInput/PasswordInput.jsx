import React, { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/pro-solid-svg-icons';

import { passwordInput } from './PasswordInput.module.scss';
import TextInput from '@wfp/ui/lib/components/TextInput';
import { useSelector } from 'react-redux';

const PasswordInput = ({ label, ...rest }) => {
  const [showPassword, setShowPassword] = useState(false);
  const content = useSelector(state => state.content.data);

  return (
    <div className={passwordInput}>
      {label && <label>{label}</label>}
      <div>
        <TextInput type={showPassword ? 'text' : 'password'} {...rest} />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          title={
            showPassword
              ? content?.forms?.hidePassword
              : content?.forms?.showPassword
          }
        >
          <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
