import React, { useEffect, useState } from 'react';
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
import classNames from 'classnames';

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
    externalId: user && user.externalId,
    name: user && user.name,
    daysToRetainRecords: user && user.daysToRetainRecords,
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
    apiEndpointUrl: user && user.apiEndpointUrl,
    referenceWebsiteUrl: user && user.referenceWebsiteUrl,
    infoWebsiteUrl: user && user.infoWebsiteUrl,
    privacyPolicyUrl: user && user.privacyPolicyUrl,
  });

  const {
    name,
    daysToRetainRecords,
    regionCoordinates: { ne, sw },
    apiEndpointUrl,
    referenceWebsiteUrl,
    infoWebsiteUrl,
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
    daysToRetainRecords &&
    apiEndpointUrl &&
    referenceWebsiteUrl &&
    infoWebsiteUrl &&
    privacyPolicyUrl
  );

  const submitInfo = () => {
    if (boundariesSet || regionCordinatesExist) {
      dispatch(
        authActions.onboardingRequest({
          ...state,
          completedOnboarding: true,
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

  const formClasses = classNames({
    [`${styles.infoInputsContainerSettings}`]: isSettingsPage,
    [`${styles.infoInputsContainer}`]: !isSettingsPage,
  });

  const containerClasses = classNames({
    [`${styles.containerSettings}`]: isSettingsPage,
    [`${styles.container}`]: !isSettingsPage,
  });

  return (
    <div className={containerClasses}>
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
      <form className={formClasses} onSubmit={handleSubmit(submitInfo)}>
        {infoInputs.map(e => (
          <InfoInput
            key={e.title}
            isSettingsPage={isSettingsPage}
            errors={errors}
            register={register}
            value={state[e.key]}
            {...e}
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
          id="save-continue"
          width="100%"
          height="72px"
          type="submit"
          disabled={!formCompleted}
          secondary
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
