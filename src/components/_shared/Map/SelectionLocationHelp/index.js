import React from 'react';

import { selectionLocationHelp } from './SelectionLocationHelp.module.scss';
import { useDispatch } from 'react-redux';

const SelectionLocationHelp = () => {
  const dispatch = useDispatch();

  return (
    <div className={selectionLocationHelp}>
      <p>Right click at that location and select “Use Location”</p>
    </div>
  );
};

export default SelectionLocationHelp;
