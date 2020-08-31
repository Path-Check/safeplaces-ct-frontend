import React, { useEffect, useState } from 'react';

import classNames from 'classnames';
import {
  newCasePopup,
  newCasePopupIn,
  bottomArrow,
} from './styles.module.scss';
import { Transition } from 'react-transition-group';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import tooltipsActions from '../../../ducks/tooltips/actions';
import tooltipsSelectors from '../../../ducks/tooltips/selectors';

const Tooltip = ({ text, tooltip, top }) => {
  const dispatch = useDispatch();
  const activeTooltip = useSelector(tooltipsSelectors.getActiveTooltip);
  const [show, setShow] = useState(activeTooltip === tooltip);

  const hideTooltip = () => {
    dispatch(tooltipsActions.setActiveTooltip(tooltip + 1));
    setShow(false);
  };

  useEffect(() => {
    if (activeTooltip === tooltip) {
      setShow(true);
    }
  }, [activeTooltip]);

  return (
    <Transition
      in={show}
      appear
      timeout={{ enter: 200, exit: 200 }}
      unmountOnExit
    >
      {transition => {
        const classes = classNames({
          [`${newCasePopup}`]: true,
          [`${newCasePopupIn}`]: transition === 'entered',
          [`${bottomArrow}`]: activeTooltip === 4,
        });

        return (
          <div className={classes} style={top && { top }}>
            <p>{text}</p>
            <Button unstyled onClick={hideTooltip}>
              Got it
            </Button>
          </div>
        );
      }}
    </Transition>
  );
};

export default Tooltip;
