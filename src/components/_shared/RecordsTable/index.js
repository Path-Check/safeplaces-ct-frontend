import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/_global/Modal';
import { useDispatch, useSelector } from 'react-redux';

import applicationActions from 'ducks/application/actions';
import RecordsTablePublishing from 'components/_shared/RecordsTable/RecordsTablePublishing';
import RecordsTableTrace from 'components/_shared/RecordsTable/RecordsTableTrace';
import FocusTrap from 'focus-trap-react';
import applicationSelectors from 'ducks/application/selectors';

const RecordsTable = () => {
  const dispatch = useDispatch();
  const isPublishing =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';

  return (
    <FocusTrap>
      <div>
        <Modal
          closeAction={() => dispatch(applicationActions.updateStatus('IDLE'))}
        >
          {isPublishing ? <RecordsTablePublishing /> : <RecordsTableTrace />}
        </Modal>
      </div>
    </FocusTrap>
  );
};

RecordsTable.propTypes = {
  isPublishing: PropTypes.bool,
};

export default RecordsTable;
