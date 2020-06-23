import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { locationSearch } from './LocationSearch.module.scss';
import LocationSuggestions from 'components/_shared/LocationSearch/LocationSuggestions';
import { useSelector } from 'react-redux';
import mapSelectors from 'ducks/map/selectors';

const LocationSearchInput = ({ handlePointChange, defaultValue }) => {
  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );

  const [value, setValue] = useState(defaultValue);

  const handleChange = address => {
    setValue(address);
  };

  const handleSelect = address => {
    setValue(address);

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        handlePointChange('latLng', latLng);
      })
      .catch(error => console.error(error.message));
  };

  useEffect(() => {
    selectedLocation?.longitude &&
      setValue(`${selectedLocation?.latitude}, ${selectedLocation?.longitude}`);
  }, [selectedLocation]);

  return (
    <PlacesAutocomplete
      value={value}
      onChange={handleChange}
      onSelect={handleSelect}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div className={locationSearch}>
          <input
            id="search-location"
            style={{
              width: '100%',
            }}
            {...getInputProps({
              placeholder: 'Search Location',
            })}
            required
          />
          {suggestions?.length > 0 && (
            <LocationSuggestions
              getSuggestionItemProps={getSuggestionItemProps}
              suggestions={suggestions}
              loading={loading}
            />
          )}
        </div>
      )}
    </PlacesAutocomplete>
  );
};

export default LocationSearchInput;
