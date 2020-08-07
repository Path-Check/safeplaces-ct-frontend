import { setMinutes, setHours, isToday } from 'date-fns';

import moment from 'moment';

export const convertToHoursMins = point => {
  if (!point || !point.duration) {
    return [0, 0];
  }

  if (point.duration < 60) {
    return [0, point.duration];
  } else {
    return [Math.floor(point.duration / 60), point.duration % 60];
  }
};

export const convertToMins = ([hours, minutes]) => {
  if (hours) {
    return hours * 60 + minutes;
  } else {
    return minutes;
  }
};

export const canSubmit = selectedLocation => {
  if (!selectedLocation) {
    return false;
  }

  const { latitude, longitude, time, duration } = selectedLocation;

  return !latitude || !longitude || !time || !duration;
};

export const validateTimeDuration = ({ time, duration }) => {
  // check if time + duration is greater than current time
};

export const returnMinTime = () => setHours(setMinutes(new Date(), 0), 0);

export const returnMaxTime = date => {
  const now = new Date();

  if (!date || isToday(moment(date).toDate())) {
    return setHours(setMinutes(now, now.getMinutes()), now.getHours());
  } else {
    return setHours(setMinutes(now, 55), 23);
  }
};

export const returnIsBefore = ({ time, duration }) => {
  const pointEndDate = moment(time).add(duration, 'm');
  const currentDate = new Date();

  return moment(pointEndDate._d).isBefore(currentDate);
};
