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
import {pageData} from '../../modules/utils/form_funcs';

import { Block, BlockProps } from "../../modules/block";

import { BlockEntry } from '../../modules/types'
import { blockData } from '../../models/page_data'
class Page extends Block {
    constructor(props: BlockProps, data: BlockEntry) {
        super("section", {...props,
                            attrs: {
                               class: 'a-login-container',
                            },
                            // events: {
                            //     click: (e: MouseEvent) => {
                            //       console.log('A Clicked');
                            //     //   e.preventDefault();
                            //     //   e.stopPropagation();
                            //     },
                            //     submit: (e: SubmitEvent) => {
                            //     console.log('submit Event');
                            //     printFormData();
                            //     e.preventDefault();
                            //     e.stopPropagation();
                            //     },
                            // },
                        }); 
    }

    render() : DocumentFragment {
        const page = blockData[getCurrentPage()] || blockData.index;
        return this.compile( page.template, this.props);
    }
}
  
function render(query: string, block: Page) {
      const root = document.querySelector(query);
      root!.replaceWith(block.getContent());
      return root;
}

const data = blockData[getCurrentPage()] || blockData.index;
//console.log( 'page', getCurrentPage(), data);

const page = new Page( pageData(data.context), data);       
render(".app", page);

// setTimeout(() => {
//     page.setProps({
//         buttonText: 'Click me, please',
//     });
// }, 1000);
