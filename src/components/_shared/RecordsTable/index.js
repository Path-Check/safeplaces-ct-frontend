import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/_global/Modal';
import { useDispatch, useSelector } from 'react-redux';

import applicationActions from 'ducks/application/actions';
import RecordsTablePublishing from 'components/_shared/RecordsTable/RecordsTablePublishing';
import RecordsTableTrace from 'components/_shared/RecordsTable/RecordsTableTrace';
import { applicationStates } from 'types/applicationStates';

const RecordsTable = ({ mode }) => {
  const dispatch = useDispatch();
  const isPublishing = mode === 'publish';

  return (
    <div>
      <Modal
        closeAction={() =>
          dispatch(applicationActions.updateStatus(applicationStates.IDLE))
        }
      >
        {isPublishing ? <RecordsTablePublishing /> : <RecordsTableTrace />}
      </Modal>
    </div>
  );
};

RecordsTable.propTypes = {
  isPublishing: PropTypes.bool,
};

export default RecordsTable;
