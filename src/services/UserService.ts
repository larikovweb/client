import $api from '../http';
import { AxiosResponse } from 'axios';
import { IUser } from '../interfaces/data';

export default class UserService {
  static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return $api.get<IUser[]>('/users');
  }
}
