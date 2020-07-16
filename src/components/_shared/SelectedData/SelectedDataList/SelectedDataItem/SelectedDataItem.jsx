import React from 'react';
import classNames from 'classnames';

import {
  selectedDataItem,
  selectedDataItemHighlighted,
} from './SelectedDataItem.module.scss';

import SelectedDataItemActions from './_parts/SelectedDataItemActions';
import SelectedDataItemInfo from './_parts/SelectedDataItemInfo';

const SelectedDataItem = React.memo(
  ({ id, isHighlighted, isTrace, style, ...rest }) => {
    const classes = classNames({
      [`${selectedDataItem}`]: true,
      [`${selectedDataItemHighlighted}`]: isHighlighted,
    });

    console.log('render item');
    return (
      <li className={classes} style={style}>
        <SelectedDataItemInfo id={id} {...rest} />
        {isHighlighted && isTrace && <SelectedDataItemActions id={id} />}
      </li>
    );
  },
);

export default SelectedDataItem;
