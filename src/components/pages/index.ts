import {getCurrentPage, printFormData} from '../../modules/utils/common'
// import { initFormValidation } from '../../modules/utils/validation';
import {pageData} from '../../modules/utils/form_funcs';

import { Block, BlockProps } from "../../modules/block";

// import Input from '../input/input'
// import Button from '../button/Button'
// import Header from '../header/header'
// import Form from '../form/form'

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
        super("div", {...props, 
            class: 'a-login-container',
            events: {
                click: (e: MouseEvent) => {
                  console.log('A Clicked');
                  e.preventDefault();
                  e.stopPropagation();
                }
              }            

        }, data); 
    }

    render() : DocumentFragment {
        return this.compile( String(this.data.template), {menu: data.context.menu});
    }
}
  
function render(query: string, block: Index) {
      const root = document.querySelector(query);
      root!.appendChild(block.getContent());
      return root;
}

const data = blockData[getCurrentPage()] || blockData.index;
console.log( 'page', data);

const page = new Index( pageData(data.context), data);       
render(".app", page);

// setTimeout(() => {
//     page.setProps({
//         buttonText: 'Click me, please',
//     });
// }, 1000);

