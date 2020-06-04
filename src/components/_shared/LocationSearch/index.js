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
    const { handlePointChange } = this.props;
    this.setState({ address });

    geocodeByAddress(address)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        handlePointChange('latLng', latLng);
      })
      .catch(error => this.setState({ error: error.message }));
  };

  componentDidMount() {
    const { defaultValue } = this.props;

    if (defaultValue) {
      this.setState({ address: defaultValue });
    }
  }

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
                width: '100%',
              }}
              {...getInputProps({
                placeholder: 'Search Location',
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
