import request from '../';
const workRecords = {
  save: {
    url: '/workRecord/save',
    method: 'post',
  },
  getRecordByTaskId: {
    url: '/workRecord/getRecordByTaskId',
    method: 'post',
  },
};
export { workRecords };

export function save(url: any, type: any, data?: any) {
  return request({
    url,
    method: type,
    data,
  });
}

export function getRecordByTaskId(url: any, type: any, data?: any) {
  return request({
    url,
    method: type,
    data,
  });
}

export function search(url: any, type: any, data?: any) {
  return request({
    url,
    method: type,
    data,
  });
}

export function change(url: any, type: any, data?: any) {
  return request({
    url,
    method: type,
    data,
  });
}

export function recordShow(url: any, type: any, data?: any) {
  return request({
    url,
    method: type,
    data,
  });
}
