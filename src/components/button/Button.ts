import { Block, BlockProps } from "../../modules/block";
import { stdEvents } from "../../modules/types";
import buttonTemplate from './button.tmpl';
import {menuButton} from './button.tmpl';
import Dialog from '../dialog/dialog';
import {Input} from '../input/input';
import ComboBox from '../combobox/combobox';
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
        events: { 
            OnBeforeToggle: (event: Event ) => {
              if ( (event as ToggleEvent).newState != 'open')
                return;
              
              const chat_id = Store.getState().selectedItem;
              if ( !chat_id) {
                console.log('Чат не выбран!');
                event.preventDefault();
                return;
              }

              const user = this.children.dialog.children.input as Input;
              const datalist = user.datalist;
              if ( datalist)
                datalist.textContent = '';
              
              return;            
            },
        },
        label: 'Укажите id пользователя',
        type: "text",
        input_id: "add_user",
        input_autofocus: true,
        input_datalist: "users",
        input_events: {
          OnInput: () => {
                window.eventBus.emit( stdEvents.searchUser); 
          },
        },
        button_text: 'Добавить',
        button_events: { 
            OnClick: () => {              
              const user = this.children.dialog.children.input as Input;
              if ( !user || !user.value) {
                  console.log('Пользователь не выбран!');
                  return;
              }
  
              const user_id = user.selectedOption();
              if ( !user_id) {
                  console.log('Отсутствует id пользователя');
                  return;
              }                          
              
              window.eventBus.emit( stdEvents.addUserToChat, user_id); 
              user.value = '';
              const datalist = user.datalist;
              if ( datalist)
                datalist.textContent = '';

              this.hidePopOverMenu();
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
            OnBeforeToggle: (event: Event ) => {
              this.onBeforeToggle(event as ToggleEvent);
            }
        },
        select: true,
        button_text: 'Удалить',
        button_events: { 
            OnClick: () => {
                  console.log('Удалить пользователя');
                  const combobox = this.children.dialog_del.children.combobox as ComboBox;                  
                  if ( !combobox)
                    return;

                  if ( combobox.selectedId == -1) {
                    console.log('Пользователь не выбран!');
                    return;
                  }

                  window.eventBus.emit( stdEvents.delUserFromChat, { chat_id: Store.getState().selectedItem, user_id: combobox.selectedId});

                  combobox.element.textContent = "";
                  this.hidePopOverMenu();
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

  hidePopOverMenu() {
    const target = this.element.getAttribute( 'popovertarget');

    const menu: HTMLElement | null = document.querySelector( `#${target}`);
    if ( menu && menu.popover)
        menu.hidePopover();   
  }

  componentDidUnMount() {
    window.eventBus.off( stdEvents.searchUser, this.onSearchUser.bind( this));         
  }

  async componentDidMount() {
    window.eventBus.on( stdEvents.searchUser, this.onSearchUser.bind( this));         
  }

  async onSearchUser() {
    const el_input = ( this.children.dialog.children.input.element as HTMLInputElement);
    const searchText = el_input.value.trim();

    if (searchText.length < 2)
      return;

    const users = await new userController().search( searchText);
    this.showResults(users);
  }

  showResults( users: Record<string, string|number>[]) {
    const input: Input = this.children.dialog.children.input as Input;
    if ( !input)
      return;

    const datalist = input.datalist;
    console.log(datalist, users);

    if ( datalist) {
      datalist.id = 'users';
      datalist.innerHTML = '';
      users.forEach(element => {
        const option = document.createElement('option');
        option.dataset.id = String(element.id);
        option.value = String(element.login);
        datalist.appendChild(option);                     
      });

      datalist.style.display = 'block';
      datalist.style.position = 'absolute';
      datalist.style.zIndex = '1000';
    }                  
  }

  async onBeforeToggle( event: ToggleEvent ) {
    if ( event.newState != 'open')
      return;

    const user = this.children.dialog_del.children.combobox as ComboBox;
    if ( !user)
      return;

    const chat_id = Store.getState().selectedItem;
    if ( !chat_id) {
      console.log('Чат не выбран!');
      event.preventDefault();
      return;
    }

    user.selectedIndex = -1;

    const users: Record<string, string|number>[] = await new chatController().getChatUsers( chat_id, 0, 10);
    user.element.textContent = "";
    user.options = users;
  }
}

