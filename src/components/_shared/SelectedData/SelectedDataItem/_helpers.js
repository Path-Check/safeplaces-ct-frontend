import moment from 'moment';

export const formattedDuration = duration => {
  if (duration < 59) {
    return `${duration} mins`;
  } else {
    const hours = moment
      .utc(moment.duration(duration, 'minutes').asMilliseconds())
      .format('hh');

    const minutes = moment
      .utc(moment.duration(duration, 'minutes').asMilliseconds())
      .format('mm');

    return `${hours} hrs ${minutes} mins`;
  }
};
