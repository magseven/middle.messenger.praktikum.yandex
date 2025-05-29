import {HTTPTransport} from '../modules/httpRequest';


class userAPI {
    private _httpTransport: HTTPTransport;

    constructor() {
        this._httpTransport = new HTTPTransport();
    };

    async update(data: Record<string, string>) {
        return await this._httpTransport.put('/user/profile', {data});
    };

    async changePassword( data: { oldPassword: string, newPassword: string}) {
        console.log( 'api', data);
        return await this._httpTransport.put('/user/password', {data});
    };

    async updateAvatar(formData: FormData) {
        return await this._httpTransport.put('/user/profile/avatar', {data: formData});
    };

    async search(data: { login: string}) {
        return  await this._httpTransport.post('/user/search', { data });
    };
};

export default new userAPI();
