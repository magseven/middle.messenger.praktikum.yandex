// import Handlebars from 'handlebars';
// // import button from '../button/button.tmpl'
// import form_input from '../form_input'
// import header from '../header'
// import chats_item from '../../modules/chats/components/bar_item/chats_bar_item.tmpl'
// import avatar from '../avatar'

// import {getCurrentPage, printFormData} from '../../modules/utils/common'
// import {pageData} from '../../models/page_data'
// import { initFormValidation } from '../../modules/utils/validation';

// //import EventBus from './event_bus';

// // Handlebars.registerPartial( 'button', button);
// Handlebars.registerPartial( 'form_input', form_input);
// Handlebars.registerPartial( 'header', header);
// Handlebars.registerPartial( 'chats_bar_item', chats_item);
// Handlebars.registerPartial( 'avatar', avatar);

// document.addEventListener( 'DOMContentLoaded', () => {
//     const name : string = getCurrentPage();    
//     console.log( 'currentPage', name);                

//     const page = pageData[name] || pageData.index;
//     const template = Handlebars.compile( page.template);

//     const root = document.querySelector('#app');
//     root.innerHTML = template( page.context);

//     if ( page.validate)
//         initFormValidation();

//     printFormData();
// })

import {getCurrentPage, printFormData} from '../../modules/utils/common'
// import { initFormValidation } from '../../modules/utils/validation';

import { Block, BlockProps } from "../../modules/block";
import Input from '../input/input'
import Button from '../button/Button'
import Header from '../header/header'
import Form from '../form/form'

import { BlockEntry } from '../../modules/types'
import { blockData } from '../../models/page_data'

// //temporary
import input from '../input/input.tmpl'
import header from '../header/header.tmpl'
import avatar from '../avatar'
import button from '../button/button.tmpl'

import Handlebars from 'handlebars';
Handlebars.registerPartial( 'input', input);
Handlebars.registerPartial( 'header', header);
Handlebars.registerPartial( 'avatar', avatar);
Handlebars.registerPartial( 'button', button);

class Page extends Block {
    constructor(props: BlockProps, data: BlockEntry) {
        super("div", props, data); 
    }

    render() : DocumentFragment {
//        console.log( 'template:', this.data.template);
        return this.compile( String(this.data.template), this.data.context);
    }
}
  
function render(query: string, block: Page) {
      const root = document.querySelector(query);
      root!.appendChild(block.getContent());
      return root;
}

const data = blockData[getCurrentPage()] || blockData.index;
console.log( 'page', data);

const page = new Page({ headerText: data.context.page_title, buttonText: data.context.button_text, buttonClass: "a-theme a-button a-theme-color",
                        header: new Header({ type: 'submit', className: 'a-theme a-header a-theme-color', text: 'text'}),
                        form: new Form({ type: 'submit', className: 'a-theme a-form a-theme-color', text: 'Button text',
                            input: new Input({ className: 'a-theme a-input a-theme-color'}), 
                            button: new Button({ type: 'submit', className: 'a-theme a-button a-theme-color', text: 'text'}) 
                        },),
                    }, data);       
render(".app", page);

//class="a-theme a-button a-theme-color
setTimeout(() => {
    page.setProps({
        buttonText: 'Click me, please',
    });
}, 1000);

// label=title_auth theme_icon="../static/images/cloud.png" theme_icon_descr="облако"
// <div class="a-theme a-header a-theme-color">
//     <img class="a-theme-icon" src={{ theme_icon }} width="32px" height="32px" alt="{{ theme_icon_descr}}">
//     <h2 class="a-header-title">{{ label }}</h2>
// </div>
