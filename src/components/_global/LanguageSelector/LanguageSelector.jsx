import React from 'react';
import contentActions from 'ducks/content/actions';
import { useDispatch, useSelector } from 'react-redux';

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const activeLanguage = useSelector(state => state.content.language);

  return (
    <ul>
      <li>
        <button
          onClick={() => dispatch(contentActions.setLanguage('es'))}
          disabled={activeLanguage === 'es'}
        >
          Espanol
        </button>
      </li>
      <li>
        <button
          onClick={() => dispatch(contentActions.setLanguage('en'))}
          disabled={activeLanguage === 'en'}
        >
          English
        </button>
      </li>
    </ul>
  );
};

export default LanguageSelector;
