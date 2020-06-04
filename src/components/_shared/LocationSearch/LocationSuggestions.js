import React from 'react';

import {
  locationSuggestions,
  locationSuggestion,
  locationSuggestionActive,
} from './LocationSearch.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';

const LocationSuggestions = ({
  getSuggestionItemProps,
  loading,
  suggestions,
}) => {
  return (
    <div className={locationSuggestions}>
      {loading && <div>Loading...</div>}
      {suggestions.map(suggestion => {
        console.log(suggestion);

        const className = suggestion.active
          ? `${locationSuggestion} ${locationSuggestionActive}`
          : locationSuggestion;
        return (
          <div
            key={suggestion}
            className={className}
            {...getSuggestionItemProps(suggestion)}
          >
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <address>
              <h6>{suggestion.formattedSuggestion.mainText}</h6>
              <p>{suggestion.formattedSuggestion.secondaryText}</p>
            </address>
          </div>
        );
      })}
    </div>
  );
};

export default LocationSuggestions;
