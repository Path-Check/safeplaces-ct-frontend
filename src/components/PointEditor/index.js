import React, { useEffect } from 'react';
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

const PointEditor = ({ isEdit }) => {
  const dispatch = useDispatch();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );
  const initialLocation = isEdit
    ? `${activePoint?.longitude}, ${activePoint?.latitude}`
    : '';
  const addValidation =
    !selectedLocation?.latitude ||
    !selectedLocation?.longitude ||
    !selectedLocation?.from ||
    !selectedLocation?.to;
  const editValidation = !selectedLocation;
  const isDisabled = isEdit ? editValidation : addValidation;

  const returnEndTime = () => {
    let from = null;
    let duration = null;

    if (!activePoint || !activePoint.duration || !activePoint.time) {
      return null;
    }

    from = activePoint.time;
    duration = activePoint.duration;

    return moment(from).add(duration, 'minutes');
  };

  useEffect(() => {
    if (isEdit) {
      dispatch(
        mapActions.updateLocation({
          from: activePoint?.time,
          to: returnEndTime(),
        }),
      );
    }
  }, []);

  const handleChange = (type, data) => {
    console.log(selectedLocation);

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
        console.log(selectedLocation);
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
        time: selectedLocation.from || activePoint.time,
        duration: returnDuration(
          selectedLocation.from || activePoint.time,
          selectedLocation.to,
        ),
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
    const payload = generatePayload();

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
            type="dateFrom"
            id="dateFrom"
            label="From"
            maxDate={moment(selectedLocation?.to).toDate()}
            handleChange={handleChange}
            displayValue={isEdit ? selectedLocation?.to : null}
            selectedValue={selectedLocation?.from}
          />
        </div>

        <div className={timeControls}>
          <DateInput
            type="dateTo"
            id="dateTo"
            label="To"
            minDate={moment(selectedLocation?.from).toDate()}
            handleChange={handleChange}
            displayValue={isEdit ? selectedLocation?.from : null}
            selectedValue={selectedLocation?.to}
          />
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
