import React from 'react';

import styles from './styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faSatellite } from '@fortawesome/pro-solid-svg-icons';

const SatelliteToggle = ({ setSatelliteView, satelliteView }) => (
  <button
    className={styles.viewToggle}
    onClick={() => setSatelliteView(!satelliteView)}
    title={`Enable ${!satelliteView ? 'Satellite' : 'Map'} View`}
  >
    <FontAwesomeIcon icon={satelliteView ? faMap : faSatellite} />
  </button>
);

export default SatelliteToggle;
