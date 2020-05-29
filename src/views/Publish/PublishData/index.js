import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  PublishDataHeader,
  PublishDataCode,
  PublishDataActions,
  PublishDataTitle,
  PublishDataNotice,
} from './PublishData.module.scss';

import Button from 'components/_shared/Button';

const PublishData = ({ dataPoints, subscriberCount }) => {
  return (
    <Modal>
      <Dialog width="650px">
        <header className={PublishDataHeader}>
          <h3 className={PublishDataTitle}>Publish Data to Subscribers</h3>
          <p>
            Data published will anonymously be shared with your subscribers and
            notify them if they’ve potentially be in contact with patients who
            have tested positive for COVID-19.
          </p>
          <p className={PublishDataNotice}>
            Are you sure you want to publish {dataPoints} data points to your{' '}
            {subscriberCount} subscribers?
          </p>
        </header>
        <div className={PublishDataActions}>
          <Button large onClick={() => console.log('Publish')}>
            Yes, Publish
          </Button>
          <Button large secondary onClick={() => console.log('Cancel')}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

PublishData.propTypes = {
  dataPoints: PropTypes.number,
  subscriberCount: PropTypes.number,
};

export default PublishData;
