import { LoginType } from '../loginType';

export type UserReturn = {
    id: string;
    email: string;
    role: 'ADMIN' | 'USER';
    name: string;
}

export type LocalStorageType = {
    login: LoginType,
    setLogin: (login: LoginType) => void
}

export type UserContextType = {
    token: string | undefined;
    setToken: (token: string) => void;
    User: UserReturn | undefined;
    setUser: (User: UserReturn) => void;
}