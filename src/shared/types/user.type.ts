export type UserStatus = 'regular' | 'pro';

export type User = {
    name: string,
    email: string;
    avatarPath?: string;
    password: string;
    userStatus: UserStatus;
}
