import React, { useRef } from 'react';

import classNames from 'classnames';

import { Popup } from 'react-map-gl';

import {
  pointContextMenu,
  pointContextMenuBottom,
  pointContextMenuPublish,
} from './PointContextMenu.module.scss';

import { useSelector } from 'react-redux';
import applicationSelectors from 'ducks/application/selectors';

import { useOnClickOutside } from 'hooks/useOnClickOutside';
import PointContextMenuHeader from 'components/_shared/PointContextMenu/Header/Header';
import PointContextMenuBody from 'components/_shared/PointContextMenu/Body/Body';

const PointContextMenu = React.memo(({ bottom, closeAction, ...rest }) => {
  const containerRef = useRef();
  const { status: appStatus, mode } = useSelector(state => state.application);
  const isTrace = mode === 'trace';

  const handleClose = () => {
    closeAction();
  };

  useOnClickOutside(containerRef, () => handleClose());

  if (appStatus === 'EDIT POINT' || !rest.longitude || !rest.latitude) {
    return null;
  }

  const classes = classNames({
    [`${pointContextMenu}`]: true,
    [`${pointContextMenuBottom}`]: bottom,
    [`${pointContextMenuPublish}`]: !isTrace,
  });

  return (
    <Popup
      tipSize={0}
      anchor="bottom"
      longitude={rest.longitude}
      latitude={rest.latitude}
      closeOnClick={false}
      closeButton={false}
      offsetTop={0}
      className={classes}
    >
      <div ref={containerRef}>
        <PointContextMenuHeader {...rest} />
        {isTrace && (
          <PointContextMenuBody closeAction={closeAction} {...rest} />
        )}
      </div>
    </Popup>
  );
});

export default PointContextMenu;
