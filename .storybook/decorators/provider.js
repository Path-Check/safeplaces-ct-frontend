import React from 'react';
import { MemoryRouter } from 'react-router';
import { Provider } from 'react-redux';
import '../../src/scss/global.scss';
import '../../src/scss/ui.scss';
import ReactMapGL from 'react-map-gl';
import { defaultMapStyle } from 'components/_shared/Map/config';

import { store } from '../../src/store';

const viewport = {
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 10,
};
const ProviderDecorator = storyFn => {
  return (
    <Provider store={store}>
      <MemoryRouter>{storyFn()}</MemoryRouter>
      {/* <ReactMapGL
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle={defaultMapStyle}
        width="100%"
        height="100%"
        {...viewport}
      /> */}
    </Provider>
  );
};

export default ProviderDecorator;
