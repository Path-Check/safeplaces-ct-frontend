import React from 'react';

import { selectedDataWrapper } from './SelectedData.module.scss';

import SelectedDataList from 'components/_shared/SelectedData/SelectedDataList/SelectedDataList';

const SelectedData = () => {
  // This is not longer used but im leaving it for the .stories
  return (
    <div className={selectedDataWrapper}>
      <SelectedDataList />
    </div>
  );
};

export default SelectedData;
