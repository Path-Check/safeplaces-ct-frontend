import React, { useState } from 'react';
import Map from '../Map';
import Sidebar from '../Sidebar';
import Wrapper from '../Wrapper';
import EntryForm from '../EntryForm';
import { getselectedPointsDataData } from '../../selectors';
import { useSelector } from 'react-redux';

export default function PathEditor() {
  const [map, setMap] = useState(null);
  const selectedPathEntryData = useSelector(state =>
    getselectedPointsDataData(state),
  );
  const updateMap = map => {
    setMap(map);
  };
  return (
    <Wrapper
      editor={
        <EntryForm
          initialData={selectedPathEntryData && selectedPathEntryData[0]}
        />
      }
      sidebar={<Sidebar map={map} />}
    >
      <Map
        setMap={map => {
          updateMap(map);
        }}
      />
    </Wrapper>
  );
}
