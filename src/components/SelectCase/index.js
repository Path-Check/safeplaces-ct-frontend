import React, { useEffect } from 'react';
import Select, { components } from 'react-select';
import styles from './styles.module.scss';

import cases from '../../ducks/cases';
import { getCases, showCurrentCase } from '../../ducks/cases';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';

import { useParams } from 'react-router';
import path from 'ducks/path';
import { getPath } from 'ducks/path';
import { v4 } from 'uuid';

const SingleValue = ({ children, ...props }) => (
  <components.SingleValue {...props}>
    <h2 className={styles.title}>{children}</h2>
    <p className={styles.subTitle}>2020-04-11 23:03:25</p>
  </components.SingleValue>
);

const Option = props => {
  const { data } = props;
  if (data.value === 'all') {
    return (
      <components.Option {...props}>
        <h2 className={styles.title}>Patient overview</h2>
      </components.Option>
    );
  }
  if (data.value === 'new') {
    return (
      <components.Option {...props}>
        <h2 className={styles.title}>
          <FontAwesomeIcon icon={faPlusCircle} /> Add new case
        </h2>
      </components.Option>
    );
  }

  return (
    <components.Option {...props}>
      <div
        className={
          props.isSelected
            ? `${styles.optionWrapper} ${styles.optionWrapperSelected}`
            : styles.optionWrapper
        }
      >
        <div>
          <h2 className={styles.title}>{data.label}</h2>
          <p className={styles.subTitle}>Subtitle</p>
        </div>
      </div>
    </components.Option>
  );
};

const customStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
  }),
};

export default function SelectCase() {
  const currentCases = useSelector(getCases);
  const path = useSelector(state => getPath(state));
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const options = Object.entries(currentCases).map(e => {
    return { value: e[0], label: e[1].name };
  });

  const currentCase = useSelector(state =>
    showCurrentCase(state, params.patient),
  );

  const formatedCurrentCase = currentCase
    ? { value: currentCase.id, label: currentCase.name }
    : undefined;

  /*useEffect(() => {
    console.log('cases', cases);
    if (cases.actions) {
      dispatch(cases.actions.save({ id: params.patient, path }));
      dispatch(cases.actions.save({ id: params.patient, path }));
    }
    //path.actions.selectCase(currentCase);
  }, [cases, currentCase, params.patient]);*/

  //options.unshift({ value: 'all', label: 'all cases' });

  options.push({ value: 'new', label: 'add new case' });
  return (
    <Select
      options={options}
      className={styles.select}
      classNamePrefix="react-select"
      styles={customStyles}
      defaultValue={formatedCurrentCase}
      components={{ SingleValue, Option }}
      onChange={e => {
        var id = e.value;
        if (id === 'new') {
          id = v4();
          dispatch(cases.actions.create(id));
        }
        history.push(`/${id}`);
      }}
    />
  );
}
