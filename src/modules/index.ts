import Handlebars from 'handlebars';
import button from '../components/button'
import form_input from '../components/form_input'
import header from '../components/header'
import chats_item from './chats/components/bar_item/chats_bar_item.tmpl'
import avatar from '../components/avatar'

import {getCurrentPage, printFormData} from './utils/common'
import {pageData} from '../models/page_data'
import { initFormValidation } from './utils/validation';

import EventBus from './event_bus';

Handlebars.registerPartial( 'button', button);
Handlebars.registerPartial( 'form_input', form_input);
Handlebars.registerPartial( 'header', header);
Handlebars.registerPartial( 'chats_bar_item', chats_item);
Handlebars.registerPartial( 'avatar', avatar);

document.addEventListener( 'DOMContentLoaded', () => {
    const name : string = getCurrentPage();    
    console.log( 'currentPage', name);                

    const page = pageData[name] || pageData.index;
    const template = Handlebars.compile( page.template);

    const root = document.querySelector('#app');
    root.innerHTML = template( page.context);

    if ( page.validate)
        initFormValidation();

    window.bus = EventBus;

    printFormData();
})

