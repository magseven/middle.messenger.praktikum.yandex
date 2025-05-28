import { Block, BlockProps } from "../../modules/block";
import { stdEvents } from "../../modules/types";
import buttonTemplate from './button.tmpl';
import {menuButton} from './button.tmpl';
import Dialog from '../dialog/dialog';
import { chatController } from "../../controllers/chatController";
import { userController } from "../../controllers/userController";
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
        input_id: "add_user",
        list: "add_users",
        input_events: {
          OnInput: () => {
                console.log('OnInput');
                window.eventBus.emit( stdEvents.searchUser); 
          },
        },
        button_text: 'Добавить',
        button_events: { 
            OnClick: () => {
              console.log('addChatUser', this.children);
              if ( !this.children.dialog.children.input)
                return;

              const user_id = ( this.children.dialog.children.input.element as HTMLInputElement).value;
              if ( !user_id) {
                console.log('Отсутствует user_id');
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
            },
        },
      }),

      dialog_del: new Dialog({
        attrs: {
          id: 'a-dialog-del-chat-user',
          popover: "auto",
          class: 'a-dialog a-dialog-add-chat-user',
        },
        events: { 
            OnBeforeToggle: async() => {
                  const datalist: HTMLInputElement = document.getElementById('users') as HTMLInputElement;
                  const chat_id = Store.getState().selectedItem;
                  if ( !chat_id)
                    return;

                  const users: Record<string, string|number>[] = await new chatController().getChatUsers( chat_id, 0, 10);
                  console.log('users', users);

                  if ( datalist) {
                    datalist.innerHTML = '';
                    console.log('datalist exists');
                    users.forEach(element => {
                      const option = document.createElement('option');
                      option.value = `${String(element.id)}-${element.login}`;
                      datalist.appendChild(option);                     
                    });
                  }                  
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
                  const value = (this.children.dialog_del.children.input.element as HTMLInputElement).value;
                  
                  window.eventBus.emit( stdEvents.delUserFromChat, { chat_id: Store.getState().selectedItem, user_id: value.split('-')[0]});

                  ( this.children.dialog.children.input.element as HTMLInputElement).value = "";

                  const element: HTMLElement | null = document.querySelector( '#a-dialog-del-chat-user');
                  if ( element && element.popover)
                      element.hidePopover();   

                  const menu: HTMLElement | null = document.querySelector( '#popMenu');
                  if ( menu && menu.popover)
                      menu.hidePopover();   
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

  componentDidUnMount() {
    console.log('dispatchComponentDidUnMount');
    window.eventBus.off( stdEvents.searchUser, this.onSearchUser.bind( this));         
  }

  async componentDidMount() {
    window.eventBus.on( stdEvents.searchUser, this.onSearchUser.bind( this));         
  }

  async onSearchUser() {
    console.log('onSearchUser');
    const el_input = ( this.children.dialog.children.input.element as HTMLInputElement);
    const searchText = el_input.value.trim();

    if (searchText.length < 2)
      return;

    try {
      const users: string[] = await new userController().search( searchText);
      this.showResults(users);
    }catch (error) {
      console.error('Ошибка поиска:', error);
    }
  }

  showResults( users: string[]) {
    console.log('showResults');
    const datalist: HTMLInputElement = document.getElementById('users') as HTMLInputElement;
    document.getElementById('add_user')?.click();
    if ( datalist) {
      datalist.id = 'add_users';
      datalist.innerHTML = '';
      users.forEach(element => {
        console.log( element);
        const option = document.createElement('option');
        option.value = element;
        datalist.appendChild(option);                     
      });
      datalist.style.display = 'block';
      datalist.style.position = 'absolute';
      datalist.style.zIndex = '1000';
    }                  

  }
}
