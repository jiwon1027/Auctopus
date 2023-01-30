export interface IUser {
  seq: number;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  address?: string;
  bankAccount?: string;
  interests: IInterest[];
}

export interface IInterest {
  id: string;
  label: string;
}

export interface IValidated {
  email: boolean;
  password: boolean;
  passwordConfirm: boolean;
  name: boolean;
  nickname: boolean;
  address: boolean;
  bankAccount: boolean;
  interests: boolean;
}
export interface IForm {
  user: IUser;
  validated: IValidated;
}