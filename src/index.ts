import Handlebars from 'handlebars';
import button from './templates/button.tmpl'
import form_input from './templates/form_input.tmpl'
import header from './templates/header.tmpl'
import index from './templates/index.tmpl'
import login from './templates/login.tmpl'

Handlebars.registerPartial( 'button', button);
Handlebars.registerPartial( 'form_input', form_input);
Handlebars.registerPartial( 'header', header);

document.addEventListener( 'DOMContentLoaded', () => {
   const getCurrentPageName = (): string => {
       const str = window.location.pathname.split('/').filter(part => part !== '');
       return !str.length ? "index" : str[str.length - 1];
   };


    const context = {
        templates : [[ 'index', index], [ 'login', login]],
        menu : [
                    [ 'login', 'Авторизация'], 
                    [ 'signin', 'Регистрация'], 
                    [ 'chats', 'Список чатов'],
                    [ 'page_404', 'Страница 404'],
                    [ 'page_500', 'Страница 500'],
                ]};
    
//    const template = Handlebars.compile( index);
//    const result = template( context.menu);
    
    const currentPage = getCurrentPageName();    
    const currentTemplate = context.templates.find(template => template[0] === currentPage);
    console.log( 'currentPage', currentPage);                
    console.log('templ:', currentTemplate[1]);
    console.log('index:', index);

    const template = Handlebars.compile( currentTemplate);

    var result;
    if ( currentTemplate === index)
        result = template( context.menu);
    else
        result = template();

    console.log( 'result', result);                
    const root = document.querySelector('#app');
    root.innerHTML = result;
    
})

// const template = Handlebars.compile(button);
// const result = template({ type: 'button', label: 'Eugene Orlovsky'});
//const r = { "items": [ "Yehuda Katz", "Alan Johnson", "Charles Jolley", ] };
//const r1 = [ "Yehuda Katz", "Alan Johnson", "Charles Jolley", ];
