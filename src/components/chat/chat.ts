import { Block, BlockProps } from "../../modules/block";
import chatTemplate from '../pages/templates/chat.tmpl';
import {validateField} from '../../modules/utils/validation'

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
      return this.compile( `{{{ bar }}}`, this.props);
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
    return this.compile( '{{{ btitle }}} {{{ searchField }}} {{{ blist }}}', this.props);
  }
}

export class ChatBarTitle extends Block {
  constructor(props: BlockProps) {
    super('a', { 
      ...props, 
      attrs: {
        class: 'a-chat-bar-title',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( '{{{ link }}}', this.props);
  }
}

export class ChatBarSearch extends Block {
  constructor(props: BlockProps) {
    super('Input', { 
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
  constructor(props: BlockProps) {
    super("div", { 
      ...props, 
      attrs: {
        class: 'a-chat-bar-list',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( '', this.props);
  }
}

export class ChatContent extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props, 
      attrs: {
        class: 'a-chat-content',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( 'chatContent', this.props);
  }
}

 //export default Chat;

// export default `
//     <section class="a-chat">
//         <div class="a-chat-frame">
//             <div class="a-chat-bar">
//                 <div class="a-chat-bar-title">
//                     <a class="a-chat-bar-title-link" href=#>Профиль&nbsp;>&nbsp;<a>
//                 </div>
//                 <div class="a-chat-bar-search">
//                     <input type="text" class="a-chat-bar-search-field f-inter fa-search" placeholder="&#xf002;&nbspПоиск"/>
//                 </div>
//                 <div class="a-chat-bar-list">
//                     {{#each chats}}{{>chats_bar_item }}{{/each}}
//                 </div>
//             </div>
//             <div class="a-chat-content">
//             </div>
//         </div>
//     </section>
// `;

// <div class="a-link>href="./{{this.[0]}}">{{this.[1]}}</div>
