import React, { useRef } from 'react';

import classNames from 'classnames';

import {
  pointContextMenu,
  pointContextMenuBottom,
  pointContextMenuPublish,
} from './PointContextMenu.module.scss';

import { useDispatch, useSelector } from 'react-redux';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';
import applicationSelectors from 'ducks/application/selectors';

import { useOnClickOutside } from 'hooks/useOnClickOutside';
import PointContextMenuHeader from 'components/_shared/PointContextMenu/Header/Header';
import PointContextMenuBody from 'components/_shared/PointContextMenu/Body/Body';

const PointContextMenu = ({ bottom, closeAction, ...rest }) => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const isTrace =
    useSelector(state => applicationSelectors.getMode(state)) === 'trace';

  const handleClose = () => {
    closeAction();
    dispatch(applicationActions.updateStatus(''));
    dispatch(pointsActions.setSelectedPoint(null));
  };

  useOnClickOutside(containerRef, () => handleClose());

  if (appStatus === 'EDIT POINT') {
    return null;
  }

  const classes = classNames({
    [`${pointContextMenu}`]: true,
    [`${pointContextMenuBottom}`]: bottom,
    [`${pointContextMenuPublish}`]: !isTrace,
  });

  return (
    <div className={classes} ref={containerRef}>
      <PointContextMenuHeader {...rest} />
      {isTrace && <PointContextMenuBody {...rest} />}
    </div>
  );
};

export default PointContextMenu;
