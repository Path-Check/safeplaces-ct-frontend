import React from 'react';
import { connect } from 'react-redux';
import { Popup } from 'react-map-gl';
import styles from './styles.module.scss';

import moment from 'moment';
import { addSelected } from '../../ducks/selectedPathEntry';
import { getSelectedPathEntryDataData } from '../../selectors';

const PopupWrapper = ({ addSelectedTrigger, selectedPathEntryData }) => {
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
        onClose={() => addSelectedTrigger([])}
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
};

const mapStateToProps = state => {
  return {
    selectedPathEntryData: getSelectedPathEntryDataData(state),
  };
};

const mapDispatchToProps = dispatch => ({
  addSelectedTrigger: data => dispatch(addSelected(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PopupWrapper);
