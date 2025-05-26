import { Block, BlockProps } from "../../modules/block";
import chatTemplate from '../pages/templates/chat.tmpl';
import Button from '../button/Button';
import {ButtonMenu} from '../button/Button';
import Img from '../img/img';
import {Input} from '../input/input';
import imgBlankCircle from '../../static/images/blank_circle.png';
import {chatBarListItem, chatContent, chatContentItem, chatContentItems, chatContentHeader, chatContentFooter} from '../pages/templates/chat.tmpl'
import Store, {StoreEvents, storeState, initialStoreState} from '../../modules/store'
import { getLastMessages } from "../../modules/utils/websocket";
import { chatController } from "../../controllers/chatController";
import { template } from "./template";

import imgArrowRight from '../../static/images/arrow-right.png';
import imgClip  from '../../static/images/clip.png';

export class Chat extends Block {
    constructor(props: BlockProps) {
      super("div", { 
        ...props, 
        attrs: {
          class: 'a-chat',
        },
      });
    }
  
    render() : DocumentFragment {
      return this.compile( chatTemplate, this.props);
    }
 }

 export class ChatFrame extends Block {
    constructor(props: BlockProps) {
      super("div", { 
        ...props, 
        attrs: {
          class: 'a-chat-frame',
        },
      });
    }

    render() : DocumentFragment {
      return this.compile( `{{{ bar }}}{{{ content }}}`, this.props);
    }
 }

 export class ChatBar extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props, 
      attrs: {
        class: 'a-chat-bar',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( '{{{ btitle }}} {{{ bsearch }}} {{{ blist }}}', this.props);
  }
}

export class ChatBarTitle extends Block {
  constructor(props: BlockProps) {
    super('div', { 
      ...props, 
      attrs: {
        class: 'a-chat-bar-title',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( template, this.props);
  }
}

export class ChatBarSearch extends Block {
  constructor(props: BlockProps) {
    super('Div', { 
      ...props, 
      attrs: {
        class: 'a-chat-bar-search',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( '{{{ searchField }}}', this.props);
  }
}

export class ChatBarList extends Block {
  _bindOnStoreUpdate = this.onStoreUpdate.bind( this);
  constructor(props: BlockProps) {
    super("div", { 
      ...props,
      selectedItem: 0,
      parent: null,
      attrs: {
        class: 'a-chat-bar-list',
      },
      
    });

  }

  onStoreUpdate( oldState: storeState, newState: storeState): void {
    if ( oldState.chats === newState.chats)
      return;

    Object.values( this.children).forEach(element => {
        element.dispatchComponentDidUnMount();      
    });

    this.children = {...newState.chats!.map( 
      ditem => [ditem.id,  new ChatBarListItem( ditem)] as [number, ChatBarListItem])
      .reduce(( acc, [id, obj])=>({  ...acc, [`i${id}`]: obj}), {})};


      Object.values( this.children).forEach(element => {
          element.dispatchComponentDidMount();      
      });
      this.setProps( { data:newState.chats} )
  }

  componentDidMount(): void {
    this._bindOnStoreUpdate( initialStoreState, Store.getState());
    Store.on( StoreEvents.Updated, this._bindOnStoreUpdate);          
  }

  componentDidUnMount(): void {
    Store.off( StoreEvents.Updated, this._bindOnStoreUpdate);          
  }

  render() : DocumentFragment {
    return this.compile( this.props.data!.reduce(( acc, {id}) => `${acc}{{{i${id}}}}`, ''), this.props);
  }

}

export class ChatBarListItem extends Block {
  _bindOnStoreUpdate = this.onStoreUpdate.bind( this);
  constructor(props: BlockProps) {
    super("div", { 
      ...props,
//      selected: 0,
      attrs: {
        id: props.id,
        class: 'a-chat-bar-list-item',
      },
      events: {
        OnClick: async (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          
          Store.set( "selectedItem", this.props.id);
          const user = Store.getState().user; 
          const token = await new chatController().getChatToken( Number(this.props.id));
          getLastMessages( user!.id, Number(this.props.id), token);
        },
      },
      avatar: new Img({
        attrs: {
          src: imgBlankCircle,
          alt: 'Аватар',
          width: '48px',
        }
      }),
    });
  }

  componentDidMount() {
    Store.on( StoreEvents.Updated, this._bindOnStoreUpdate);
  }

  componentDidUnMount() {
    Store.off( StoreEvents.Updated, this._bindOnStoreUpdate);
  }

 onStoreUpdate( oldState: storeState, newState: storeState): void {
  if ( oldState.selectedItem === newState.selectedItem)
    return;

  const selected = newState.selectedItem === this.props.id;
   this.setProps({
    attrs: { id: this.props.id, class: `a-chat-bar-list-item${selected ? ' a-chat-bar-list-item-selected': ''}`}
  })
}

render() : DocumentFragment {
    return this.compile( chatBarListItem, this.props);
  }
}

export class ChatContent extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props, attrs: {class: 'a-chat-content'},
    });
  }

  render() : DocumentFragment {
    return this.compile( chatContent, this.props);
  }
}

export class ChatContentHeader extends Block {
    _bindOnStoreUpdate = this.onStoreUpdate.bind( this);

    constructor(props: BlockProps) {
      super("div", { 
        ...props, attrs: {class: 'a-chat-content-header'},
        button: new ButtonMenu({
          text: ':',
        }),
        avatar: new Img({
          attrs: {
            class: "a-chat-content-header-avatar-image no-outline",
            src: imgBlankCircle,
            alt: 'Аватар',
            width: '48px',
          }
        }) 
      });
  }

  componentDidMount() {
    Store.on( StoreEvents.Updated, this._bindOnStoreUpdate);
  }

  componentDidUnMount() {
    Store.off( StoreEvents.Updated, this._bindOnStoreUpdate);
  }

  onStoreUpdate( oldState: storeState, newState: storeState): void {
    if ( oldState.selectedItem === newState.selectedItem)
        return;

    this.setProps({ title: newState.chats.find(( item) => { return item.id === newState.selectedItem})?.title})
  }

  render() : DocumentFragment {
    return this.compile( chatContentHeader, this.props);
  }
}

export class ChatContentFooter extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props, 
      attrs: {
        class: 'a-chat-content-footer'
      },
      clip: new Img({
        attrs: {
          src: imgClip,
          alt: "Скрепка",
          width: '32px',
        }
      }), 
      input: new Input({
        attrs: {
          type: 'file',
          hidden: true,
          class: 'button-white no-outline',
        },
      }),
      message: new Input({
        attrs: {
          type: "text",
          name: "message",
          class: "a-chat-content-footer-message-text f-inter",
        }
      }),
      button: new Button({
        attrs: {
          class: 'no-outline',
        },
        image: new Img({
          attrs: {
            src: imgArrowRight,
            alt: "Стрелка вправо",
            width: '32px',
          }
        }), 
        events: {
          OnClick: (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            window.eventBus.emit( stdEvents.sendMessage);
          }
        },
        }),
    });
  }

  render() : DocumentFragment {
    return this.compile( chatContentFooter, this.props);
  }
}

