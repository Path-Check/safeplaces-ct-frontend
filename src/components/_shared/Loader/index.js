import React from 'react';
import applicationSelectors from 'ducks/application/selectors';
import { useSelector } from 'react-redux';
import NProgress from '../../_global/NProgress';
import { applicationStates } from 'types/applicationStates';

const Loader = () => {
  const status = useSelector(state => applicationSelectors.getStatus(state));

  if (status !== applicationStates.BUSY) {
    return null;
  }

  return <NProgress isAnimating={true} />;
};

export default Loader;
