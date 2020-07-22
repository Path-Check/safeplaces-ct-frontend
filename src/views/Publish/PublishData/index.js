import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  PublishDataHeader,
  PublishDataField,
  PublishDataActions,
  PublishDataTitle,
} from './PublishData.module.scss';

import Button from 'components/_shared/Button';
import authSelectors from 'ducks/auth/selectors';
import { useSelector, useDispatch } from 'react-redux';
import applicationActions from 'ducks/application/actions';
import casesActions from 'ducks/cases/actions';

const PublishData = ({ dataPoints, subscriberCount }) => {
  const dispatch = useDispatch();
  const apiEndpoint = useSelector(state => authSelectors.getApiEndpoint(state));

  return (
    <Modal
      closeAction={() => dispatch(applicationActions.updateStatus('IDLE'))}
    >
      <Dialog width="650px">
        <header className={PublishDataHeader}>
          <h3 className={PublishDataTitle}>Submit Data For Publishing</h3>
          <p>
            This data will be downloaded to your API endpoint that was
            previously configured as a JSON file. You can see the status of that
            endpoint below. In order for Safe Paths subscribers of your health
            authority to get exposure notifications, you will need to deploy
            this file to a publishing server.
          </p>
        </header>
        <div className={PublishDataField}>{apiEndpoint}</div>
        <div className={PublishDataActions}>
          <Button
            id="publish-data"
            large
            onClick={() => dispatch(casesActions.publishCases())}
          >
            Submit All Data For Publishing
          </Button>
          <Button
            large
            secondary
            onClick={() => dispatch(applicationActions.updateStatus('IDLE'))}
          >
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
