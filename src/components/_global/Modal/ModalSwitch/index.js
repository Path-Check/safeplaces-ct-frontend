import React from 'react';

import AddNewRecord from 'views/Trace/AddNewRecord';
import DeletePoints from 'views/Trace/DeletePoints';
import RecordsTable from 'components/_shared/RecordsTable';
import StageForPublishing from 'views/Trace/StageForPublishing';
import PublishData from 'views/Publish/PublishData';
import ForgotPassword from 'views/Authentication/ForgotPassword';

const ModalSwitch = ({ status, mode }) => {
  console.log(status);
  switch (status) {
    case 'CASE FETCHED':
      return <AddNewRecord />;
    case 'CASES ADDED':
      return <RecordsTable mode={mode} />;
    case 'DELETE POINTS':
      return <DeletePoints />;
    case 'STAGE CASE':
      return <StageForPublishing />;
    case 'SUBMIT FOR PUBLISHING':
      return <PublishData />;
    case 'FORGOT PASSWORD':
    case 'REQUEST PASSWORD LINK':
      return <ForgotPassword status={status} />;
    default:
      return null;
  }
};

export default ModalSwitch;
