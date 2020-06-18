import React, { useCallback, useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import Map from '../Map';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

const MapModal = ({ open, openMapModal, confirmBounds, regionCoordinates }) => {
  const node = useRef(null);

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        openMapModal(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [openMapModal]);

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
