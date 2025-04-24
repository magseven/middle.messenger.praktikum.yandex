//import {getCurrentPage, printFormData} from '../../modules/utils/common'
// import { initFormValidation } from '../../modules/utils/validation';

import { BlockEntry } from "../../modules/types";

import { Block, BlockProps } from "../../modules/block";
import Button from "../button/Button";
// import Header from "../header/header";
// import Form from "../form/form";
// import Input from "../input/input";
import loginTemplate from './templates/login.tmpl';

import { blockData } from '../../models/page_data'

//temporary
import form from '../form/form.tmpl'
import input from '../input/input.tmpl'
import header from '../header/header.tmpl'
import avatar from '../avatar/avatar.tmpl'
import button from '../button/button.tmpl'

import Handlebars from 'handlebars';
Handlebars.registerPartial( 'input', input);
Handlebars.registerPartial( 'header', header);
Handlebars.registerPartial( 'avatar', avatar);
Handlebars.registerPartial( 'button', button);
Handlebars.registerPartial( 'form', form);

class Login extends Block {
    constructor(props: BlockProps, data: BlockEntry) {
        super("section", {...props, button: new Button({})}, data);       
        
        //this.children.button = new Button({});
        
//        form: new Form({ children: { button: new Button({ text: props.buttonText, class: props.buttonClass})},})
                        //}
            /*
                                header: new Header({ text: props.headerText, 
                                                     icon_descr: props.theme_icon_descr, 
                                                     icon: props.theme_icon,
                                                     class: "a-theme a-header a-theme-color"}),
                                form: new Form({ children: { button: new Button({ text: props.buttonText, class: props.buttonClass})},
                                class: "a-theme a-header a-theme-color"}) */                                                    
    }

    componentDidUpdate(oldProps, newProps) {
        if (oldProps.buttonText !== newProps.buttonText) {
            this.children.button.setProps({ text: newProps.buttonText });
        }

        return true;
    }

    render() : DocumentFragment {
        return this.compile( loginTemplate, {}/*this.data.context*/);
    }
}
  
/*
function render(query: string, block: Login) {
    const root = document.querySelector(query);
    console.log( block.getContent());      
    root!.appendChild(block.getContent());
    return root;
}

const data = blockData['login'] || blockData.index;
const page = new Login({ headerText: data.context.page_title, buttonText: data.context.button_text, buttonClass: "a-theme a-button a-theme-color" }, data); 

render(".app", page);

/*
setTimeout(() => {
    page.setProps({
        buttonText: 'Click me, please',
    });
}, 1000);
*/
