import ChatAPI from '../api/chat-api';

export class chatController {
    private _chatApi: ChatAPI;

    constructor() {
        this._chatApi = new ChatAPI;
    };                  

    async chats(data: Record<string, string | number>) {
        return await this._chatApi.getChats(data);
    }

    async createChat(data: Record<string, string>) {
        return await this._chatApi.createChat(data);
    }

    async addUsersToChat( chatId: number, userId: number) {
        return await this._chatApi.addUserToChat( chatId, userId);
    }

    async delUsersFromChat( chatId: number, userId: number) {
        return await this._chatApi.delUserFromChat( chatId, userId);
    }

    async getChatToken( chatId: number) {
        return await this._chatApi.getChatToken( chatId)
    }

    async getChatUsers( chatId: number, offset: number, limit: number) {
        return await this._chatApi.getChatUsers( chatId, offset, limit)
    }
};
