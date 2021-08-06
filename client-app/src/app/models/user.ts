export interface AccountRegisterValues {
  username: string;
  email: string;
  password: string;
}

export interface AccountLoginValues {
  email: string;
  password: string;
}

export interface User {
  username: string;
  email: string;
  token: string;
  department: string;
}
