export interface IAuthResponse {
  id: number;
  login: string;
  name: string;
  token: string;
  accessToken: string;
  refreshToken: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface isRegisterRequest {
  email: string;
  password: string;
}
