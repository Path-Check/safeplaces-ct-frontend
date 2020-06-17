import moment from 'moment';

export const returnFormattedDate = date =>
  date ? moment(date).format('ddd, MMMM D, YYYY - h:mma') : 'N/A';
