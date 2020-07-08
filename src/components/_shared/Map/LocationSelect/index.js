import React from 'react';
import { Popup } from 'react-map-gl';

import { useDispatch } from 'react-redux';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { popup, popupButton } from './locationSelect.module.scss';
import mapActions from 'ducks/map/actions';

const LocationSelect = ({ longitude, latitude, type, setPopupLocation }) => {
  const dispatch = useDispatch();

  return (
    <Popup
      tipSize={0}
      anchor="bottom"
      longitude={longitude}
      latitude={latitude}
      closeOnClick={false}
      closeButton={false}
      offsetTop={10}
      className={popup}
    >
      <div>
        <button
          className={popupButton}
          onClick={() => {
            dispatch(mapActions.setLocation({ longitude, latitude }));
            setPopupLocation(null);
          }}
        >
          <FontAwesomeIcon icon={faCheck} />
          Use Location
        </button>
      </div>
    </Popup>
  );
};

export default LocationSelect;
