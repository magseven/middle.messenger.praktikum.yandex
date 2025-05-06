import { Block, BlockProps } from "../../modules/block";
import chatTemplate from '../pages/templates/chat.tmpl';
import {chatBarList, chatBarListItem, chatBarListItemContent, chatBarListItemContentHeader, chatBarListItemContentMessage} from '../pages/templates/chat.tmpl'
import Div from '../div/div'
import Button from '../button/Button'
import {validateField} from '../../modules/utils/validation'
import {pageData} from '../../modules/utils/form_funcs';

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
    return this.compile( '{{{ link }}}', this.props);
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
  constructor(props: BlockProps) {
    super("div", { 
      ...props,
      attrs: {
        class: 'a-chat-bar-list',
      },
    });
  }

  render() : DocumentFragment {
    console.log('ChatBarList', this.props);
    return this.compile( chatBarList, this.props);
  }
}

export class ChatBarListItem extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props,
      attrs: {
        class: 'a-chat-bar-list-item',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( chatBarListItem, this.props);
  }
}

export class ChatBarListItemContent extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props,
      attrs: {
        class: 'a-chat-bar-list-item-content',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( chatBarListItemContent, this.props);
  }
}

export class ChatBarListItemContentHeader extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props,
      attrs: {
        class: 'a-chat-bar-list-item-content-header',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( chatBarListItemContentHeader, this.props);
  }
}

export class ChatBarListItemContentMessage extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props,
      attrs: {
        class: 'a-chat-bar-list-item-content-message',
      },
    });
  }

  render() : DocumentFragment {
    return this.compile( chatBarListItemContentMessage, this.props);
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

import Handlebars from 'handlebars';

Handlebars.registerHelper('processItem', function(item, options) {
  // item - текущий элемент массива
  // options - содержит контекст и другие параметры
  
  return myProcessingFunction(item);
});

function myProcessingFunction(item: BlockProps) {
  // Ваша логика обработки элемента
  console.log('handlebars', item);
  let it = new ChatBarListItem(item);
  return it.getContent().outerHTML;
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
