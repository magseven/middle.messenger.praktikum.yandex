import {HTTPTransport} from '../modules/httpRequest';


class userAPI {
    private _httpTransport: HTTPTransport;

    constructor() {
        this._httpTransport = new HTTPTransport();
    };

    async update(data: Record<string, string>) {
        const response = await this._httpTransport.put('/user/profile', {data});
        return JSON.parse(response.responseText);
    };

    async updateAvatar(formData: FormData) {
        const response = await this._httpTransport.put('/user/profile/avatar', {data: formData})                                
        return JSON.parse(response.responseText);
    };

    async changePassword( data: { oldPass: string, newPass: string}) {
        await this._httpTransport.post('/user/password', {data});
    };

    async search(data: Record<string, string>) {
        const response = await this._httpTransport.get('/user/search', { data });
        return JSON.parse(response.responseText);
    };
};

export default new userAPI();
