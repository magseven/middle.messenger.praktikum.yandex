import { Block, BlockProps } from "../../modules/block";
import { stdEvents } from "../../modules/types";
import buttonTemplate from './button.tmpl';
import {menuButton} from './button.tmpl';
import Dialog from '../dialog/dialog';
import { chatController } from "../../controllers/chatController";
import Store from "../../modules/store";

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
      dialog: new Dialog({
        attrs: {
          id: 'a-dialog-add-chat-user',
          popover: "auto",
          class: 'a-dialog a-dialog-add-chat-user',
        },
        label: 'Укажите id пользователя',
        type: "text",
        button_text: 'Добавить',
        button_events: { 
            OnClick: () => {

        //events: {
        //   OnClick: () => {
        //     console.log('Удалить пользователя');
        //     window.eventBus.emit( stdEvents.delUserFromChat)
        //   }
        // },

              console.log('addChatUser', this.children);
              if ( !this.children.dialog.children.input)
                return;

              const user_id = ( this.children.dialog.children.input.element as HTMLInputElement).value;
              if ( !user_id) {
                console.log('Отсутсвует user_id');
                return;
              }

              console.log('addChatUser', user_id);
              window.eventBus.emit( stdEvents.addUserToChat, ( user_id));

              ( this.children.dialog.children.input.element as HTMLInputElement).value = "";

              const element: HTMLElement | null = document.querySelector( '#a-dialog-add-chat-user');
              if ( element && element.popover)
                  element.hidePopover();   

              const menu: HTMLElement | null = document.querySelector( '#popMenu');
              if ( menu && menu.popover)
                  menu.hidePopover();   
                
              
            }
        },
      }),

      dialog_del: new Dialog({
        attrs: {
          id: 'a-dialog-del-chat-user',
          popover: "auto",
          class: 'a-dialog a-dialog-add-chat-user',
        },
        events: { 
            OnBeforeToggle: () => {
                  console.log('Окошко скоро откроется');
                  const datalist: HTMLInputElement = document.getElementById('users') as HTMLInputElement;

                  const chat_id = Store.getState().selectedItem;
                  if ( !chat_id)
                    return;

                  const users = new chatController().getChatUsers( chat_id, 0, 10);
                  console.log(users);

                  // if ( datalist) {
                  //   console.log('datalist exists');
                  //   users.forEach(element => {
                  //     const option = document.createElement('option');
                  //     option.value = element.id;
                  //     datalist.appendChild(option);                     
                  //   });
                  // }
  
                  //window.eventBus.emit( stdEvents.delUserFromChat)
                }
        },
        label: 'Укажите id пользователя',
        type: "text",
        list: "users",
        input_id: "userlist",
        button_text: 'Удалить',
        button_events: { 
            OnClick: () => {
                  console.log('Удалить пользователя');
                  //window.eventBus.emit( stdEvents.delUserFromChat)
                }
        },
      }),








      menu: ['menuItem1', 'menuItem2'],
      menuItem1: new Button({ 
        num: 1,
        attrs: {
          popovertarget: 'a-dialog-add-chat-user',
          class: "dropdown-item",
        },
        text: 'Добавить пользователя',
      }),

      menuItem2: new Button({ 
        num: 2, 
        attrs: { 
          popovertarget: 'a-dialog-del-chat-user',
          class: "dropdown-item",
        }, 
        text: 'Удалить пользователя'
      }),
    });
  }

  render() : DocumentFragment {
    return this.compile( menuButton( this.props.menu!.reduce(( acc, item)=>`${acc}{{{${item}}}}`,'') ), {...this.props, ...this.children});
  }
}
