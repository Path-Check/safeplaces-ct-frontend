import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Modal from 'components/Modal';
import Dialog from 'components/Dialog';

import {
  StageForPublishingHeader,
  StageForPublishingCode,
  StageForPublishingActions,
  StageForPublishingTitle,
  StageForPublishingNotice,
} from './StageForPublishing.module.scss';

import Button from 'components/Button';

const StageForPublishing = () => {
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
          <Button
            large
            onClick={() => console.log('Pubish')}
            text="Yes, I received consent"
          />
          <Button
            large
            secondary
            onClick={() => console.log('Cancel')}
            text="No, I did not receive consent"
          />
        </div>
      </Dialog>
    </Modal>
  );
};

StageForPublishing.propTypes = {};

export default StageForPublishing;
