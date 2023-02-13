export interface IUser {
  seq: number;
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
  nickname: string;
  address: string;
  bankAccount: string;
  interests: IInterest[];
  profileUrl: string;
}

export interface IInterest {
  readonly id: string;
  readonly label: string;
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
  profileUrl: boolean;
}
export interface IForm {
  user: IUser;
  validated: IValidated;
}

export interface IReqSocialSignup {
  userName: string;
  bankCode: number;
  account: string;
  address: string;
  profileUrl: string;
}

export interface IResSocialSignup {
  userName: string;
  userEmail: string;
}

export interface IResSocialLogin {
  token: string;
  nickname: string;
  userEmail: string;
  newUser: number;
  profile_image: string;
}

export interface IReqPatchUser {
  userName: string;
  bankCode: number;
  account: string;
  address: string;
  addressDetail: string;
  profileUrl: string;
}
 