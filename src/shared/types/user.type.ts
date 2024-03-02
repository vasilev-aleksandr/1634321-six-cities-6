export enum UserStatus {
    Regular = 'regular',
    Pro = 'pro',
  }

export type User = {
    name: string,
    email: string;
    avatarPath: string;
    password: string;
    userStatus: UserStatus;
}
