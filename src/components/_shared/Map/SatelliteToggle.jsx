import React from 'react';

import styles from './styles.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatellite, faGlobeAmericas } from '@fortawesome/pro-solid-svg-icons';

const SatelliteToggle = ({ setSatelliteView, satelliteView }) => (
  <button
    className={styles.viewToggle}
    onClick={() => setSatelliteView(!satelliteView)}
    title={`Enable ${!satelliteView ? 'Satellite' : 'Map'} View`}
  >
    <span>Enable {!satelliteView ? 'Satellite' : 'Map'} View</span>
    <FontAwesomeIcon icon={satelliteView ? faGlobeAmericas : faSatellite} />
  </button>
);

export default SatelliteToggle;
