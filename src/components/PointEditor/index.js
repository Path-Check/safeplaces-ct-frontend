import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/_shared/Button';
import DateInput from 'components/_shared/DateInput';

import LocationSearchInput from 'components/_shared/LocationSearch';

import moment from 'moment';

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

const PointEditor = ({ isEdit }) => {
  const dispatch = useDispatch();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );

  const initialLocation = isEdit
    ? `${activePoint.longitude}, ${activePoint.latitude}`
    : '';

  const addValidation =
    !selectedLocation?.latitude ||
    !selectedLocation?.longitude ||
    !selectedLocation?.from ||
    !selectedLocation?.to;

  const editValidation = !selectedLocation;
  const isDisabled = isEdit ? editValidation : addValidation;

  const returnEndTime = () => {
    const from = activePoint.time;
    const duration = activePoint.duration;

    if (!duration) {
      return null;
    } else {
      return moment(from).add(duration, 'minutes');
    }
  };

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
      case 'dateFrom':
        dispatch(
          mapActions.updateLocation({
            ...selectedLocation,
            from: data,
          }),
        );
        break;
      case 'dateTo':
        dispatch(
          mapActions.updateLocation({
            ...selectedLocation,
            to: data,
          }),
        );
        break;

      default:
        break;
    }
  };

  const returnDuration = (from, to) => {
    const minutes = moment(to).diff(moment(from), 'minutes');

    if (!from || !to) {
      return null;
    }

    return minutes;
  };

  const generatePayload = () => {
    if (isEdit) {
      return {
        ...activePoint,
        ...selectedLocation,
        duration:
          returnDuration(selectedLocation.from, selectedLocation.to) ||
          activePoint.duration,
      };
    } else {
      return {
        latitude: selectedLocation.latitude,
        longitude: selectedLocation.longitude,
        time: selectedLocation.from,
        duration: returnDuration(selectedLocation.from, selectedLocation.to),
      };
    }
  };

  const handleSubmit = () => {
    dispatch(pointsActions.editPoint(generatePayload()));
  };

  const handleClose = () => {
    dispatch(applicationActions.updateStatus(''));
    dispatch(pointsActions.setSelectedPoint(null));
    dispatch(mapActions.updateLocation(null));
  };

  return (
    <>
      <form className={pointEditor} onClick={handleSubmit}>
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
            onClick={() => {
              dispatch(mapActions.locationSelect(true));
            }}
          >
            <FontAwesomeIcon icon={faCrosshairs} /> Select from Map
          </Button>
        </div>

        <div className={timeControls}>
          <DateInput
            type="dateFrom"
            id="dateFrom"
            to="From"
            handleChange={handleChange}
            displayValue={activePoint.time || null}
            selectedValue={selectedLocation?.from}
          />
        </div>
        <div className={timeControls}>
          <DateInput
            type="dateTo"
            id="dateTo"
            label="To"
            handleChange={handleChange}
            displayValue={returnEndTime()}
            selectedValue={selectedLocation?.to}
          />
        </div>

        <Button type="submit" disabled={isDisabled}>
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
