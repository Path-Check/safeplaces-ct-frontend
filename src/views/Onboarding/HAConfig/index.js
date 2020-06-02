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
  const {
    location: { pathname },
  } = useHistory();
  const [boundariesSet, setBoundariesSet] = useState(false);
  const [boundariesError, setBoundariesError] = useState(false);
  const [openMapModal, setOpenMapModal] = useState(false);
  const user = useSelector(state => authSelectors.getCurrentUser(state));
  const { handleSubmit, errors, register } = useForm({});

  const [state, setState] = React.useState({
    name: user && user.name,
    numberOfDaysToRetainRecords: user && user.numberofDaysToRetainRecords, // TODO BE typo will be fixed
    regionCoordinates: {
      ne: {
        latitude:
          user && user.regionCoordinates && user.regionCoordinates.ne.latitude,
        longitude:
          user && user.regionCoordinates && user.regionCoordinates.ne.longitude,
      },
      sw: {
        latitude:
          user && user.regionCoordinates && user.regionCoordinates.sw.latitude,
        longitude:
          user && user.regionCoordinates && user.regionCoordinates.sw.longitude,
      },
    },
    apiEndpoint: user && user.apiEndpoint,
    referenceWebsiteUrl: user && user.referenceWebsiteUrl,
    informationWebsiteUrl: user && user.informationWebsiteUrl,
    privacyPolicyUrl: user && user.privacyPolicyUrl,
  });

  const {
    name,
    numberOfDaysToRetainRecords,
    regionCoordinates: { ne, sw },
    apiEndpoint,
    referenceWebsiteUrl,
    informationWebsiteUrl,
    privacyPolicyUrl,
  } = state;

  // Had to to this because ne.latitude: 0 is false
  const regionCordinatesExist =
    ne.latitude !== undefined &&
    ne.longitude !== undefined &&
    sw.latitude !== undefined &&
    sw.longitude !== undefined;

  const formCompleted = !!(
    name &&
    regionCordinatesExist &&
    numberOfDaysToRetainRecords &&
    apiEndpoint &&
    referenceWebsiteUrl &&
    informationWebsiteUrl &&
    privacyPolicyUrl
  );

  const submitInfo = () => {
    if (boundariesSet || regionCordinatesExist) {
      dispatch(
        authActions.onboardingRequest({
          organizationId: user.id,
          ...state,
        }),
      );
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

  const isSettingsPage = pathname.includes('/settings');
  return (
    <div className={styles.container}>
      {!isSettingsPage ? (
        <>
          <div className={styles.ellipse} />
          <div className={styles.welcomeContainer}>
            <img src={logo} alt="logo" />
            <h1 className={styles.title}>Welcome</h1>
            <h3 className={styles.subtitle}>
              As this is your first time here, we need to know some things to
              set up your profile
            </h3>
          </div>
        </>
      ) : null}
      <form
        className={styles.infoInputsContainer}
        style={{ marginTop: isSettingsPage && 36 }}
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
            value={state[e.key]}
            children={
              e.children &&
              e.children({
                toggleMap,
                handleChange,
                id: e.key,
                boundariesSet,
                boundariesError,
                value: state[e.key],
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
