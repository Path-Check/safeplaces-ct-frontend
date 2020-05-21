import React from 'react';
import RecordsTable from 'components/RecordsTable';

export default { title: 'Records Table' };

const records = [
  {
    id: 532523423,
    updatedAt: 'Sun, May 10, 2020 - 7:02pm',
    status: 'In progress',
    expiresIn: '5 days',
  },
  {
    id: 2141341234132,
    updatedAt: 'Wed, May 13, 2020 - 12:02pm',
    status: 'Staged For Publishing',
    expiresIn: 'N/A',
  },
  {
    id: 141341234123,
    updatedAt: 'Thur, May 7, 2020 - 9:02pm',
    status: 'In progress',
    expiresIn: '7 days',
  },
  {
    id: 941341234123,
    updatedAt: 'Sat, May 9, 2020 - 4:02pm',
    status: 'In progress',
    expiresIn: '3 days',
  },
];

export const Default = () => <RecordsTable records={records} />;
