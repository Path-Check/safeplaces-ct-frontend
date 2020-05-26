import React, { useState } from 'react';
import Map from '../Map';
import Sidebar from '../Sidebar';
import Wrapper from '../Wrapper';
import EntryForm from '../EntryForm';
import { useSelector } from 'react-redux';
import { getSelectedPointsData } from 'selectors/selectedPoints';

export default function PathEditor() {
  const [map, setMap] = useState(null);
  const selectedPointsData = useSelector(getSelectedPointsData);
  const updateMap = map => {
    setMap(map);
  };

  return (
    <Wrapper
      editor={
        <EntryForm initialData={selectedPointsData && selectedPointsData[0]} />
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
