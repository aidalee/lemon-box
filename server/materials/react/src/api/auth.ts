import request from '@/utils/request'
interface IParams {
  flag: string;
  in_password?: {
    username: string
    password: string
  };
  in_verify_code?: {
    phone: string
    verify_code: string
  }
}

export const httpLogin = <T, U extends IParams>(params: U) => {
  const { flag, ...rest } = params
  return request.post<T>(`/api/authentication?flag=${flag}`, rest)
};

export const httpRegister = <T, U extends object>(params: U) => request.post<T>(`/api/Register`, params)