import moment from 'moment';

export function humanizeTime(timeInSeconds: number) {
  const duration = moment.duration(timeInSeconds, 'seconds');
  return `${duration.minutes()}m ${duration.seconds()}s ${duration.milliseconds()}ms`;
}
