import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import DateInput from 'components/DateInput';
import TimeInput from 'components/TimeInput';
import TextInput from '@wfp/ui/lib/components/TextInput';
import DurationInput from 'components/DurationInput';
import LocationSearchInput from 'components/EntryForm/autoComplete';

import {
  pointEditor,
  locationControls,
  pointEditorHeader,
  closeAction,
  timeControls,
} from './PointEditor.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faTimes } from '@fortawesome/pro-solid-svg-icons';

const PointEditor = ({ location, date, time, duration, type = 'add' }) => {
  return (
    <div className={pointEditor}>
      <div className={pointEditorHeader}>
        <h4>{type === 'add' ? 'Add Data to Record' : 'Edit Data'}</h4>
        <button className={closeAction}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className={locationControls}>
        {/* <LocationSearchInput /> */}
        <span>or</span>
        <Button text="Select from Map">
          <FontAwesomeIcon icon={faCrosshairs} />
        </Button>
      </div>

      <DateInput />
      <div className={timeControls}>
        <TimeInput time type="time" />
        <DurationInput name="duration" />
      </div>
      <Button
        onClick={() => console.log('submit form')}
        type="submit"
        text={`Save Data`}
      />
    </div>
  );
};

PointEditor.propTypes = {
  location: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  duration: PropTypes.string,
};

export default PointEditor;
