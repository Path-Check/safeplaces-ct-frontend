import { useState } from 'react';

import moment from 'moment';

import { sortEnum } from 'types/sortBy';

export const useSortByDate = array => {
  const [sortBy, setSortBy] = useState(sortEnum.NEWEST);

  const [items, setItems] = useState(array);

  const sortItems = () => {
    if (sortBy === sortEnum.NEWEST) {
      setItems(
        items.sort((a, b) => {
          return moment(a.updatedAt) - moment(b.updatedAt);
        }),
      );
      setSortBy(sortEnum.OLDEST);
    } else {
      setItems(items.sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt)));
      setSortBy(sortEnum.NEWEST);
    }
  };

  return [sortItems, sortBy, items];
};
