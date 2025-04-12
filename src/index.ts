import Handlebars from 'handlebars';
import button from './templates/button.tmpl'
import form_input from './templates/form_input.tmpl'
import header from './templates/header.tmpl'
import chats_item from './templates/chats_item.tmpl'
import index from './templates/index.tmpl'
import login from './templates/login.tmpl'
import chats from './templates/chats.tmpl'

import {getCurrentPage} from './utils/common'

Handlebars.registerPartial( 'button', button);
Handlebars.registerPartial( 'form_input', form_input);
Handlebars.registerPartial( 'header', header);
Handlebars.registerPartial( 'chats_item', chats_item);

document.addEventListener( 'DOMContentLoaded', () => {
    const data: {[key: string]: {[key: string]: any}} = {
        index: {
            template: index,
            context: {
                menu : [
                    [ 'login', 'Авторизация'], 
                    [ 'signin', 'Регистрация'], 
                    [ 'chats', 'Список чатов'],
                    [ 'page_404', 'Страница 404'],
                    [ 'page_500', 'Страница 500'],
                ]        
            }
        }, 
        login: {
            template: login,
            context: {},
        }, 
        chats: {
            template: chats,
            context: {
                chats: [
                    {
                        title:  'Чат1',
                        date:   '15.04.25',
                        message:'message1',
                        unread: 23,
                    },
                    {
                        title:  'Чат2',
                        date:   '05.04.25',
                        message:'message7',
                        unread: 2,
                    },
                    {
                        title:  'Чат2',
                        date:   '10.03.25',
                        message:'message10',
                        unread: 13,
                    },
                ]
            }
        }
    };

    const currentPage : string = getCurrentPage();    
    console.log( 'currentPage', currentPage);                

    const currentTemplate : string | undefined = data[currentPage].template || index;
    const template = Handlebars.compile( currentTemplate);

    const root = document.querySelector('#app');
    root.innerHTML = template(data[currentPage].context);
})

