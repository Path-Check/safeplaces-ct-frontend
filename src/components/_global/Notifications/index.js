import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  notificationWrapper,
  notificationWrapperError,
} from './Notification.module.scss';
import applicationSelectors from 'ducks/application/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import applicationActions from 'ducks/application/actions';

import { toast, ToastContainer } from 'react-toastify';
import classNames from 'classnames';
import 'react-toastify/dist/ReactToastify.minimal.css';

const Notifications = () => {
  const dispatch = useDispatch();
  const notification = useSelector(state =>
    applicationSelectors.getNotification(state),
  );

  const classes = classNames({
    [`${notificationWrapper}`]: true,
    [`${notificationWrapperError}`]: true,
  });

  useEffect(() => {
    if (notification) {
      const { title = '', text = '', type = '' } = notification;
      const isError = type === 'error';
      const className = isError ? classes : notificationWrapper;

      toast(`${title} ${text}`, {
        className,
        onClose: () => dispatch(applicationActions.removeNotification()),
      });
    }
  }, [notification]);

  return (
    <ToastContainer
      position="bottom-right"
      hideProgressBar={true}
      newestOnTop={false}
      autoClose={2000}
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
