import React, { useState } from 'react';

import { pointContextMenuOption } from '../PointContextMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faChevronRight,
  faTag,
} from '@fortawesome/pro-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';
import applicationSelectors from 'ducks/application/selectors';

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
}) => {
  const dispatch = useDispatch();
  const [showLabelAs, setShowLabelAs] = useState(false);

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
            points={[discreetPointIds]}
            closeCallback={() => closeAction()}
          />
        )}
      </li>

      <li className={pointContextMenuOption}>
        <button
          type="button"
          onClick={() =>
            dispatch(applicationActions.updateStatus('EDIT POINT'))
          }
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
