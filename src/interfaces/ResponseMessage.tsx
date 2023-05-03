import {User} from './User';

interface LoginMessageResponse {
  token?: string;
  message: string;
  user: User;
}

export type {LoginMessageResponse}