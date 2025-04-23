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
import Button from "../button/Button";
import Header from "../header/header";

import { BlockEntry } from '../../modules/types'
import { blockData } from '../../models/page_data'

//temporary
import form_input from '../input/input.tmpl'
import header from '../header/header.tmpl'
import avatar from '../avatar'

import Handlebars from 'handlebars';
Handlebars.registerPartial( 'form_input', form_input);
Handlebars.registerPartial( 'header', header);
Handlebars.registerPartial( 'avatar', avatar);

class Page extends Block {
    constructor(props: BlockProps, data: BlockEntry) {
        super("div", {...props, button: new Button({ text: props.buttonText, class: props.buttonClass}),
                                header: new Header({ text: props.headerText, 
                                                     icon_descr: props.theme_icon_descr, 
                                                     icon: props.theme_icon,
                                                     class: "a-theme a-header a-theme-color"})}, data);       
    }

    render() : DocumentFragment {
        return this.compile( String(this.data.template), this.data.context);
    }
}
  
function render(query: string, block: Page) {
      const root = document.querySelector(query);
      root!.appendChild(block.getContent());
      return root;
}

//const name : string = getCurrentPage();    
//console.log( 'currentPage', name);                
//console.log( 'currentPage', getCurrentPage());
const data = blockData[getCurrentPage()] || blockData.index;

console.log( 'page', data);

const page = new Page({ headerText: data.context.page_title, buttonText: data.context.button_text, buttonClass: "a-theme a-button a-theme-color",
                        button: new Button({}), 
                        header: new Header({})}, data);       
render(".app", page);

/*
setTimeout(() => {
    page.setProps({
        buttonText: 'Click me, please',
    });
}, 1000);
*/
