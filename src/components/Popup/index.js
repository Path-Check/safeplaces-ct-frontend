import React from 'react';
import { Popup } from 'react-map-gl';
import styles from './styles.module.scss';

import moment from 'moment';
import { addSelected } from '../../ducks/selectedPathEntry';
import { getSelectedPathEntryDataData } from '../../selectors';
import { useSelector, useDispatch } from 'react-redux';

export default function PopupWrapper() {
  const selectedPathEntryData = useSelector(getSelectedPathEntryDataData);
  console.log(selectedPathEntryData);
  const dispatch = useDispatch();
  if (selectedPathEntryData && selectedPathEntryData.length === 1) {
    return (
      <Popup
        tipSize={8}
        anchor="bottom"
        longitude={selectedPathEntryData.longitude}
        latitude={selectedPathEntryData.latitude}
        closeOnClick={false}
        closeButton={false}
        offsetTop={-10}
        onClose={() => dispatch(addSelected([]))}
      >
        <div className={styles.popup}>
          <h3 className={styles.title}>
            {moment.utc(selectedPathEntryData.time).format('YYYY-MM-DD')}
          </h3>
          <p className={styles.time}>
            {moment.utc(selectedPathEntryData.time).format('HH:mm:ss')}
          </p>
        </div>
      </Popup>
    );
  }

  return null;
}
