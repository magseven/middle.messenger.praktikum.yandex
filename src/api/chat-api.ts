import {HTTPTransport} from '../modules/httpRequest';

export default class ChatAPI {
    private _httpTransport: HTTPTransport;

    constructor() {
        this._httpTransport = new HTTPTransport();
    };

//   offset:
//   limit:
//   title:

    async getChats() {
        const response = await this._httpTransport.get('/chats', {});
        if ( response.status >= 400)
            throw new Error( JSON.parse(response.responseText).reason);
    };
};
