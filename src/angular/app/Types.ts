export type UserInfoKey = 'id' | 'name' | 'birthday' | 'gender' | 'phone' | 'email' | 'address' | 'authority';

export type Sort = {
  key: UserInfoKey;
  order: 'asc' | 'desc';
};

export type Gender = 'Male' | 'Female';

export type User = {
  id?: String;
  name?: String;
  birthday?: Date;
  gender?: Gender;
  phone?: String;
  email?: String;
  address?: String;
  authority?: String;
};
