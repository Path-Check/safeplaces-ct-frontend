import React from 'react';
import Map from '../Map';
import Sidebar from '../Sidebar';
import Wrapper from '../Wrapper';
import EntryForm from '../EntryForm';
import { getselectedPointsDataData } from '../../selectors';
import { useSelector } from 'react-redux';

export default function PathEditor() {
  const selectedPointsData = useSelector(state =>
    getselectedPointsDataData(state),
  );
  return (
    <Wrapper
      editor={
        <EntryForm initialData={selectedPointsData && selectedPointsData[0]} />
      }
      sidebar={<Sidebar />}
    >
      <Map />
    </Wrapper>
  );
}
