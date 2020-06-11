import moment from 'moment';

export const formattedDuration = duration => {
  if (!duration || duration < 1) {
    return null;
  }

  if (duration < 59) {
    return `${duration} mins`;
  } else if (duration > 720) {
    return 'Over 12 hours';
  } else {
    const hours = moment
      .utc(moment.duration(duration, 'minutes').asMilliseconds())
      .format('h');

    const minutes = moment
      .utc(moment.duration(duration, 'minutes').asMilliseconds())
      .format('m');

    return `${hours} hrs ${minutes} mins`;
  }
};
