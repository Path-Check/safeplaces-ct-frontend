import React, { useState } from 'react';

import { pointContextMenuOption } from '../PointContextMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faChevronRight,
  faTag,
} from '@fortawesome/pro-solid-svg-icons';
import { useDispatch } from 'react-redux';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';

import LabelAs from 'components/_shared/PointContextMenu/LabelAs';

const PointContextMenuBody = ({
  id,
  discreetPointIds,
  closeAction,
  time: timestamp,
  duration,
  latitude,
  longitude,
  nickname,
  renderDateTime = true,
  bottom,
  ...rest
}) => {
  const dispatch = useDispatch();
  const [showLabelAs, setShowLabelAs] = useState(false);
  const parseDiscreetPointIds = JSON.parse(discreetPointIds);

  return (
    <ul>
      <li className={pointContextMenuOption}>
        <button type="button" onClick={() => setShowLabelAs(true)}>
          <FontAwesomeIcon icon={faTag} />
          Label as location <FontAwesomeIcon icon={faChevronRight} />
        </button>
        {showLabelAs && (
          <LabelAs
            currentNickname={nickname}
            points={parseDiscreetPointIds}
            closeCallback={() => closeAction()}
          />
        )}
      </li>

      <li className={pointContextMenuOption}>
        <button
          type="button"
          onClick={() => {
            dispatch(
              pointsActions.setSelectedPoint({
                id,
                pointId: id,
                time: timestamp,
                discreetPointIds: parseDiscreetPointIds,
                duration,
                latitude,
                longitude,
                ...rest,
              }),
            );
            dispatch(applicationActions.updateStatus('EDIT POINT'));
          }}
        >
          <FontAwesomeIcon icon={faEdit} />
          Edit Location
        </button>
      </li>

      <li className={pointContextMenuOption}>
        <button
          type="button"
          onClick={() =>
            dispatch(pointsActions.deletePoint({ id, discreetPointIds }))
          }
        >
          <FontAwesomeIcon icon={faTrash} />
          Delete Location
        </button>
      </li>
    </ul>
  );
};

export default PointContextMenuBody;
