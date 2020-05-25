import React, { useState } from 'react';
import logo from '../../assets/images/logo.png';
import styles from './styles.module.scss';
import InfoInput from './InfoInput/InfoInput';
import DaySlider from './DaySlider';
import Button from '../Button';
import MapModal from './MapModal';

const infoInputs = [
  {
    title: 'Your Health Autority name',
    subtitle: 'This name will be visible to the general public',
    placeholder: 'Puerto Rico Department of Public Health',
  },
  {
    title: 'Information Website',
    subtitle:
      'A website your users will reach to view local informations and alerts',
    placeholder: 'https://minorityhealth.hhs.gov',
  },
  {
    title: 'Reference Website',
    subtitle:
      'A website you’ll use to tell at-risk users what they should do next',
    placeholder: 'https://minorityhealth.hhs.gov',
  },
  {
    title: 'API Endpoint',
    subtitle: 'Used to define where tou want to load and publish your data',
    placeholder: 'https://api.example.com/safeplaces',
  },
  {
    title: 'Privacy Policy',
    subtitle:
      'Used to display a privacy policy to users who subscribe to your health authority',
    placeholder: 'https://minorityhealth.hhs.gov/privacy-policy.html',
  },
  {
    title: 'Data Retention Policy',
    subtitle:
      'Set the duration unpublished data will remain in your database (30 days max)',
    children: () => <DaySlider />,
  },
  {
    title: 'Health Authority Region',
    subtitle:
      'Please zoom in/out and drag in order to choose your GPS boundaries',
    children: handler => (
      <Button
        width="347px"
        height="48px"
        className={styles.openMap}
        onClick={handler}
      >
        Open Map & Select Region
      </Button>
    ),
  },
];

const HAConfig = () => {
  const [openMapModal, setOpenMapModal] = useState(false);

  const toggleMap = () => {
    setOpenMapModal(!openMapModal);
  };

  return (
    <div className={styles.container}>
      <div className={styles.ellipse} />
      <div className={styles.welcomeContainer}>
        <img src={logo} alt="logo" />
        <h1 className={styles.title}>Welcome</h1>
        <h3 className={styles.subtitle}>
          As this is your first time here, we need to know some things to set up
          your profile
        </h3>
      </div>
      <div className={styles.infoInputsContainer}>
        {infoInputs.map(e => (
          <InfoInput
            title={e.title}
            subtitle={e.subtitle}
            placeholder={e.placeholder}
            children={e.children && e.children(toggleMap)}
          />
        ))}
      </div>
      <MapModal open={openMapModal} />
    </div>
  );
};

export default HAConfig;
