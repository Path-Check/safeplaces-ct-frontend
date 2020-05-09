import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { connect, useDispatch } from 'react-redux';
import { addPathEntry, editPathEntry } from '../../ducks/path';
import { getTrack, getSelectedPathEntryData } from '../../selectors';
import { Button, TextArea, TextInput } from '@wfp/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams, useHistory } from 'react-router';
import Geocode from 'react-geocode';

import {
  faCrosshairs,
  faMapMarkerQuestion,
  faTimes,
  faLocationCircle,
} from '@fortawesome/pro-solid-svg-icons';
import DateInput from '../DateInput';
import styles from './styles.module.scss';
import { NavLink } from 'react-router-dom';
import moment from 'moment';
// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GOOGLE_PLACES_KEY);

// set response language. Defaults to english.
Geocode.setLanguage(process.env.REACT_APP_GOOGLE_PLACES_LANGUAGE);

// Enable or disable logs. Its optional.
Geocode.enableDebug();

const EntryForm = ({ initialData, useInline }) => {
  // const [load, setLoad] = useState(false);
  const methods = useForm({
    defaultValues: initialData,
  });

  const {
    control,
    errors,
    getValues,
    setValue,
    reset,
    handleSubmit,
    register,
  } = methods;

  const dispatch = useDispatch();
  const history = useHistory();

  const params = useParams();

  useEffect(() => {
    var initialDataManipulated = {};
    if (params.action !== 'new' && initialData) {
      initialDataManipulated = JSON.parse(JSON.stringify(initialData));
      initialDataManipulated.date = moment(initialDataManipulated.time).format(
        'YYYY-MM-DD',
      );
      initialDataManipulated.time = moment(initialDataManipulated.time).format(
        'hh:mm',
      );
    }

    reset(initialDataManipulated);
  }, [initialData, params.action, params.page, reset]);

  if (params.page !== 'edit' && !useInline) {
    return null;
  }

  // Get address from latidude & longitude.
  const fromLatLng = () => {
    const values = getValues();
    Geocode.fromLatLng(values.latitude, values.longitude).then(
      response => {
        const search = code => {
          const find = components.find(e => e.types.includes(code));
          return find ? find.long_name : '';
        };
        const components = response.results[0].address_components;
        setValue([
          {
            street: `${search('route')} ${search('street_number')}`,
          },
          {
            postal: search('postal_code'),
          },
          { town: search('locality') },
        ]);
      },
      error => {
        console.error(error);
      },
    );
  };

  const fromAddress = () => {
    const values = getValues();
    const address = `${values.street} ${values.other} ${values.town} ${values.postal}`;
    Geocode.fromAddress(address).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);

        setValue([
          {
            latitude: lat,
          },
          {
            longitude: lng,
          },
        ]);
      },

      error => {
        console.error(error);
      },
    );
  };

  const onSubmit = values => {
    values.time = moment(`${values.date} ${values.time}`).valueOf();
    values.latitude = parseFloat(values.latitude);
    values.longitude = parseFloat(values.longitude);
    dispatch(editPathEntry(values, params.action));
    history.push('/');
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={useInline ? styles.inlineForm : styles.form}
    >
      <div className={styles.header}>
        <div className={styles.headerTitle}>Edit</div>
        <NavLink to="/">
          <Button
            icon={<FontAwesomeIcon icon={faTimes} />}
            className={styles.closeButton}
          ></Button>
        </NavLink>
      </div>
      <div className={styles.dateWrapper}>
        <Controller
          as={<DateInput labelText="Date" />}
          name="date"
          type="date"
          min={null}
          max={null}
          control={control}
        />
        <Controller
          as={<DateInput time labelText="Time" type="time" />}
          name="time"
          min={null}
          max={null}
          control={control}
        />
      </div>

      <div className={styles.position}>
        <TextInput
          labelText="Latitude"
          name="latitude"
          invalidText="Invalid latitude"
          invalid={errors.longitude}
          inputRef={register({
            validate: value => {
              const parseValue = parseFloat(value);
              return (
                !isNaN(parseValue) && parseValue >= -90 && parseValue <= 90
              );
            },
          })}
        />
        <TextInput
          labelText="Longitude"
          name="longitude"
          invalidText="Invalid longitude"
          invalid={errors.longitude}
          inputRef={register({
            validate: value => {
              const parseValue = parseFloat(value);
              return (
                !isNaN(parseValue) && parseValue >= -180 && parseValue <= 180
              );
            },
          })}
        />

        <Button
          className={styles.pickButton}
          onClick={fromLatLng}
          icon={<FontAwesomeIcon icon={faCrosshairs} />}
        ></Button>
        <Button
          onClick={fromLatLng}
          icon={<FontAwesomeIcon icon={faLocationCircle} />}
        ></Button>
      </div>

      <div className={styles.address}>
        <div className={styles.streetWrapper}>
          <TextInput labelText="Street" name="street" inputRef={register} />
          <TextInput labelText="Other" name="other" inputRef={register} />
        </div>
        <div className={styles.townWrapper}>
          <TextInput labelText="Town" name="town" inputRef={register} />
          <TextInput
            labelText="Postal code"
            name="postal"
            inputRef={register}
          />
          <Button
            onClick={fromAddress}
            icon={<FontAwesomeIcon icon={faMapMarkerQuestion} />}
          ></Button>
        </div>
      </div>
      <div className={styles.commentWrapper}>
        <Controller
          as={<TextArea labelText="Comment" />}
          name="comment"
          control={control}
        />
      </div>

      <Button type="submit">
        {params.action !== 'new' ? 'Update' : 'Add to tracks'}
      </Button>
    </form>
  );
};

const mapStateToProps = state => {
  return {
    selectedPathEntry: getSelectedPathEntryData(state),
    track: getTrack(state),
  };
};

const mapDispatchToProps = dispatch => ({
  addPathEntryTrigger: data => dispatch(addPathEntry(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EntryForm);
