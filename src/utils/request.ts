import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IApiResponse } from '@/index.d';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 1000 * 30,
  //   withCredentials: true,
});

axiosInstance.interceptors.request.use(
  function (config: AxiosRequestConfig) {
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    console.log(error);
  }
);
axiosInstance.interceptors.response.use(
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  function (response: AxiosResponse) {
    // const { data } = response;
    return response;
    // return data;
  },
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  function (error) {
    return Promise.reject(error);
  }
);

const request = async <T = any>(
  config: AxiosRequestConfig
): Promise<IApiResponse<T>> => {
  try {
    const { data } = await axiosInstance.request<IApiResponse<T>>(config);
    return data;
  } catch (error) {
    const msg = error.message;
    console.log(error);
  }
};

export default request;
