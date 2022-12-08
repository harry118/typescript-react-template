import request from '@utils/request';

export interface ILogin {
  token: string;
}

export const login = (params: any) => {
  return request<ILogin>({
    url: '/apis/auth/login',
    method: 'post',
    data: params,
  });
};
