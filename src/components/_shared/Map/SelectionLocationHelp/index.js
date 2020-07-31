import React from 'react';

import {
  selectionLocationHelp,
  selectionLocationHelpIn,
} from './SelectionLocationHelp.module.scss';

import classNames from 'classnames';
import { Transition } from 'react-transition-group';

const SelectionLocationHelp = ({ show }) => {
  return (
    <Transition
      in={show}
      appear
      timeout={{
        enter: 200,
        exit: 200,
      }}
      unmountOnExit
    >
      {transition => {
        const classes = classNames({
          [`${selectionLocationHelp}`]: true,
          [`${selectionLocationHelpIn}`]: transition === 'entered',
        });

        return (
          <div className={classes}>
            <p>
              Right click on a location in the map, and select “Use Location” to
              create a point.
            </p>
          </div>
        );
      }}
    </Transition>
  );
};

export default SelectionLocationHelp;
