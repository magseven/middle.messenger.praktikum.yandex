import ChatAPI from '../api/chat-api';
import {Router, stdRoutes} from '../modules/router';
import { router } from '../modules/router';
import Store from '../modules/store';

export class chatController {
    private _chatApi: ChatAPI;
    private _store: typeof Store;
    private _router: Router;

    constructor() {
        this._chatApi = new ChatAPI;
        this._store = Store;
        this._router = router;
    };                  

    async chats(data: Record<string, string | number>) {
        return await this._chatApi.getChats(data);
    }

    async createChat(data: Record<string, string>) {
        return await this._chatApi.createChat(data);
    }

    async addUsersToChat( chatId: number, userId: number) {
        return await this._chatApi.addUsersToChat( chatId, userId);
    }

    async getChatToken( chatId: number) {
        return await this._chatApi.getChatToken( chatId)
    }

    

};
