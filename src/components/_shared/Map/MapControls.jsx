import React from 'react';

import { NavigationControl, ScaleControl } from 'react-map-gl';

import SatelliteToggle from 'components/_shared/Map/SatelliteToggle';

import styles from './styles.module.scss';

const MapControls = ({ setSatelliteView, satelliteView }) => {
  return (
    <>
      <ScaleControl maxWidth={100} unit={'metric'} />
      <div className={styles.controls}>
        <NavigationControl
          className={`${styles.mapCtrl}`}
          showCompass={false}
        />
        <SatelliteToggle
          setSatelliteView={setSatelliteView}
          satelliteView={satelliteView}
        />
      </div>
    </>
  );
};

export default MapControls;
