import React from 'react';
import { Popup } from 'react-map-gl';

import { useDispatch } from 'react-redux';
import { faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { popup, popupButton } from './Popup.module.scss';
import mapActions from 'ducks/map/actions';

export default function PopupWrapper({ longitude, latitude, type }) {
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
        {type === 'SELECT LOCATION' && (
          <button
            className={popupButton}
            onClick={() =>
              dispatch(mapActions.setLocation({ longitude, latitude }))
            }
          >
            <FontAwesomeIcon icon={faCheck} />
            Use Location
          </button>
        )}
      </div>
    </Popup>
  );
}
