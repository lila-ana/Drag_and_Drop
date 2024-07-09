export type CreateUserParams = {
  username: string;
  password: string;
  email: string;
};

export interface UpdateUserParams {
  id: string;
  username?: string;
  password?: string;
  email?: string;
}
