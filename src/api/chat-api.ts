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

    async addUsersToChat( chatId: number, userId: number) {
        try {
            const response = await this._httpTransport.put('/chats/users', { data: { chatId, users: [userId] }});

            if ( response.status !== 200) {
                console.log( 'addUsersToChat error:', response.status);
                return false;
            }
            return true;

        }catch(error) {
            console.log( 'addUsersToChat error:', error);
            return false;
        }
    };

    async removeUserFromChat(chatId: number, userId: number) {
        await this._httpTransport.delete('/chats/users', { data: { chatId, users: [userId] } });
    };

    async getChatToken(chatId: number) {
        try {
            const response = await this._httpTransport.post(`/chats/token/${chatId}`, {});
            if ( response.status !== 200) {
                console.log( 'getChatToken error:', response.status);
                return;
            }
            console.log(JSON.parse( response.responseText));
            return JSON.parse( response.responseText).token;

        }catch(error) {
            console.log( 'getChatToken error:', error);
            return;
        }
    };

};