export class ChatContentItems extends Block {
  _bindOnStoreUpdate = this.onStoreUpdate.bind(this);
  constructor(props: BlockProps) {
    super("div", { 
      ...props, attrs: {class: 'a-chat-content-items f-inter'},
    });
  }

componentDidMount() {
    Store.on( StoreEvents.Updated, this._bindOnStoreUpdate);
  }

  componentDidUnMount() {
    Store.off( StoreEvents.Updated, this._bindOnStoreUpdate);
  }

 onStoreUpdate( oldState: storeState, newState: storeState): void {
    console.log( 'oldState.messages:', oldState.messages, 'newState.messages:', newState.messages, oldState.messages === newState.messages);
    if ( oldState.messages === newState.messages)
      return;

    this.setProps( { 
      data: newState.messages.map((item)=>{
        return { dir: item.user_id === Number(newState.user!.id) ? '0' : '1', 
                message: item.content, 
                time: new Date( item.time).toLocaleString('ru-RU', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          hour12: false
                        }).replace(',', ''),
                user_id: item.user_id}
      })
    })
  }

  render() : DocumentFragment {
    return this.compile( chatContentItems, this.props);
  }
}

export class ChatContentItem extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props, 
      attrs: { 
          class: (props.dir === '1' ?  'a-chat-content-items-item-received' : 'a-chat-content-items-item-sent')
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( chatContentItem, this.props);
  }
}

import Handlebars from 'handlebars';
import { stdEvents } from "../../modules/types";

Handlebars.registerHelper('processContentItem', function(item) {
  return processContentItem(item);
});

function processContentItem(item: BlockProps) {
  return new ChatContentItem(item).getContent().outerHTML;
}
