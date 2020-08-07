import moment from 'moment';

export const returnFormattedDate = date =>
  date ? moment(date).format('ddd, MMMM D, YYYY - h:mma') : 'N/A';

export const formattedDuration = duration => {
  if (!duration || duration < 1) {
    return null;
  }

  if (duration < 59) {
    return `${duration} min`;
  } else if (duration > 720) {
    return 'Over 12 hours';
  } else {
    const hours = moment
      .utc(moment.duration(duration, 'minutes').asMilliseconds())
      .format('h');

    const minutes = moment
      .utc(moment.duration(duration, 'minutes').asMilliseconds())
      .format('m');

    return `${hours}h ${minutes}m`;
  }
};
