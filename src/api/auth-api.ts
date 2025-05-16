import {HTTPTransport} from '../modules/httpRequest';

export interface SignupData {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
};
export interface SigninData {
    login: string
    password: string
};
export interface UserInfo {
    id: number
    first_name: string
    second_name: string
    display_name: string | null
    login: string
    email: string
    phone: string
    avatar: string | null
};

export default class AuthAPI {
    private _httpTransport: HTTPTransport;

    constructor() {
        this._httpTransport = new HTTPTransport();
    };

    async signUp(data: Record<string, string>) {
        const response = /*await*/ this._httpTransport.post('/auth/signup', { data });
        return JSON.parse(response.responseText);
    };

    async signIn(data: Record<string, string>) {
        await this._httpTransport.post('/auth/signin', { data });
    };

    async logout() {
        await this._httpTransport.post('/auth/logout');
    };

    async getUser() {
        const response = await this._httpTransport.get('/auth/user');
        return JSON.parse(response.responseText);
    };
};
