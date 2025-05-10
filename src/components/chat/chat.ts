import { Block, BlockProps } from "../../modules/block";
import chatTemplate from '../pages/templates/chat.tmpl';
import Button from '../button/Button';
import {ButtonMenu} from '../button/Button';
import Img from '../img/img';
import {Input} from '../input/input';
import imgBlankCircle from '../../static/images/blank_circle.png';
import {chatBarListItem, chatContent, chatContentItem, chatContentItems, chatContentHeader, chatContentFooter} from '../pages/templates/chat.tmpl'

import { validateField } from "../../modules/utils/validation";
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
      selectedItem: 0,
      attrs: {
        class: 'a-chat-bar-list',
      },
      ...props.data!.map( 
            ditem => [ditem.id,  new ChatBarListItem( ditem)] as [string, ChatBarListItem])
            .reduce(( acc, [id, obj])=>({  ...acc, [`i${id}`]: obj}), {})
    });

    const onSelectItem = (props: BlockProps) => {
      if ( this.props.selectedItem !== 0  )
        this.children[`i${this.props.selectedItem}`].setProps({ selected: 0});
      
      if ( props.id !== 0  )
        this.children[`i${props.id}`].setProps({ selected: 1});  
      
      this.props.selectedItem = props.id;
    };    

    Object.values(this.children).forEach(( value) => {
      if ( value instanceof ChatBarListItem)
        value.eventBus.on( 'onSelectItem', onSelectItem)
    });
  }

  render() : DocumentFragment {
    return this.compile( this.props.data!.reduce(( acc, {id}) => `${acc}{{{i${id}}}}`, ''), this.props);
  }
}

export class ChatBarListItem extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props,
      selected: 0,
      attrs: {
        class: 'a-chat-bar-list-item',
      },
      events: {
        OnClick: (e: Event) => {
          e.preventDefault();
          e.stopPropagation();
          this.eventBus.emit( 'onSelectItem', this.props);
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

  componentDidUpdate( oldProps: Record<string, unknown>,
                      newProps: Record<string, unknown>): boolean {
                       
    if ( oldProps.selected !== newProps.selected) {
      if ( newProps.selected) {
        this.setProps({ attrs: {class: 'a-chat-bar-list-item a-chat-bar-list-item-selected'}});
      }else{
        this.setProps({ attrs: {class: 'a-chat-bar-list-item'}});
      }
    }

    return true;
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
            window.eventBus.emit( 'onSendMessage', this.props);
          }
        },
        }),
    });
    
    const onSendMessage = () => {
      if ( validateField(this.children.message.element as HTMLInputElement))
        console.log( 'Сообщение:', (this.children.message as Input).getText(), 'отправлено.');
    }

    window.eventBus.on( 'onSendMessage', onSendMessage); 
  }

  render() : DocumentFragment {
    return this.compile( chatContentFooter, this.props);
  }
}

export class ChatContentItems extends Block {
  constructor(props: BlockProps) {
    super("div", { 
      ...props, attrs: {class: 'a-chat-content-items f-inter'},
    });
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

Handlebars.registerHelper('processContentItem', function(item) {
  return processContentItem(item);
});

function processContentItem(item: BlockProps) {
  return new ChatContentItem(item).getContent().outerHTML;
}
