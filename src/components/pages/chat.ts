import { Block, BlockProps } from "../../modules/block";
import { Input_F } from "../input/input";
import  Avatar from "../avatar/avatar";
import {chatController} from "../../controllers/chatController";
import Store from "../../modules/store";
import {validateForm} from '../../modules/utils/validation';
import {baseResourceUrl} from '../../modules/httpRequest';
import {stdEvents} from '../../modules/types'

export default class Chat extends Block {
    constructor(props: BlockProps) {
        super("section", props);    
                                    
    }

    dispatchComponentDidUnMount() {
        console.log('dispatchComponentDidUnMount');
        window.eventBus.offAll( stdEvents.createChat);         
    }

    async componentDidMount() {
        console.log('dispatchComponentDidMount');
        window.eventBus.on( stdEvents.createChat, this.onCreateChat.bind( this));         
        await this._get();
    }

    async _get() {
        const chats = await new chatController().chats( { offset: 0, limit: 20})
        Store.set('chats', chats);
        console.log('_get');
    }

    async onCreateChat() {
        console.log('create chat')
        const chat_id = await new chatController().createChat( { title: 'Мой первый чат'})
        if ( chat_id)
           this._get();
    }

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
