import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import path from '../../ducks/path';

import { addSelected } from '../../ducks/selectedPoints';
import { getselectedPointsData, getFilteredTrackPath } from '../../selectors';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerQuestion } from '@fortawesome/pro-solid-svg-icons';
import Empty from '../Empty';
import SidebarPathEntry from './SidebarPathEntry';

export default function SidebarPathList() {
  const filteredTrackPath = useSelector(state => getFilteredTrackPath(state));
  // const removePathEntryTrigger = data => dispatch(removePathEntry(data));

  return (
    <>
      {!filteredTrackPath && (
        <Empty
          title="No file opened"
          className="attendance-detail-empt"
          kind="large"
          icon={<FontAwesomeIcon icon={faMapMarkerQuestion} size="1x" />}
        >
          Please open a file
        </Empty>
      )}
      {filteredTrackPath &&
        filteredTrackPath.map((e, i) => <SidebarPathEntry entry={e} key={i} />)}
    </>
  );
}
