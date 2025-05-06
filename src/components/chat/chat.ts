import { Block, BlockProps } from "../../modules/block";
import chatTemplate from '../pages/templates/chat.tmpl';
import {chatBarList, chatBarListItem, chatContent, chatContentItem} from '../pages/templates/chat.tmpl'

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
export class ChatContentHeader extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props, attrs: {class: 'a-chat-content'},
    });
  }

  render() : DocumentFragment {
    return this.compile( chatContentHeader, this.props);
  }
}

export class ChatContentFooter extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props, attrs: {class: 'a-chat-content'},
    });
  }

  render() : DocumentFragment {
    return this.compile( chatContentFooter, this.props);
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

export class ChatContentItem extends Block {
  constructor(props: BlockProps) {
    console.log('props', props);
    super("div", { 
      ...props, attrs: { class: (props.dir === '1' ?  'a-chat-content-frame-itemlist-item-received' : 'a-chat-content-frame-itemlist-item-sent')},
    });
  }

  render() : DocumentFragment {
    return this.compile( chatContentItem, this.props);
  }
}

import Handlebars from 'handlebars';

Handlebars.registerHelper('processItem', function(item, options) {
  return processItem(item);
});

Handlebars.registerHelper('processContentItem', function(item, options) {
  return processContentItem(item);
});

function processItem(item: BlockProps) {
  let it = new ChatBarListItem(item);
  return it.getContent().outerHTML;
}

function processContentItem(item: BlockProps) {
  console.log('handlebars', item);
  
  return new ChatContentItem(item).getContent().outerHTML;
}
