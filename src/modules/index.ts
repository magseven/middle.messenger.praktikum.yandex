import Handlebars from 'handlebars';
import button from '../components/button'
import form_input from '../components/form_input'
import header from '../components/header'
import chats_item from './chats/components/bar_item/chats_bar_item.tmpl'
import avatar from '../components/avatar'

// import index from './components'
// import login from './components/login'
// import profile from './components/profile'
// import signin from './components/signin'
// import page_404 from './components/page_404'
// import page_500 from './components/page_500'
// import chats from './modules/chats/chats.tmpl'

import {getCurrentPage} from './utils/common'
import {pageData} from '../models/page_data'

Handlebars.registerPartial( 'button', button);
Handlebars.registerPartial( 'form_input', form_input);
Handlebars.registerPartial( 'header', header);
Handlebars.registerPartial( 'chats_item', chats_item);
Handlebars.registerPartial( 'avatar', avatar);

document.addEventListener( 'DOMContentLoaded', () => {
    // const data: {[key: string]: {[key: string]: any}} = {
    //     index: {
    //         template: index,
    //         context: {
    //             menu : [
    //                 [ 'login', 'Авторизация'], 
    //                 [ 'profile', 'Профиль'], 
    //                 [ 'signin', 'Регистрация'], 
    //                 [ 'chats', 'Список чатов'],
    //                 [ 'page_404', 'Страница 404'],
    //                 [ 'page_500', 'Страница 500'],
    //             ]        
    //         }
    //     }, 
    //     login: {
    //         template: login,
    //         context: {
    //             page_title: 'Авторизация',
    //         },
    //     }, 
    //     profile: {
    //         template: profile,
    //         context: {},
    //     }, 
    //     signin: {
    //         template: signin,
    //         context: {},
    //     }, 
    //     page_404: {
    //         template: page_404,
    //         context: {},
    //     }, 
    //     page_500: {
    //         template: page_500,
    //         context: {},
    //     }, 
    //     chats: {
    //         template: chats,
    //         context: {
    //             chats: [
    //                 {
    //                     title:  'Чат1',
    //                     date:   '15.04.25',
    //                     message:'message1',
    //                     unread: 23,
    //                 },
    //                 {
    //                     title:  'Чат2',
    //                     date:   '05.04.25',
    //                     message:'message7',
    //                     unread: 2,
    //                 },
    //                 {
    //                     title:  'Чат2',
    //                     date:   '10.03.25',
    //                     message:'message10',
    //                     unread: 13,
    //                 },
    //             ]
    //         }
    //     }
    // };

    const currentPage : string = getCurrentPage();    
    console.log( 'currentPage', currentPage);                

    const currentTemplate : string | undefined = pageData[currentPage].template || index;
    const template = Handlebars.compile( currentTemplate);

    const root = document.querySelector('#app');
    root.innerHTML = template(pageData[currentPage].context);
})

