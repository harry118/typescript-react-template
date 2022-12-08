import request from '@utils/request';

export interface IUserItem {
  id: string;
  name: string;
  avatar: string;
  isActive: boolean;
}
export const queryUserList = () => {
  return request<IUserItem[]>({
    url: '/apis/users/list',
    method: 'get',
  });
};
