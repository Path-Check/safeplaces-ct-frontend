import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'assets/images/logo.png';
import styles from './styles.module.scss';
import InfoInput from './InfoInput/InfoInput';
import DaySlider from './DaySlider';
import Button from 'components/_shared/Button';
import MapModal from './MapModal';
import authSelectors from '../../../ducks/auth/selectors';
import authActions from '../../../ducks/auth/actions';

const infoInputs = [
  {
    title: 'Your Health Autority name',
    subtitle: 'This name will be visible to the general public',
    placeholder: 'Puerto Rico Department of Public Health',
    key: 'name',
  },
  {
    title: 'Information Website',
    subtitle:
      'A website your users will reach to view local informations and alerts',
    placeholder: 'https://minorityhealth.hhs.gov',
    key: 'informationWebsiteUrl',
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
    subtitle: 'Used to define where tou want to load and publish your data',
    placeholder: 'https://api.example.com/safeplaces',
  },
  {
    title: 'Privacy Policy',
    subtitle:
      'Used to display a privacy policy to users who subscribe to your health authority',
    placeholder: 'https://minorityhealth.hhs.gov/privacy-policy.html',
    key: 'apiEndpoint',
  },
  {
    title: 'Data Retention Policy',
    subtitle:
      'Set the duration unpublished data will remain in your database (30 days max)',
    children: ({ handleChange, id }) => (
      <DaySlider id={id} handleChange={handleChange} />
    ),
    key: 'numberOfDaysToRetainRecords',
  },
  {
    title: 'Health Authority Region',
    subtitle:
      'Please zoom in/out and drag in order to choose your GPS boundaries',
    children: ({ toggleMap }) => (
      <Button
        width="347px"
        height="48px"
        className={styles.openMap}
        onClick={toggleMap}
      >
        Open Map & Select Region
      </Button>
    ),
  },
];

const HAConfig = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [openMapModal, setOpenMapModal] = useState(false);
  const { id: organizationId } = useSelector(state =>
    authSelectors.getCurrentUser(state),
  );

  const [state, setState] = React.useState({
    name: undefined,
    numberOfDaysToRetainRecords: undefined,
    regionCoordinates: {
      ne: { latitude: undefined, longitude: undefined },
      sw: { latitude: undefined, longitude: undefined },
    },
    apiEndpoint: undefined,
    referenceWebsiteUrl: undefined,
    informationWebsiteUrl: undefined,
  });

  const {
    name,
    numberOfDaysToRetainRecords,
    // regionCoordinates: { ne, sw },
    apiEndpoint,
    referenceWebsiteUrl,
    informationWebsiteUrl,
  } = state;

  const formCompleted = !!(
    name &&
    // ne.latitude && ne.longitude && sw.latitude && sw.longitude &&
    numberOfDaysToRetainRecords &&
    apiEndpoint &&
    referenceWebsiteUrl &&
    informationWebsiteUrl
  );

  const submitInfo = () => {
    dispatch(authActions.onboardingRequest({ organizationId, ...state }));
    history.push('/trace');
  };

  const toggleMap = () => {
    setOpenMapModal(!openMapModal);
  };

  const handleChange = evt => {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.id]: value,
    });
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
            key={e.title}
            title={e.title}
            subtitle={e.subtitle}
            placeholder={e.placeholder}
            children={
              e.children && e.children({ toggleMap, handleChange, id: e.key })
            }
            handleChange={handleChange}
            id={e.key}
          />
        ))}
        <Button
          width="100%"
          height="72px"
          onClick={submitInfo}
          disabled={!formCompleted}
        >
          Save & Continue
        </Button>
      </div>
      <MapModal open={openMapModal} />
    </div>
  );
};

export default HAConfig;
