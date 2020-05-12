import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useParams, useHistory } from 'react-router';
import cases, { getCasesArray, showCurrentCase } from 'ducks/cases';
import { useSelector, useDispatch } from 'react-redux';
import path, { getPath } from 'ducks/path';

import { Button } from '@wfp/ui';
import { v4 } from 'uuid';

export default function Wrapper({ children, editor, sidebar }) {
  const params = useParams();
  const dispatch = useDispatch();

  const history = useHistory();

  const currentPath = useSelector(getPath);
  const casesList = useSelector(getCasesArray);
  const [currentCaseId, setCurrentCaseId] = useState();

  const currentCase = useSelector(state =>
    showCurrentCase(state, params.patient),
  );

  useEffect(() => {
    console.log('currentCase', currentCaseId, params.patient, currentCase);
    if (currentCaseId !== params.patient) {
      dispatch(cases.actions.save(currentPath));

      if (currentCase) dispatch(path.actions.load(currentCase));

      setCurrentCaseId(params.patient);
    }
  }, [currentCase, currentCaseId, currentPath, dispatch, params.patient]);

  const newCase = () => {
    const id = v4();
    dispatch(cases.actions.create(id));
    console.log(id);
    history.push(`/${id}`);
  };

  if (currentCase === undefined) {
    if (casesList && casesList[0]) history.push(`/${casesList[0].id}`);

    return (
      <div>
        Case does not exist
        <Button onClick={newCase}>Setup case</Button>
      </div>
    );
  }

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
