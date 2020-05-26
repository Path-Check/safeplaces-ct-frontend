import React, { useEffect } from 'react';
import { useToasts } from 'react-toast-notifications';
import { useSelector, useDispatch } from 'react-redux';

import { notification } from './Notification.module.scss';
import applicationSelectors from 'ducks/application/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/pro-solid-svg-icons';
import applicationActions from 'ducks/application/actions';

const Notifications = () => {
  const { addToast } = useToasts();
  const notification = useSelector(state =>
    applicationSelectors.getNotification(state),
  );

  useEffect(() => {
    console.log(notification);
    if (notification && notification.title) {
      addToast(notification.title, { appearance: 'error' });
    }
  }, [addToast, notification]);

  return <></>;
};

export const Notification = ({ appearance, children, ...props }) => {
  const dispatch = useDispatch();

  return (
    <div className={notification}>
      <FontAwesomeIcon icon={faInfoCircle} />
      {children}
      <button
        onClick={() => {
          dispatch(applicationActions.removeNotification());
          props.onDismiss();
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
    </div>
  );
};

export default Notifications;
