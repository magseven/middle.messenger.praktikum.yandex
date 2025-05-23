import { Block, BlockProps } from "../../modules/block";
import { stdEvents } from "../../modules/types";
import buttonTemplate from './button.tmpl';
import {menuButton} from './button.tmpl';
class Button extends Block {
    constructor(props: BlockProps) {
      super("button", {
        ...props, 
      });
    }
  
    render() : DocumentFragment {
      return this.compile( buttonTemplate, this.props);
    }
 }

export default Button;
  
export class ButtonMenu extends Block {
  constructor(props: BlockProps) {
    super("button", {
      ...props, 
      attrs: {
        popovertarget: 'popMenu',
      },
      menu: ['menuItem1', 'menuItem2'],
      menuItem1: new Button({ 
        num: 1,
        attrs: { 
          // popovertarget: 'user_dialog',
          class: "dropdown-item",
        },
        events: {
          OnClick: () => {
            console.log('Создать пользователя');
            window.eventBus.emit( stdEvents.addUserChat)
          }
        },
        text: 'Добавить пользователя',
      }),
      menuItem2: new Button({ 
        num: 2, 
        attrs: { 
          // popovertarget: 'user_dialog',
          class: "dropdown-item",
        }, 
        events: {
          OnClick: () => {
            console.log('Удалить пользователя');
          }
        },
        text: 'Удалить пользователя'}),
        button: new Button({ 
          text: 'Cоздать',
        })

    });
  }

  render() : DocumentFragment {
    return this.compile( menuButton( this.props.menu!.reduce(( acc, item)=>`${acc}{{{${item}}}}`,'') ), {...this.props, ...this.children});
  }
}
