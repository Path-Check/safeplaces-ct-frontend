import React, { Component } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import styles from './styles.module.scss';
class LocationSearchInput extends Component {
  constructor(props) {
    super(props);
    this.state = { address: '', googledata: {} };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = address => {
    console.log('Selected Address ', address);

    this.setState({ address });
    geocodeByAddress(address)
      .then(results => {
        const getlatlng = getLatLng(results[0]);

        this.props.addressReceived(results);

        return getlatlng;
      })
      .then(latLng => {
        this.props.latlongReceived(latLng);
      })
      .catch(error => console.error('Error', error));
  };

  getCity = addressArray => {
    let city = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (
        addressArray[i].types[0] &&
        addressArray[i].types[0] === 'administrative_area_level_2'
      ) {
        city = addressArray[i].long_name;
        return city;
      }
    }
  };

  getArea = addressArray => {
    let area = '';
    for (let i = 0; i < addressArray.length; i++) {
      if (addressArray[i].types[0]) {
        for (let j = 0; j < addressArray[i].types.length; j++) {
          if (
            addressArray[i].types[j] === 'sublocality_level_1' ||
            addressArray[i].types[j] === 'locality'
          ) {
            area = addressArray[i].long_name;
            return area;
          }
        }
      }
    }
  };

  getState = addressArray => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          addressArray[i].types[0] === 'administrative_area_level_1'
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  getZipCode = addressArray => {
    let state = '';
    for (let i = 0; i < addressArray.length; i++) {
      for (let i = 0; i < addressArray.length; i++) {
        if (
          addressArray[i].types[0] &&
          addressArray[i].types[0] === 'postal_code'
        ) {
          state = addressArray[i].long_name;
          return state;
        }
      }
    }
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className={styles.commentWrapper}>
            <label
              style={{
                fontSize: '0.875rem',
                color: '#031c2d',
                fontWeight: '600',
                display: 'inline-block',
                verticalAlign: 'baseline',
                marginBottom: '0.5rem',
                width: '100%',
              }}
            >
              Search Address
            </label>
            <br></br>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
                style: {
                  fontFamily: 'Open Sans, sans-serif',
                  height: '40px',
                  color: '#031c2d',
                  backgroundColor: '#f9fbfc',
                  border: '1px solid #dfe3e6',
                  borderRadius: '0px',
                  boxShadow: 'none',
                  padding: '0 0.5rem',
                  width: '100%',
                },
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? {
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.875rem',
                      color: '#031c2d',
                      backgroundColor: '#f2f2f2',
                      cursor: 'pointer',
                      border: '1px solid #dfe3e6',
                      padding: '7px 5px',
                    }
                  : {
                      fontFamily: 'Open Sans, sans-serif',
                      fontSize: '0.875rem',
                      color: '#031c2d',
                      backgroundColor: '#ffffff',
                      cursor: 'pointer',
                      border: '1px solid #dfe3e6',
                      padding: '7px 5px',
                    };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

export default LocationSearchInput;
