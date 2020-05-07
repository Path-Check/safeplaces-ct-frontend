import React from 'react';
import { connect } from 'react-redux';
import { Popup } from 'react-map-gl';
import styles from './styles.module.scss';

import moment from 'moment';
import { addSelected } from '../../ducks/selectedPathEntry';
import { getSelectedPathEntryDataData } from '../../selectors';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux/lib/hooks/useDispatch';

export default function PopupWrapper() {
  const selectedPathEntryData = useSelector(getSelectedPathEntryDataData);
  const dispatch = useDispatch();
  if (selectedPathEntryData && selectedPathEntryData.length === 1) {
    return (
      <Popup
        tipSize={8}
        anchor="bottom"
        longitude={selectedPathEntryData[0][1].longitude}
        latitude={selectedPathEntryData[0][1].latitude}
        closeOnClick={false}
        closeButton={false}
        offsetTop={-10}
        onClose={() => dispatch(addSelected([]))}
      >
        <div className={styles.popup}>
          <h3 className={styles.title}>
            {moment.utc(selectedPathEntryData[0][1].time).format('YYYY-MM-DD')}
          </h3>
          <p className={styles.time}>
            {moment.utc(selectedPathEntryData[0][1].time).format('HH:mm:ss')}
          </p>
        </div>
      </Popup>
    );
  }

  return null;
}
