import React, { useState } from 'react';

import SelectedDataItem from 'components/SelectedData/SelectedDataItem';

import {
  selectedDataWrapper,
  selectedDataHeader,
  selectedDataHeaderInfo,
  selectedDataList,
  selectedDataAction,
  selectedDataSelection,
} from './SelectedData.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import SelectedDataContextMenu from 'components/SelectedData/SelectedDataContextMenu';

const SelectedDataList = ({ items, visible, total }) => {
  const [showContentMenu, setShowContentMenu] = useState(false);

  return (
    <div className={selectedDataWrapper}>
      <div className={selectedDataHeader}>
        <h5>Selected Data</h5>
        <div className={selectedDataHeaderInfo}>
          <p className={selectedDataSelection}>
            {visible} of {total}
          </p>
          <button
            className={selectedDataAction}
            onClick={() => setShowContentMenu(!showContentMenu)}
            type="button"
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        </div>

        {showContentMenu && (
          <SelectedDataContextMenu
            closeAction={() => setShowContentMenu(false)}
          />
        )}
      </div>
      <ul className={selectedDataList}>
        {items.map(i => (
          <SelectedDataItem {...i} />
        ))}
      </ul>
    </div>
  );
};

export default SelectedDataList;
