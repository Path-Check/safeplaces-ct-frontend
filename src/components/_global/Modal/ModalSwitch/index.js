import React from 'react';

import { applicationStates } from 'types/applicationStates';

import AddNewRecord from 'views/Trace/AddNewRecord';
import DeletePoints from 'views/Trace/DeletePoints';
import RecordsTable from 'components/_shared/RecordsTable';
import StageForPublishing from 'views/Trace/StageForPublishing';
import PublishData from 'views/Publish/PublishData';
import ForgotPassword from 'views/Authentication/ForgotPassword';

const ModalSwitch = ({ status, mode }) => {
  console.log(status);
  switch (status) {
    case applicationStates.CASE_FETCHED:
      return <AddNewRecord />;
    case applicationStates.CASES_ADDED:
      return <RecordsTable mode={mode} />;
    case applicationStates.DELETE_POINTS:
      return <DeletePoints />;
    case applicationStates.STAGE_CASE:
      return <StageForPublishing />;
    case applicationStates.SUBMIT_FOR_PUBLISHING:
      return <PublishData />;
    case applicationStates.FORGOT_PASSWORD:
    case applicationStates.REQUEST_PASSWORD_LINK:
      return <ForgotPassword status={status} />;
    default:
      return null;
  }
};

export default ModalSwitch;
