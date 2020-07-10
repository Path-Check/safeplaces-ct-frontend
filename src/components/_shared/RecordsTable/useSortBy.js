import { useState } from 'react';

import moment from 'moment';

export const useSortByDate = array => {
  const [sortBy, setSortBy] = useState('NEWEST');

  const [items, setItems] = useState(array);

  const sortItems = () => {
    if (sortBy === 'NEWEST') {
      setItems(
        items.sort((a, b) => {
          return moment(a.updatedAt) - moment(b.updatedAt);
        }),
      );
      setSortBy('OLDEST');
    } else {
      setItems(items.sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt)));
      setSortBy('NEWEST');
    }
  };

  return [sortItems, sortBy, items];
};
