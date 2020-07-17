import React from 'react';

import { NavigationControl, ScaleControl } from 'react-map-gl';

import SatelliteToggle from 'components/_shared/Map/SatelliteToggle';

import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarked } from '@fortawesome/pro-solid-svg-icons';

const MapControls = ({ setSatelliteView, satelliteView, resetToBounds }) => {
  return (
    <>
      <ScaleControl maxWidth={100} unit={'metric'} />
      <div className={styles.controls}>
        <NavigationControl className={styles.mapCtrl} showCompass={false} />
        <SatelliteToggle
          setSatelliteView={setSatelliteView}
          satelliteView={satelliteView}
        />
        <button
          className={styles.viewToggle}
          showCompass={false}
          onClick={resetToBounds}
        >
          <span>Show all Points</span>
          <FontAwesomeIcon icon={faMapMarked} />
        </button>
      </div>
    </>
  );
};

export default MapControls;
