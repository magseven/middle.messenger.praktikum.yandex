import {getCurrentPage, printFormData} from '../../modules/utils/common'
// import { initFormValidation } from '../../modules/utils/validation';
import {pageData} from '../../modules/utils/form_funcs';

import { Block, BlockProps } from "../../modules/block";

import { BlockEntry } from '../../modules/types'
import { blockData } from '../../models/page_data'

// //temporary
import input from '../input/input.tmpl'
import header from '../header/header.tmpl'
import avatar from '../avatar/avatar.tmpl'
import button from '../button/button.tmpl'

import Handlebars from 'handlebars';
Handlebars.registerPartial( 'input', input);
Handlebars.registerPartial( 'header', header);
Handlebars.registerPartial( 'avatar', avatar);
Handlebars.registerPartial( 'button', button);
class Index extends Block {
    constructor(props: BlockProps, data: BlockEntry) {
        super("section", {...props, 
            class: 'a-login-container',
            events: {
                click: (e: MouseEvent) => {
                  console.log('A Clicked');
                  e.preventDefault();
                  e.stopPropagation();
                }
              }            

        }); 
    }

    render() : DocumentFragment {
        const page = blockData[getCurrentPage()] || blockData.index;
        return this.compile( page.template, {menu: data.context.menu});
    }
}
  
function render(query: string, block: Index) {
    const root = document.querySelector(query);
    root!.replaceWith( block.getContent());
    return root;
}

const data = blockData[getCurrentPage()] || blockData.index;

const page = new Index( pageData(data.context), data);       
render(".app", page);

// setTimeout(() => {
//     page.setProps({
//         buttonText: 'Click me, please',
//     });
// }, 1000);

