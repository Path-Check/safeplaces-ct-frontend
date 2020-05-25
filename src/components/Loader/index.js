import React from 'react';

import Modal from 'components/Modals';

import { loader, loaderBody, loaderTitle, spinner } from './Loader.module.scss';

const Loader = ({ message = 'Application Busy' }) => {
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
