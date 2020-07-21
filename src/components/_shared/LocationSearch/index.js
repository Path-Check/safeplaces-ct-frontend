import React, { useState, useEffect } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { locationSearch } from './LocationSearch.module.scss';
import LocationSuggestions from 'components/_shared/LocationSearch/LocationSuggestions';

const LocationSearchInput = ({
  handlePointChange,
  selectedLocation,
  isEdit,
  activePoint,
}) => {
  const [value, setValue] = useState();

  const handleChange = address => {
    setValue(address);
  };

  const handleSelect = address => {
    handlePointChange('latLng', {
      address,
    });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        handlePointChange({
          latitude: latLng.lat,
          longitude: latLng.lng,
          address,
        });
      })
      .catch(error => console.error(error.message));
  };

  useEffect(() => {
    if (isEdit) {
      setValue(`${activePoint.latitude}, ${activePoint.longitude}`);
    }
  }, []);

  useEffect(() => {
    if (selectedLocation?.latitude || selectedLocation?.address) {
      const value = selectedLocation.address
        ? selectedLocation.address
        : `${selectedLocation.latitude}, ${selectedLocation.longitude}`;

      setValue(value);
    } else {
      !isEdit && setValue('');
    }
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
