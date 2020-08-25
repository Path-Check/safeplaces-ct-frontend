import moment from 'moment';

export const CURRENT_DATE_FORMAT = 'ddd, MMMM D, YYYY';

export const getDates = points => {
  const sortedArray = points.sort((a, b) => moment(a.time) - moment(b.time));
  return [
    ...new Set(
      sortedArray.map(({ time }) => moment(time).format(CURRENT_DATE_FORMAT)),
    ).values(),
  ];
};
