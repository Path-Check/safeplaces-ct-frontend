import React from 'react';
import Map from '../Map';
import Sidebar from '../Sidebar';
import Wrapper from '../Wrapper';
import EntryForm from '../EntryForm';
import { getselectedPathEntryData } from '../../selectors';
import { useSelector } from 'react-redux';

export default function PathEditor() {
  const selectedPathEntryData = useSelector(state =>
    getselectedPathEntryData(state),
  );
  return (
    <Wrapper
      editor={
        <EntryForm
          initialData={
            selectedPathEntryData &&
            selectedPathEntryData[0] &&
            selectedPathEntryData[0][1]
          }
        />
      }
      sidebar={<Sidebar />}
    >
      <Map />
    </Wrapper>
  );
}
