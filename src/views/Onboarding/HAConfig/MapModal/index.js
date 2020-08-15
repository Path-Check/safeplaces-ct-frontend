import React, { useRef } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import Map from '../Map';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import { useCloseOnEscape } from 'hooks/useCloseOnEscape';

const MapModal = ({ open, openMapModal, confirmBounds, regionCoordinates }) => {
  const node = useRef(null);

  useCloseOnEscape(() => openMapModal(false));
  useOnClickOutside(node, () => openMapModal(false));

  return open ? (
    <div className={styles.modal} ref={node}>
      <div className={styles.modalContent}>
        <FontAwesomeIcon
          icon={faTimes}
          className={styles.closeIcon}
          onClick={() => openMapModal(false)}
        />
        <Map
          confirmBounds={confirmBounds}
          regionCoordinates={regionCoordinates}
        />
      </div>
    </div>
  ) : null;
};

export default MapModal;
