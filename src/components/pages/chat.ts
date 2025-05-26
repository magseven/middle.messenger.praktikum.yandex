import { BlockProps } from "../../modules/block";
import {chatController} from "../../controllers/chatController";
import {AuthController} from "../../controllers/authController";
import Store from "../../modules/store";
import {stdEvents} from '../../modules/types'
import {validateField} from '../../modules/utils/validation'
import {sendMessage} from '../../modules/utils/websocket'
import {Page} from '../../components/pages'
import { router, stdRoutes } from "../../modules/router";

export default class Chat extends Page {
    _bindOnCreateChat = this.onCreateChat.bind( this);
    _bindOnAddUserChat = this.onAddUserChat.bind( this);
    _bindOnDelUserChat = this.onDelUserChat.bind( this);
    _bindSendMessage = this.onSendMessage.bind( this);

    constructor(props: BlockProps) {
        super( props);                          
    }

    componentDidUnMount() {
        console.log('chat: componentDidUnMount');
        window.eventBus.off( stdEvents.createChat, this._bindOnCreateChat);         
        window.eventBus.off( stdEvents.addUserChat, this._bindOnAddUserChat);         
        window.eventBus.off( stdEvents.delUserChat, this._bindOnDelUserChat);         
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
        window.eventBus.on( stdEvents.addUserChat, this._bindOnAddUserChat);         
        window.eventBus.on( stdEvents.delUserChat, this._bindOnDelUserChat);         
        window.eventBus.on( stdEvents.sendMessage, this._bindSendMessage);

        await this._get();
    }
     
    async _get() {
        const chats = await new chatController().chats( { offset: 0, limit: 20})
        Store.set('chats', chats);
        console.log('chat: _get');
    }

    async onCreateChat( value: string) {
        if ( !value)
            return;

        const chat_id = await new chatController().createChat( { title: value})
        if ( chat_id) {
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
            const res = sendMessage( user.id, chat_id, token, element.value);
            console.log('res', res);
//            console.log('user:', user.id, 'chat_id:', chat_id, 'token:', token, 'message:', element.value);
        }
    }

    async onAddUserChat() {
        const {user, selectedItem} = Store.getState();
        console.log('onAddUserChat chat:', selectedItem, Number(user!.id));


        if ( !user || !selectedItem)
            return;

        await new chatController().addUsersToChat( Number(selectedItem), Number( user.id));
    }

    async onDelUserChat() {
        const {user, selectedItem} = Store.getState();
        console.log('onDelUserChat chat:', selectedItem, Number(user!.id));

        if ( !user || !selectedItem)
            return;

        await new chatController().delUsersFromChat( Number(selectedItem), Number( user.id));
    }

    render() : DocumentFragment {
        console.log('render');
        return this.compile( this.props.template as string, this.props);
    }
}
