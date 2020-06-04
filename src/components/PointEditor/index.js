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
import { faCrosshairs, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';

import pointsActions from 'ducks/points/actions';
import mapSelectors from 'ducks/map/selectors';
import mapActions from 'ducks/map/actions';
import applicationSelectors from 'ducks/application/selectors';

const PointEditor = () => {
  const dispatch = useDispatch();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const isEdit = appStatus === 'EDIT POINT';
  const isAdd = appStatus === 'ADD POINT';

  if (!isAdd && !isEdit) {
    return null;
  }

  const initialLocation = isEdit
    ? `${activePoint.longitude}, ${activePoint.latitude}`
    : '';

  const addValidation =
    !selectedLocation?.latitude ||
    !selectedLocation?.longitude ||
    !selectedLocation?.time;

  const editValidation = !selectedLocation;

  const isDisabled = isAdd ? addValidation : editValidation;

  const handleChange = (type, data) => {
    switch (type) {
      case 'latLng':
        dispatch(
          mapActions.updateLocation({
            ...selectedLocation,
            longitude: data.lng,
            latitude: data.lat,
          }),
        );
        break;
      case 'date':
        console.log(data);
        dispatch(
          mapActions.updateLocation({
            ...selectedLocation,
            time: data,
          }),
        );
        break;

      default:
        break;
    }
  };

  const handleSubmit = () => {
    const payload = {
      ...selectedLocation,
    };

    if (isEdit) {
      dispatch(pointsActions.editPoint(payload));
    } else {
      dispatch(pointsActions.addPoint(payload));
    }
  };

  return (
    <>
      <div className={pointEditor}>
        <div className={pointEditorHeader}>
          <h4>{isEdit ? 'Edit Data' : 'Add Data to Record'}</h4>
          <button
            className={closeAction}
            onClick={() => {
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
              dispatch(mapActions.locationSelect(true));
            }}
          >
            <FontAwesomeIcon icon={faCrosshairs} /> Select from Map
          </Button>
        </div>

        <div className={timeControls}>
          <DateInput
            handleChange={handleChange}
            displayValue={isEdit ? activePoint.time : null}
          />
        </div>

        <Button onClick={handleSubmit} type="submit" disabled={isDisabled}>
          Save Data
        </Button>
      </div>
    </>
  );
};

PointEditor.propTypes = {
  isEdit: PropTypes.bool,
  appStatus: PropTypes.string,
};

export default PointEditor;
