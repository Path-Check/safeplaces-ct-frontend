import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { useSelector, useDispatch } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';

import pointsActions from 'ducks/points/actions';
import mapSelectors from 'ducks/map/selectors';
import mapActions from 'ducks/map/actions';

import {
  convertToHoursMins,
  convertToMins,
  canSubmit,
  validateTimeDuration,
  returnMaxTime,
  returnMinTime,
} from 'components/PointEditor/_helpers';

import {
  pointEditor,
  locationControls,
  pointEditorHeader,
  closeAction,
  timeControls,
  durationControls,
  durationControl,
} from './PointEditor.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCrosshairs, faTimes } from '@fortawesome/pro-solid-svg-icons';

import Button from 'components/_shared/Button';
import DateInput from 'components/_shared/DateInput';
import LocationSearchInput from 'components/_shared/LocationSearch';
import TextInput from '@wfp/ui/lib/components/TextInput';

const PointEditor = ({ isEdit }) => {
  const dispatch = useDispatch();
  const now = new Date();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );
  const initialLocation = isEdit
    ? `${activePoint?.latitude}, ${activePoint?.longitude}`
    : '';

  const [localDuration, setLocalDuration] = useState([0, 0]);
  const isDisabled = isEdit ? !selectedLocation : canSubmit(selectedLocation);

  useEffect(() => {
    if (!isEdit) {
      return;
    }

    if (!activePoint) {
      console.error('no active point');
      return;
    }

    const [hours, mins] = convertToHoursMins(activePoint);
    setLocalDuration([hours, mins]);
  }, []);

  useEffect(() => {
    dispatch(
      mapActions.updateLocation({
        ...selectedLocation,
        duration: convertToMins(localDuration),
      }),
    );
  }, [localDuration]);

  const handleChange = (type, value) => {
    if (type === 'latLng') {
      dispatch(
        mapActions.updateLocation({
          ...selectedLocation,
          longitude: value.lng,
          latitude: value.lat,
        }),
      );
    } else {
      dispatch(
        mapActions.updateLocation({
          ...selectedLocation,
          time: value,
        }),
      );
    }
  };

  const handleDuration = e => {
    const target = e.target;

    if (target.name === 'durationHours') {
      setLocalDuration([parseInt(e.target.value, 10), localDuration[1]]);
    } else {
      setLocalDuration([localDuration[0], parseInt(e.target.value, 10)]);
    }
  };

  const generatePayload = () => {
    if (isEdit) {
      return {
        ...activePoint,
        ...selectedLocation,
        duration: convertToMins(localDuration),
      };
    } else {
      return {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        time: selectedLocation.time,
        duration: convertToMins(localDuration),
      };
    }
  };

  const handleSubmit = () => {
    const payload = generatePayload();
    const validDuration = validateTimeDuration(selectedLocation);

    if (isEdit) {
      dispatch(pointsActions.editPoint(payload));
    } else {
      dispatch(pointsActions.addPoint(payload));
    }
  };

  const handleClose = () => {
    dispatch(applicationActions.updateStatus(''));
    dispatch(pointsActions.setSelectedPoint(null));
    dispatch(mapActions.updateLocation(null));
  };

  return (
    <>
      <form className={pointEditor} onSubmit={handleSubmit}>
        <div className={pointEditorHeader}>
          <h4>{isEdit ? 'Edit Data' : 'Add Data to Record'}</h4>
          <button className={closeAction} onClick={handleClose}>
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
            fullWidth
            secondary
            onClick={() => {
              dispatch(mapActions.locationSelect(true));
            }}
          >
            <FontAwesomeIcon icon={faCrosshairs} /> Select from Map
          </Button>
        </div>
        <div className={timeControls}>
          <DateInput
            type="time"
            id="time"
            label="Date - Time"
            minDate={new Date('2019-12-31T12:05:00-05:00')}
            maxDate={now}
            minTime={returnMinTime()}
            maxTime={returnMaxTime(selectedLocation?.time)}
            handleChange={handleChange}
            displayValue={isEdit ? activePoint?.time : null}
            selectedValue={selectedLocation?.time}
            placeholder="01/01/2020 - 12:00AM"
          />
        </div>

        <div className={durationControls}>
          <h6>Duration</h6>
          <div className={durationControl}>
            <TextInput
              id="durationHours"
              name="durationHours"
              onChange={handleDuration}
              step="1"
              min="0"
              type="number"
              labelText=""
              value={localDuration[0]}
            />
            <label htmlFor="durationHours">Hours</label>
          </div>
          <div className={durationControl}>
            <TextInput
              id="durationMinutes"
              name="durationMinutes"
              onChange={handleDuration}
              step="5"
              min="0"
              max="55"
              type="number"
              labelText=""
              value={localDuration[1]}
            />
            <label htmlFor="durationMinutes">Minutes</label>
          </div>
        </div>
        <Button type="submit" fullWidth disabled={isDisabled}>
          Save Data
        </Button>
      </form>
    </>
  );
};

PointEditor.propTypes = {
  isEdit: PropTypes.bool,
};

export default PointEditor;
