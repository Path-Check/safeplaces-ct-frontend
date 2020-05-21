import React from 'react';
import RecordsTable from 'components/RecordsTable';

export default { title: 'Records Table' };

const records = [
  {
    id: 1234567890,
    saved: 'Fri, May 8, 2020 - 1:02pm',
    status: 'In progress',
    expiration: 'X days',
  },
  {
    id: 1234567890,
    saved: 'Fri, May 8, 2020 - 1:02pm',
    status: 'Staged For Publishing',
    expiration: 'X days',
  },
  {
    id: 1234567890,
    saved: 'Fri, May 8, 2020 - 1:02pm',
    status: 'In progress',
    expiration: 'X days',
  },
  {
    id: 1234567890,
    saved: 'Fri, May 8, 2020 - 1:02pm',
    status: 'In progress',
    expiration: 'X days',
  },
  {
    id: 1234567890,
    saved: 'Fri, May 8, 2020 - 1:02pm',
    status: 'In progress',
    expiration: 'X days',
  },
];

export const Default = () => <RecordsTable records={records} />;
