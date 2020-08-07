import React from 'react';

import {
  StageForPublishingHeader,
  StageForPublishingActions,
  StageForPublishingTitle,
  StageForPublishingNotice,
} from './StageForPublishing.module.scss';

import Button from 'components/_shared/Button';
import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';
import applicationActions from 'ducks/application/actions';
import { useDispatch } from 'react-redux';
import casesActions from 'ducks/cases/actions';
import { applicationStates } from 'types/applicationStates';

const StageForPublishing = () => {
  const dispatch = useDispatch();

  return (
    <Modal
      closeAction={() =>
        dispatch(applicationActions.updateStatus(applicationStates.IDLE))
      }
    >
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
            id="yes-consent"
            large
            onClick={() => dispatch(casesActions.stageCase())}
          >
            Yes, I received consent
          </Button>
          <Button
            id="no-consent"
            large
            secondary
            onClick={() =>
              dispatch(applicationActions.updateStatus(applicationStates.IDLE))
            }
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
