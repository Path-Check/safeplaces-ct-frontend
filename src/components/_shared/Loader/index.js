import React from 'react';
import applicationSelectors from 'ducks/application/selectors';
import { useSelector } from 'react-redux';
import NProgress from '../../_global/NProgress';

const Loader = () => {
  const status = useSelector(state => applicationSelectors.getStatus(state));

  if (status !== 'BUSY') {
    return null;
  }

  return <NProgress isAnimating={true} />;
};

export default Loader;
