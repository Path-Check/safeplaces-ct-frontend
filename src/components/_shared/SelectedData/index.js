import React, { useState } from 'react';

import SelectedDataItem from 'components/_shared/SelectedData/SelectedDataItem';

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
import SelectedDataContextMenu from 'components/_shared/SelectedData/SelectedDataContextMenu';
import { useSelector } from 'react-redux';
import recordsSelectors from 'ducks/record/selectors';

const SelectedDataList = ({ items, visible, total }) => {
  const [showContentMenu, setShowContentMenu] = useState(false);
  const record = useSelector(state => recordsSelectors.getRecord(state));

  return (
    <div className={selectedDataWrapper}>
      <div className={selectedDataHeader}>
        <h5>Selected Data</h5>
        <div className={selectedDataHeaderInfo}>
          {record.points && (
            <p className={selectedDataSelection}>
              {visible} of {total}
            </p>
          )}
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
      {items?.length > 0 && (
        <ul className={selectedDataList}>
          {items.map(i => (
            <SelectedDataItem {...i} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedDataList;
