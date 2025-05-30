import { BlockProps } from "../../modules/block";
import {chatController} from "../../controllers/chatController";
import {AuthController} from "../../controllers/authController";
import Store from "../../modules/store";
import {stdEvents} from '../../modules/types'
import {validateField} from '../../modules/utils/validation'
import {sendMessage} from '../../modules/utils/websocket'
import {Page} from '../pages'
import { router, stdRoutes } from "../../modules/router";
import { getLastMessages } from "../../modules/utils/websocket";

export default class Chat extends Page {
    _bindOnCreateChat = this.onCreateChat.bind( this);
    _bindOnDeleteChat = this.onDeleteChat.bind( this);
    _bindOnAddUserChat = this.onAddUserToChat.bind( this);
    _bindOnDelUserChat = this.onDelUserFromChat.bind( this);
    _bindSendMessage = this.onSendMessage.bind( this);

    constructor(props: BlockProps) {
        super( props);                          
    }

    componentDidUnMount() {
        console.log('chat: componentDidUnMount');
        window.eventBus.off( stdEvents.createChat, this._bindOnCreateChat);         
        window.eventBus.off( stdEvents.deleteChat, this._bindOnDeleteChat);         
        window.eventBus.off( stdEvents.addUserToChat, this._bindOnAddUserChat);         
        window.eventBus.off( stdEvents.delUserFromChat, this._bindOnDelUserChat);         
        window.eventBus.off( stdEvents.sendMessage, this._bindSendMessage);         
    }

    async componentDidMount() {
        console.log('chat: componentDidMount');

        const user = await new AuthController().fetchUser();
        if ( !user) {
            router.go( stdRoutes.Login);
            return;
        }

        window.eventBus.on( stdEvents.createChat, this._bindOnCreateChat);         
        window.eventBus.on( stdEvents.deleteChat, this._bindOnDeleteChat);         
        window.eventBus.on( stdEvents.addUserToChat, this._bindOnAddUserChat);         
        window.eventBus.on( stdEvents.delUserFromChat, this._bindOnDelUserChat);         
        window.eventBus.on( stdEvents.sendMessage, this._bindSendMessage);

        await this._get();
    }
     
    async _get() {
        const chats = await new chatController().chats( { offset: 0, limit: 20})
        Store.set('chats', chats);
        console.log('chat: _get');
    }

    async onCreateChat( value: 'string') {
        if ( !value)
            return;

        const chat_id = await new chatController().createChat( { title: value})
        if ( chat_id) {
            await this._get();
            Store.set( "selectedItem", chat_id);
            const user = Store.getState().user; 
            const token = await new chatController().getChatToken( chat_id);
            await getLastMessages( user!.id, chat_id, token);
        }
    }

    async onDeleteChat() {
        const { selectedItem} = Store.getState();

        if ( !selectedItem) {
            console.log('Чат не выбран');
            return;
        }

        if ( await new chatController().deleteChat( selectedItem)) {
            Store.set( 'selectedItem', 0);
            Store.set( "messages", []);
            await this._get();
        }
    }

    async onSendMessage() {
        const element: HTMLInputElement | null = document.querySelector('.a-chat-content-footer-message-text');
        if ( element && validateField( element as HTMLInputElement)) {
            const user = Store.getState().user;
            const chat_id = Store.getState().chats[0].id;

            if ( !user || !chat_id)
                return;

            const token = await new chatController().getChatToken( chat_id);
            await sendMessage( user.id, chat_id, token, element.value);
            element.value = '';
        }
    }

    async onAddUserToChat( user_id: string)  {
        const { selectedItem} = Store.getState();
        if ( !selectedItem) {
            console.log( 'Чат не выбран!');
            return;
        }

        await new chatController().addUsersToChat( Number(selectedItem), Number(user_id));
    }

    async onDelUserFromChat( data: { chat_id: string, user_id: string} ) {
        if ( !data.user_id || !data.chat_id)
            return;

        console.log( 'onDelUserFromChat', data);
        await new chatController().delUsersFromChat( Number(data.chat_id), Number( data.user_id));
    }

    render() : DocumentFragment {
        console.log('render');
        return this.compile( this.props.template as string, this.props);
    }
}
