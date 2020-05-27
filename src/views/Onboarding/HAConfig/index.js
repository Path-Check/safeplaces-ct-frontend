import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from 'assets/images/logo.png';
import styles from './styles.module.scss';
import InfoInput from './InfoInput/InfoInput';
import Button from 'components/_shared/Button';
import MapModal from './MapModal';
import authSelectors from '../../../ducks/auth/selectors';
import authActions from '../../../ducks/auth/actions';
import infoInputs from './infoInputs';

const HAConfig = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [boundariesSetted, setBoundariesSetted] = useState(true);
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
              e.children &&
              e.children({
                toggleMap,
                handleChange,
                id: e.key,
                boundariesSetted,
              })
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
