import React, { useEffect } from 'react';
import Select, { components } from 'react-select';
import styles from './styles.module.scss';

import cases, { getCases, showCurrentCase } from '../../ducks/cases';

import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';

import { useParams } from 'react-router';
import { getCurrentPath } from 'selectors';
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
  const path = useSelector(state => getCurrentPath(state));
  const history = useHistory();
  const dispatch = useDispatch();

  const options = Object.entries(currentCases).map(e => {
    return { value: e[0], label: e[1].name };
  });

  const formatedCurrentCase = path
    ? { value: path.id, label: path.name }
    : undefined;

  options.push({ value: 'new', label: 'add new case' });
  return (
    <Select
      options={options}
      className={styles.select}
      classNamePrefix="react-select"
      styles={customStyles}
      value={formatedCurrentCase}
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
