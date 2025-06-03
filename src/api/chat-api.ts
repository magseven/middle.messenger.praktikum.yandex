import {HTTPTransport} from '../modules/httpRequest';

export default class ChatAPI {
    private _httpTransport: HTTPTransport;

    constructor() {
        this._httpTransport = new HTTPTransport();
    };

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

    async deleteChat( chat_id: number) {
        try {
            const response = await this._httpTransport.delete('/chats', { data: { chatId: chat_id}});
            if ( response.status !== 200) {
                console.log( 'deleteChat error:', response.status);
                return false;
            }
            return true;

        }catch(error) {
            console.log( 'deleteChat error:', error);
            return false;
        }
    };

    async addUserToChat( chatId: number, userId: number) {
        console.log( 'addUserChat1', chatId, userId );
        try {
            if ( isNaN(userId)) {
                console.log('userId is not number');
                return false;
            }

            console.log( 'addUserChat', { chatId, users: [userId] });
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

    async delUserFromChat(chatId: number, userId: number) {
        try {
            if ( isNaN(userId)) {
                console.log('userId is not number');
                return false;
            }

            const response = await this._httpTransport.delete('/chats/users', { data: { chatId, users: [userId] } });

            if ( response.status !== 200) {
                console.log( 'delUsersToChat error:', response.status);
                return false;
            }
            return true;

        }catch(error) {
            console.log( 'delUsersToChat error:', error);
            return false;
        }
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

    async getChatUsers( chatId: number, offset: number, limit: number) {
        try {
            console.log( 'getChatUsers', chatId, offset, limit);
            if ( !chatId)
                return [];

            const response = await this._httpTransport.get(`/chats/${chatId}/users`, { data: { offset, limit }});

            if ( response.status !== 200) {
                console.log( 'getChatUsers error:', response.status);
                return [];
            }
            return JSON.parse( response.responseText);

        }catch(error) {
            console.log( 'getChatUsers error:', error);
            return [];
        }
    }
}
