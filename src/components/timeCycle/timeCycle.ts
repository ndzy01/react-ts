import moment from 'moment';

const timeCycle = (text: string, hasTime: boolean = false) => {
  console.log(text);
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
