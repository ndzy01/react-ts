import axios, { AxiosResponse } from 'axios';
import { message } from 'antd';
import { baseUrl } from '../config';
import { useRequest } from 'ahooks';

const http = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development' ? baseUrl.url : baseUrl.urlOnLine,
  timeout: 60000, // 请求超时时间
});

//添加一个响应拦截器
http.interceptors.response.use(
  function (response) {
    if (response.data.status === 200) {
      return response;
    }
    return response;
  },
  function (err) {
    message.error('网络异常！');
    return Promise.reject(err);
  }
);

export const useAxiosReq = (options?: any) =>
  useRequest((param) => param, {
    // throwOnError: true,
    requestMethod: (param: any) => http(param),
    formatResult: (res: AxiosResponse) => res.data,
    ...options,
  });

export const useLazyAxiosReq = (options?: any) =>
  useRequest((param) => param, {
    manual: true,
    // throwOnError: true,
    requestMethod: (param: any) => http(param),
    formatResult: (res: AxiosResponse) => res.data,
    ...options,
  });

export default http;
