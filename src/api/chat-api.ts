import {HTTPTransport} from '../modules/httpRequest';

export default class ChatAPI {
    private _httpTransport: HTTPTransport;

    constructor() {
        this._httpTransport = new HTTPTransport();
    };

//   offset:
//   limit:
//   title:

    async getChats(data: Record<string, string|number>) {
        try {
            const response = await this._httpTransport.get('/chats', {data});
            if ( response.status !== 200) {
                console.log( 'getChats error:', response.status);
                return [];
            }
            return JSON.parse( response.responseText);

        }catch(error) {
            console.log( 'getChats error:', error);
            return [];
        }
    };

    async createChat(data: Record<string, string>) {
        try {
            const response = await this._httpTransport.post('/chats', {data});
            if ( response.status !== 200) {
                console.log( 'createChat error:', response.status);
                return;
            }
            return JSON.parse( response.responseText).id;

        }catch(error) {
            console.log( 'createChat error:', error);
            return;
        }
    };
};
