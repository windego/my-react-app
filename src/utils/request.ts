import { message } from 'antd';
import axios, { AxiosResponse } from 'axios';
import { USER_NOT_LOGIN } from '@constants/base';

const transAxiosResponse = <ResponseData extends object | boolean>({
  data: axiosData,
}: AxiosResponse<IResponseData<ResponseData>>): Promise<ResponseData> => {
  if (axiosData.errno === 0) {
    return Promise.resolve(axiosData.data);
  }
  message.error(axiosData.errmsg);

  // 未登录
  if (axiosData.errno === USER_NOT_LOGIN) {
    window.location.replace((axiosData.data as any).url);
  }

  return Promise.reject(new Error(axiosData.errmsg));
};
// 过滤所有空字符串参数
const falsyFilter = (params: { [key: string]: any }) => {
  const filtedParams: { [key: string]: any } = {};
  Object.keys(params)
    .filter(field => !!params[field])
    .forEach(field => {
      filtedParams[field] = params[field];
    });
  return filtedParams;
};

const instance = axios.create({
  baseURL: '/',
  timeout: 10000,
});
instance.interceptors.request.use(conf => {
  let { params } = conf;
  if (conf.method === 'get' && params) {
    // 过滤所有空字符串参数
    params = falsyFilter(conf.params);
  }
  return {
    ...conf,
    params,
  };
});

instance.interceptors.response.use(
  response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    }
    message.error(response.statusText);
    return Promise.reject(new Error(response.statusText));
  },
  (error: Error) => {
    message.error(error.message);
    return Promise.reject(error);
  },
);

export const get = <ResponseData extends object, Request = object>(
  url: string,
  params?: Request,
): Promise<ResponseData> =>
  instance
    .get<IResponseData<ResponseData>>(url, { params })
    .then(transAxiosResponse);

export const post = <ResponseData extends object | boolean, Request = object>(
  url: string,
  params?: Request,
): Promise<ResponseData> =>
  instance.post<IResponseData<ResponseData>>(url, params).then(transAxiosResponse);
