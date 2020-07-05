import moment from 'moment';

const timeCycle = (text: string, hasTime = false) => {
  if (text) {
    if (hasTime) {
      return moment(text).format('YYYY-MM-DD HH:mm:ss');
    } else {
      return moment(text).format('YYYY-MM-DD');
    }
  } else {
    return '-';
  }
};

export default timeCycle;
