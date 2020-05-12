import React from 'react';
import Select, { components } from 'react-select';
import styles from './styles.module.scss';
import { showCases, createCase, showCurrentCase } from '../../ducks/cases';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/pro-regular-svg-icons';

import { useParams } from 'react-router';

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
  const patients = useSelector(state => showCases(state));
  const history = useHistory();
  const params = useParams();
  const dispatch = useDispatch();

  const options = Object.entries(patients).map(e => {
    return { value: e[0], label: e[1].name };
  });

  const currentCase = useSelector(state =>
    showCurrentCase(state, params.patient),
  );

  const formatedCurrentCase = currentCase
    ? { value: currentCase.id, label: currentCase.name }
    : undefined;

  // options.unshift({ value: 'all', label: 'all cases' });
  options.push({ value: 'new', label: 'add new case' });
  return (
    <Select
      className={styles.select}
      options={options}
      styles={customStyles}
      defaultValue={formatedCurrentCase}
      components={{ SingleValue, Option }}
      onChange={e => {
        var id = e.value;
        if (id === 'new') {
          id = dispatch(createCase()).id;
        }
        console.log(id);
        history.push(`/${id}`);
      }}
    />
  );
}
