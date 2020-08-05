import React from 'react';
import contentActions from 'ducks/content/actions';
import { useDispatch } from 'react-redux';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(contentActions.setLanguage('es'))}>
        Espanol
      </button>
    </div>
  );
};

export default LanguageSelector;
