import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import {
  StageForPublishingHeader,
  StageForPublishingCode,
  StageForPublishingActions,
  StageForPublishingTitle,
  StageForPublishingNotice,
} from './StageForPublishing.module.scss';

import Button from 'components/_shared/Button';
import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';
import applicationActions from 'ducks/application/actions';
import { useDispatch } from 'react-redux';

const StageForPublishing = () => {
  const dispatch = useDispatch();

  return (
    <Modal>
      <Dialog width="650px">
        <header className={StageForPublishingHeader}>
          <h3 className={StageForPublishingTitle}>Stage For Publishing</h3>
          <p>
            In order to stage this contact tracing data for publishing you’ll
            need to get explicit consent from the patient that they are OK with
            you publishing their anonymous data to help other members of their
            community understand if they may have been exposed.
          </p>
          <p className={StageForPublishingNotice}>
            Did you receive explicit verbal consent from the patient that they
            are OK with you publishing their anonymous data?
          </p>
        </header>
        <div className={StageForPublishingActions}>
          <Button large onClick={() => console.log('Pubish')}>
            Yes, I received consent
          </Button>
          <Button
            large
            secondary
            onClick={() => dispatch(applicationActions.updateStatus('IDLE'))}
          >
            No, I did not receive consent
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

StageForPublishing.propTypes = {};

export default StageForPublishing;
