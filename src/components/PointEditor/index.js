import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';
import DateInput from 'components/_shared/DateInput';
import TimeInput from 'components/_shared/TimeInput';
import TextInput from '@wfp/ui/lib/components/TextInput';
import DurationInput from 'components/DurationInput';
import LocationSearchInput from 'components/_shared/LocationSearch';

import {
  pointEditor,
  locationControls,
  pointEditorHeader,
  closeAction,
  timeControls,
} from './PointEditor.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';
import pointsActions from 'ducks/points/actions';

const PointEditor = ({ isEdit, appStatus }) => {
  const dispatch = useDispatch();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );

  const initialState = isEdit
    ? activePoint
    : {
        date: '',
        time: '',
        longitude: '',
        latitude: '',
      };

  const [state, setState] = useState(initialState);

  const handleSubmit = () => {
    // use local state and fire to api
    console.log(state);

    dispatch(pointsActions.editPoint(state));
  };

  const handleChange = (type, data) => {
    switch (type) {
      case 'latLng':
        setState({
          ...state,
          longitude: data.lng,
          latitude: data.lat,
        });
        break;

      default:
        break;
    }
  };

  return (
    <div className={pointEditor}>
      <div className={pointEditorHeader}>
        <h4>{isEdit ? 'Edit Data' : 'Add Data to Record'}</h4>
        <button
          className={closeAction}
          onClick={() => {
            // revise
            dispatch(applicationActions.updateStatus(''));
            dispatch(pointsActions.setSelectedPoint(null));
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      <div className={locationControls}>
        <LocationSearchInput handlePointChange={handleChange} />
        {/* <span>or</span>
        <Button text="Select from Map">
          <FontAwesomeIcon icon={faCrosshairs} />
        </Button> */}
      </div>

      {/* <DateInput displayValue="06/09/2020" />
      <div className={timeControls}>
        <TimeInput time type="time" defaultValue="test" />
        <DurationInput name="duration" defaultValue="01" />
      </div>
       */}
      <Button onClick={handleSubmit} type="submit" text={`Save Data`} />
    </div>
  );
};

PointEditor.propTypes = {
  isEdit: PropTypes.bool,
  appStatus: PropTypes.string,
};

export default PointEditor;
