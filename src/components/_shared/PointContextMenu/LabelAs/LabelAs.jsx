import React from 'react';

import TextInput from '@wfp/ui/lib/components/TextInput';

import {
  labelAsWrapper,
  inputWrapper,
  labelAsWrapperOption,
  labelAsWrapperOptionCheck,
} from './LabelAs.module.scss';

import Button from 'components/_shared/Button';

import {
  faCheck,
  faBuilding,
  faUniversity,
  faPiggyBank,
  faChevronRight,
} from '@fortawesome/pro-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Options = [
  {
    icon: faBuilding,
    tag: 'Work',
  },
  {
    icon: faUniversity,
    tag: 'University',
  },
  {
    icon: faPiggyBank,
    tag: 'Bank',
  },
];

const LabelAs = ({ currentLabel }) => {
  return (
    <div className={labelAsWrapper}>
      <div className={inputWrapper}>
        <TextInput
          id="labelAs"
          labelText=""
          name="labelAs"
          placeholder="Dave's Diner"
        />
        <Button>
          <FontAwesomeIcon
            setTag={() => console.log('set tag')}
            icon={faChevronRight}
          />
        </Button>
      </div>
      <ul>
        {Options.map(({ icon, tag }) => (
          <li className={labelAsWrapperOption}>
            <button
              setTag={() => console.log('set tag')}
              disabled={tag === currentLabel}
            >
              <FontAwesomeIcon icon={icon} /> {tag}
              {tag === currentLabel && (
                <FontAwesomeIcon
                  icon={faCheck}
                  className={labelAsWrapperOptionCheck}
                />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LabelAs;
