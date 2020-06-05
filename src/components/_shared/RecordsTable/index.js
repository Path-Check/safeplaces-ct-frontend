import React from 'react';

import PropTypes from 'prop-types';

import Modal from 'components/_global/Modal';
import { useDispatch } from 'react-redux';

import applicationActions from 'ducks/application/actions';
import RecordsTablePublishing from 'components/_shared/RecordsTable/RecordsTablePublishing';
import RecordsTableTrace from 'components/_shared/RecordsTable/RecordsTableTrace';

const RecordsTable = ({ isPublishing }) => {
  const dispatch = useDispatch();

  return (
    <Modal
      closeAction={() => dispatch(applicationActions.updateStatus('IDLE'))}
    >
      {isPublishing ? <RecordsTablePublishing /> : <RecordsTableTrace />}
    </Modal>
  );
};

RecordsTable.propTypes = {
  isPublishing: PropTypes.bool,
};

export default RecordsTable;
