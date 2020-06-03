import React from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

import { locationSearch } from './LocationSearch.module.scss';
import LocationSuggestions from 'components/_shared/LocationSearch/LocationSuggestions';

class LocationSearchInput extends React.Component {
  state = { address: '', error: '' };

  handleChange = address => {
    this.setState({ address });
  };

  handleError = error => {
    this.setState({ error });
  };

  handleSelect = address => {
    console.log(address);
    const { handlePointChange } = this.props;
    this.setState({ address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        handlePointChange('latLng', latLng);
      })
      .catch(error => this.setState({ error: error.message }));
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        onError={this.handleError}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={locationSearch}>
            <input
              style={{
                fontFamily: 'Open Sans, sans-serif',
                height: '40px',
                color: '#031c2d',
                backgroundColor: '#f9fbfc',
                border: '1px solid #dfe3e6',
                borderRadius: '0px',
                boxShadow: 'none',
                padding: '0 0.5rem',
                width: '100%',
              }}
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
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
  }
}

export default LocationSearchInput;
