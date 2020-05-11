import React, { useState } from 'react';
import Map from '../Map';
import Sidebar from '../Sidebar';
import Wrapper from '../Wrapper';
import EntryForm from '../EntryForm';
import { getSelectedPathEntryDataData } from '../../selectors';
import { useSelector } from 'react-redux';

export default function PathEditor({ location, match }) {
  const [map, setMap] = useState(null);
  const selectedPathEntryData = useSelector(state =>
    getSelectedPathEntryDataData(state, match.params.action),
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
