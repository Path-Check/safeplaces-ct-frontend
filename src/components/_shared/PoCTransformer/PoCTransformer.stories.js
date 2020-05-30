import React from 'react';
import PoCTransformer from 'components/_shared/PoCTransformer';

export default { title: 'PoCTransformer' };

const sampleData = [
  {
    latitude: 37.374391766782566,
    longitude: 127.10916017303812,
    time: 1590751841585,
  },
  {
    latitude: 37.362084948636934,
    longitude: 127.10854923258223,
    time: 1590752162206,
  },
  {
    latitude: 37.352816982316526,
    longitude: 127.10879020871239,
    time: 1590752508538,
  },
  {
    latitude: 37.35037934958959,
    longitude: 127.10803412887157,
    time: 1590752824242,
  },
  {
    latitude: 37.350138270952584,
    longitude: 127.11198861860666,
    time: 1590812804316,
  },
  {
    latitude: 37.3502059145281,
    longitude: 127.11150071902954,
    time: 1590813135248,
  },
  {
    latitude: 37.34998444134949,
    longitude: 127.11104789022617,
    time: 1590813514143,
  },
  {
    latitude: 37.349799062570305,
    longitude: 127.10896317304325,
    time: 1590814222873,
  },
  {
    latitude: 37.351344841296175,
    longitude: 127.10741519393912,
    time: 1590815261611,
  },
  {
    latitude: 37.35025549038726,
    longitude: 127.10421094113134,
    time: 1590819524654,
  },
  {
    latitude: 37.35074847147646,
    longitude: 127.10601575444467,
    time: 1590822522881,
  },
  {
    latitude: 37.359852616107396,
    longitude: 127.10533236408139,
    time: 1590822824000,
  },
  {
    latitude: 37.37951568438999,
    longitude: 127.11818463689465,
    time: 1590823124000,
  },
  {
    latitude: 37.38402845322732,
    longitude: 127.12978303498272,
    time: 1590823424000,
  },
  {
    latitude: 37.38553189177807,
    longitude: 127.12840855645112,
    time: 1590823724000,
  },
  {
    latitude: 37.38553189177807,
    longitude: 127.12840855645112,
    time: 1590824024000,
  },
  {
    latitude: 37.38553189177807,
    longitude: 127.12840855645112,
    time: 1590824324000,
  },
  {
    latitude: 37.38568336896983,
    longitude: 127.12843860287363,
    time: 1590824724753,
  },
  {
    latitude: 37.38554980181971,
    longitude: 127.12843107994385,
    time: 1590825062195,
  },
  {
    latitude: 37.380169723265766,
    longitude: 127.1187086190007,
    time: 1590829921999,
  },
  {
    latitude: 37.369285283205684,
    longitude: 127.10803493155974,
    time: 1590830221999,
  },
  {
    latitude: 37.35031575292714,
    longitude: 127.10453792669591,
    time: 1590838321145,
  },
  {
    latitude: 37.350500607701555,
    longitude: 127.10483046350323,
    time: 1590838666030,
  },
  {
    latitude: 37.35062017486417,
    longitude: 127.10471371282472,
    time: 1590839014975,
  },
];

export const Default = () => <PoCTransformer />;
export const SamplePath = () => <PoCTransformer path={sampleData} />;
