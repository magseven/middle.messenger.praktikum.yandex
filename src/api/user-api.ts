import {HTTPTransport} from '../modules/httpRequest';


class userAPI {
    private _httpTransport: HTTPTransport;

    constructor() {
        this._httpTransport = new HTTPTransport();
    };

    async update(data: Record<string, string>) {
        return await this._httpTransport.put('/user/profile', {data});
    };

    async updateAvatar(formData: FormData) {
        const response = await this._httpTransport.put('/user/profile/avatar', {data: formData})                                
        return JSON.parse(response.responseText);
    };

    async changePassword( data: { oldPassword: string, newPassword: string}) {
        console.log( 'api', data);
        return await this._httpTransport.put('/user/password', {data});
    };

    async search(data: Record<string, string>) {
        const response = await this._httpTransport.get('/user/search', { data });
        return JSON.parse(response.responseText);
    };
};

export default new userAPI();
