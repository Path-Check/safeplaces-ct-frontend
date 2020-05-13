import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useParams } from 'react-router';
import cases, { getCasesArray, showCurrentCase } from 'ducks/cases';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '@wfp/ui';
import { v4 } from 'uuid';
import { getCurrentPath } from 'selectors';

export default function Wrapper({ children, editor, sidebar }) {
  const params = useParams();
  const dispatch = useDispatch();

  const history = useHistory();

  const currentPath = useSelector(getCurrentPath);
  const casesList = useSelector(getCasesArray);
  const [currentCaseId, setCurrentCaseId] = useState();

  const currentCase = useSelector(state =>
    showCurrentCase(state, params.patient),
  );

  useEffect(() => {
    dispatch(cases.actions.setCurrentCase(params.patient));
  }, [params.patient]);

  const newCase = () => {
    const id = v4();
    dispatch(cases.actions.create(id));
    console.log(id);
    history.push(`/${id}`);
  };

  return (
    <div
      className={`${styles.wrapper} ${
        params.page === 'edit' ? styles.wrapperEdit : ''
      }`}
    >
      <div className={styles.sidebar}>{sidebar}</div>
      <div className={styles.editor}>{editor}</div>
      <div className={styles.content}>{children}</div>
    </div>
  );
}
