import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { notificationWrapper } from './Notification.module.scss';
import applicationSelectors from 'ducks/application/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/pro-solid-svg-icons';
import applicationActions from 'ducks/application/actions';

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.minimal.css';

const Notifications = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state =>
    applicationSelectors.getNotification(state),
  );

  useEffect(() => {
    console.log(notification);

    if (notification) {
      toast(`${notification.title} ${notification.text}`, {
        className: notificationWrapper,
        onClose: () => dispatch(applicationActions.removeNotification()),
      });
    }
  }, [notification]);

  return (
    <ToastContainer
      position="bottom-right"
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick
      closeButton={CloseNotification}
    />
  );
};

export const CloseNotification = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(applicationActions.removeNotification());
      }}
    >
      <FontAwesomeIcon icon={faTimes} />
    </button>
  );
};

export default Notifications;
