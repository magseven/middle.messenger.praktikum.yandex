import { Block, BlockProps } from "../../modules/block";
import { Input_F } from "../input/input";
import  Avatar from "../avatar/avatar";
import {chatController} from "../../controllers/chatController";
import Store from "../../modules/store";
import {validateForm} from '../../modules/utils/validation';
import {baseResourceUrl} from '../../modules/httpRequest';
import {stdEvents} from '../../modules/types'
import {validateField} from '../../modules/utils/validation'
import {sendMessage} from '../../modules/utils/websocket'

export default class Chat extends Block {
    constructor(props: BlockProps) {
        super("section", props);    
                                    
    }

    dispatchComponentDidUnMount() {
        console.log('dispatchComponentDidUnMount');
        window.eventBus.offAll( stdEvents.createChat);         
        window.eventBus.offAll( stdEvents.addUserChat);         
        window.eventBus.offAll( stdEvents.sendMessage);         
    }

    async componentDidMount() {
        console.log('dispatchComponentDidMount');
        window.eventBus.on( stdEvents.createChat, this.onCreateChat.bind( this));         
        window.eventBus.on( stdEvents.addUserChat, this.onAddUserChat.bind( this));         
        window.eventBus.on( stdEvents.sendMessage, this.onSendMessage.bind( this));
        await this._get();
    }

    async _get() {
        const chats = await new chatController().chats( { offset: 0, limit: 20})
        Store.set('chats', chats);
        console.log('_get');
    }

    async onCreateChat() {
        console.log('create chat')
        const chat_id = await new chatController().createChat( { title: 'Мой первый чат' + Store.getState().chats.length})
        if ( chat_id)
           this._get();
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
            console.log('user:', user.id, 'chat_id:', chat_id, 'token:', token, 'message:', element.value);
        }
    }

    async onAddUserChat() {
        const user = Store.getState().user;
        const chats = Store.getState().chats;

        console.log('onAddUserChat chat:', chats[0].id, Number(user!.id));


        if ( !user || !chats || ( chats && !chats.length))
            return;

        const ok = await new chatController().addUsersToChat( chats[0].id, Number( user.id));
        // if ( ok) {
        //     console.log('User ${user.login} was connected to chat ${chats[0].Id}');
        //     const tokens = await new chatController().getChatToken( chats[0].id);
        //     if ( tokens) {
        //         console.log('token:', tokens);
        //         Store.set( 'token', tokens);
        //     }
        // }        
    }

    // onSelectItem(item: Block) {
    //   item.setProps( {selected: true});
    //   console.log('onSelectItem', item);              
    // //   if ( this.props.selectedItem !== 0  )
    // //     this.children[`i${this.props.selectedItem}`].setProps({ selected: 0});
      
    // //   if ( props.id !== 0  )
    // //     this.children[`i${props.id}`].setProps({ selected: 1});  
      
    // //   this.props.selectedItem = props.id;
    // };    

    render() : DocumentFragment {
        console.log('render');
        return this.compile( this.props.template as string, this.props);
    }
}
/*
tramp
T1eritoeitoip
function render(query: string, block: Page) {
      const root = document.querySelector(query);
      root!.replaceWith(block.getContent());
      return root;
}

if (!window.eventBus) {
    window.eventBus = new EventBus();
}

const data = blockData[getCurrentPage()] || blockData.index;
const page = new Page( pageData( data.context) as BlockProps);   

render(".app", page);
*/
