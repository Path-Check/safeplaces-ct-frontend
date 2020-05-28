import React, { useState, useEffect } from 'react';
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
import { useForm } from 'react-hook-form';

const HAConfig = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [boundariesSet, setBoundariesSet] = useState(false);
  const [boundariesError, setBoundariesError] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const { id: organizationId } = useSelector(state =>
    authSelectors.getCurrentUser(state),
  );
  const { handleSubmit, errors, register } = useForm({});

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
    if (boundariesSet) {
      dispatch(authActions.onboardingRequest({ organizationId, ...state }));
      history.push('/trace');
    }
    if (!boundariesSet) {
      setBoundariesError('* Required field');
    }
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

  const handleConfirmBounds = ({ _ne, _sw }) => {
    const regionCoordinates = {
      ne: { latitude: _ne.lat, longitude: _ne.lng },
      sw: { latitude: _sw.lat, longitude: _sw.lng },
    };

    setBoundariesSet(true);

    setState({
      ...state,
      regionCoordinates,
    });
  };

  // not sure if we should do this or not?
  useEffect(() => {
    setOpenMapModal(false);
  }, [state.regionCoordinates]);

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
      <form
        className={styles.infoInputsContainer}
        onSubmit={handleSubmit(submitInfo)}
      >
        {infoInputs.map(e => (
          <InfoInput
            key={e.title}
            title={e.title}
            subtitle={e.subtitle}
            placeholder={e.placeholder}
            errors={errors}
            register={register}
            children={
              e.children &&
              e.children({
                toggleMap,
                handleChange,
                id: e.key,
                boundariesSet,
                boundariesError,
              })
            }
            handleChange={handleChange}
            id={e.key}
          />
        ))}
        <Button
          width="100%"
          height="72px"
          type="submit"
          disabled={!formCompleted}
        >
          Save &amp; Continue
        </Button>
      </form>

      <MapModal
        openMapModal={setOpenMapModal}
        open={openMapModal}
        confirmBounds={handleConfirmBounds}
      />
    </div>
  );
};

export default HAConfig;
