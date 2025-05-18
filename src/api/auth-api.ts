import {HTTPTransport} from '../modules/httpRequest';

export default class AuthAPI {
    private _httpTransport: HTTPTransport;

    constructor() {
        this._httpTransport = new HTTPTransport();
    };

//   headers: Record<string, string>;         
//   method?: METHOD;          
//   data?: unknown; 
//   timeout?:number; 

    async signUp(data: Record<string, string>) {
        const response = await this._httpTransport.post('/auth/signup', {data});
        return JSON.parse(response.responseText);
    };

    async signIn(data: Record<string, string>) {
        return await this._httpTransport.post('/auth/signin', { data })                                
    };

    async logout() {
        await this._httpTransport.post('/auth/logout', {});
    };

    async getUser() {
        const response = await this._httpTransport.get('/auth/user', {});
        return JSON.parse(response.responseText);
    };
};
