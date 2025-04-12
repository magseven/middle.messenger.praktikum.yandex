import Handlebars from 'handlebars';
import button from './templates/button.tmpl'
import form_input from './templates/form_input.tmpl'
import header from './templates/header.tmpl'
import index from './templates/index.tmpl'
import login from './templates/login.tmpl'

import {getCurrentPage} from './utils/common'

Handlebars.registerPartial( 'button', button);
Handlebars.registerPartial( 'form_input', form_input);
Handlebars.registerPartial( 'header', header);

document.addEventListener( 'DOMContentLoaded', () => {
    const context : {
        templates: {[key: string]: string},
        menu: string[][]
    } = {
        templates : { index, login},
        menu : [
            [ 'login', 'Авторизация'], 
            [ 'signin', 'Регистрация'], 
            [ 'chats', 'Список чатов'],
            [ 'page_404', 'Страница 404'],
            [ 'page_500', 'Страница 500'],
        ]
    };
    
    const currentPage : string = getCurrentPage();    

    const currentTemplate : string | undefined = context.templates[currentPage] || index;

    console.log( 'currentPage', currentPage);                
    console.log('templ =', currentTemplate[1]);

    const template = Handlebars.compile( currentTemplate[1]);

    const result = () => {
        if ( currentPage === 'index') {
            return template(context.menu);
        }else{
            return template();
        }
    };

    console.log( 'result:', result);                
    const root = document.querySelector('#app');
    root.innerHTML = result();
    
})

// const template = Handlebars.compile(button);
// const result = template({ type: 'button', label: 'Eugene Orlovsky'});
//const r = { "items": [ "Yehuda Katz", "Alan Johnson", "Charles Jolley", ] };
//const r1 = [ "Yehuda Katz", "Alan Johnson", "Charles Jolley", ];
