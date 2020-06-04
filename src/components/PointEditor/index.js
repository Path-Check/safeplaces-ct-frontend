import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from 'components/_shared/Button';
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
import {
  faCrosshairs,
  faTimes,
  faCheck,
} from '@fortawesome/pro-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';

import pointsActions from 'ducks/points/actions';
import mapSelectors from 'ducks/map/selectors';
import mapActions from 'ducks/map/actions';

const PointEditor = ({ isEdit, appStatus }) => {
  const dispatch = useDispatch();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );

  const mapLocation = useSelector(state => mapSelectors.getLocation(state));

  const initialLocation = isEdit
    ? `${activePoint.longitude}, ${activePoint.latitude}`
    : '';

  const initialState = isEdit
    ? activePoint
    : {
        date: '',
        time: '',
        longitude: '',
        latitude: '',
      };

  const [state, setState] = useState(initialState);

  const handleChange = (type, data) => {
    console.log(type, data);

    switch (type) {
      case 'latLng':
        setState({
          ...state,
          longitude: data.lng,
          latitude: data.lat,
        });
        dispatch(
          mapActions.updateLocation({
            longitude: data.lng,
            latitude: data.lat,
          }),
        );
        break;
      case 'date':
        setState({
          ...state,
          time: data,
        });
        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    const payload = {
      ...state,
      ...mapLocation,
    };

    dispatch(pointsActions.editPoint(payload));
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
        <LocationSearchInput
          handlePointChange={handleChange}
          defaultValue={initialLocation}
        />
        <span>or</span>
        <Button
          onClick={() => {
            dispatch(applicationActions.updateStatus('SELECT LOCATION'));
          }}
        >
          <FontAwesomeIcon icon={faCrosshairs} /> Select from Map
        </Button>
      </div>

      <div className={timeControls}>
        <DateInput
          handleChange={handleChange}
          displayValue={isEdit ? activePoint.time : new Date()}
        />
      </div>

      <Button onClick={handleSubmit} type="submit">
        Save Data
      </Button>
    </div>
  );
};

PointEditor.propTypes = {
  isEdit: PropTypes.bool,
  appStatus: PropTypes.string,
};

export default PointEditor;
