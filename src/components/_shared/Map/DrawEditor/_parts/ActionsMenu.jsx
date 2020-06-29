import React, { useState } from 'react';

import { editorNavControls } from '../DrawEditor.module.scss';

import Button from 'components/_shared/Button';

import { faTrash, faTag, faFilter } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import pointsActions from 'ducks/points/actions';
import LabelAs from 'components/_shared/PointContextMenu/LabelAs';
import DeletePoints from 'views/Trace/DeletePoints';

const returnActions = (amount, filterAction, closeAction, labelAction) => [
  // {
  //   label: `Filter Selection`,
  //   icon: faFilter,
  //   action: filterAction,
  // },
  {
    label: `Label ${amount}
  Points`,
    type: 'label',
    icon: faTag,
    action: labelAction,
  },
  {
    label: `Delete ${amount}
  Points`,
    icon: faTrash,
    action: closeAction,
  },
];

const ActionsMenu = ({ newPoints, geometry, handleDelete, resetGeometry }) => {
  const dispatch = useDispatch();
  const [showLabelAs, setShowLabelAs] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const pointIds = newPoints.map(p => p.pointId);

  return (
    <>
      <ul className={editorNavControls}>
        {returnActions(
          newPoints.length,
          () => {
            dispatch(pointsActions.setGeometry(geometry));
            resetGeometry(true);
          },
          () => setShowDeleteModal(true),
          () => setShowLabelAs(!showLabelAs),
        ).map(({ label, icon, action, type }) => (
          <li>
            <Button tertiary onClick={() => action()}>
              <FontAwesomeIcon icon={icon} /> {label}
            </Button>

            {showLabelAs && type === 'label' && (
              <LabelAs
                closeCallback={() => resetGeometry(true)}
                points={pointIds}
              />
            )}
          </li>
        ))}
        <li>
          <Button primary onClick={() => handleDelete()}>
            Clear Selection
          </Button>
        </li>
      </ul>
      {showDeleteModal && (
        <DeletePoints
          closeAction={() => setShowDeleteModal(false)}
          deleteAction={() =>
            dispatch(pointsActions.deleteMultiplePoints(newPoints))
          }
          points={newPoints}
        />
      )}
    </>
  );
};

export default ActionsMenu;
