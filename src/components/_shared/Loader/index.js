import React from 'react';

import Modal from 'components/_global/Modal';

import { loader, loaderBody, loaderTitle, spinner } from './Loader.module.scss';
import applicationSelectors from 'ducks/application/selectors';
import { useSelector } from 'react-redux';

const Loader = ({ message = 'Application Busy' }) => {
  const status = useSelector(state => applicationSelectors.getStatus(state));

  if (status !== 'BUSY') {
    return null;
  }

  return (
    <Modal>
      <div className={loader}>
        <h3 className={loaderTitle}>{message}</h3>
        <div className={loaderBody}>
          <div className={spinner}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default Loader;
