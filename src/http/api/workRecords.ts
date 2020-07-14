import request from '../';
import { AxiosRequestConfig } from 'axios';
type HttpMethod = '"post" | "head" | "link" | "get" | "GET" | "delete" | "DELETE" | "HEAD" | "options" | "OPTIONS" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "LINK" | "unlink" | "UNLINK" | undefined';
interface WorkRecords {
  [attribute: string]: AxiosRequestConfig;
}
const workRecords: WorkRecords = {
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
