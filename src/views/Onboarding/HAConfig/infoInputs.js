import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import DaySlider from './DaySlider';
import styles from './styles.module.scss';
import Button from '../../../components/_shared/Button';
import { useSelector } from 'react-redux';
import authSelectors from 'ducks/auth/selectors';

const OpenMap = ({ toggleMap, boundariesSet, boundariesError }) => {
  const boundaries = useSelector(state => authSelectors.getBounds(state));

  return boundariesSet || boundaries ? (
    <div className={styles.boundariesSetContainer}>
      <FontAwesomeIcon icon={faCheckCircle} className={styles.checkCircle} />

      <h3 className={styles.boundariesSet}>GPS Boundaries set</h3>

      <Button
        width="347px"
        height="48px"
        className={styles.openMap}
        onClick={toggleMap}
      >
        Reset GPS Boundaries
      </Button>
    </div>
  ) : (
    <>
      <Button
        width="347px"
        height="48px"
        className={styles.openMap}
        onClick={toggleMap}
      >
        Open Map &amp; Select Region
      </Button>
      {boundariesError && (
        <p className={styles.boundariesError}>{boundariesError}</p>
      )}
    </>
  );
};

const DaySliderFunc = ({ handleChange, id, value }) => (
  <DaySlider id={id} handleChange={handleChange} value={value} />
);

const infoInputs = [
  {
    title: 'Your Health Authority name',
    subtitle: 'This name will be visible to the general public',
    placeholder: 'Puerto Rico Department of Public Health',
    key: 'name',
  },
  {
    title: 'Information Website',
    subtitle:
      'A website your users will reach to view local informations and alerts',
    placeholder: 'https://minorityhealth.hhs.gov',
    key: 'infoWebsiteUrl',
  },
  {
    title: 'Reference Website',
    subtitle:
      'A website you’ll use to tell at-risk users what they should do next',
    placeholder: 'https://minorityhealth.hhs.gov',
    key: 'referenceWebsiteUrl',
  },
  {
    title: 'API Endpoint',
    subtitle: 'Used to define where you want to load and publish your data',
    placeholder: 'https://api.example.com/safeplaces',
    key: 'apiEndpointUrl',
  },
  {
    title: 'Privacy Policy',
    subtitle:
      'Used to display a privacy policy to users who subscribe to your health authority',
    placeholder: 'https://minorityhealth.hhs.gov/privacy-policy.html',
    key: 'privacyPolicyUrl',
  },
  {
    title: 'Data Retention Policy',
    subtitle:
      'Set the duration unpublished data will remain in your database (30 days max)',
    children: DaySliderFunc,
    key: 'daysToRetainRecords',
  },
  {
    title: 'Health Authority Region',
    subtitle:
      'Please zoom in/out and drag in order to choose your GPS boundaries',
    children: OpenMap,
    key: 'regionCoordinates',
  },
];

export default infoInputs;
