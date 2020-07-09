import React from 'react';

import { selectionLocationHelp } from './SelectionLocationHelp.module.scss';
import { useDispatch } from 'react-redux';

const SelectionLocationHelp = () => {
  const dispatch = useDispatch();

  return (
    <div className={selectionLocationHelp}>
      <p>
        Right click on a location in the map, and select “Use Location” to
        create a point.
      </p>
    </div>
  );
};

export default SelectionLocationHelp;
