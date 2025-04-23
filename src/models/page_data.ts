import index from '../components/pages/templates/index.tmpl'
import login from '../components/pages/login.tmpl'
import profile from '../components/pages/templates/profile.tmpl'
import signin from '../components/pages/templates/signin.tmpl'
import page_404 from '../components/pages/templates/page_404.tmpl'
import page_500 from '../components/pages/templates/page_500.templ'
import chats from '../modules/chats/chats.tmpl'

import { BlockEntry } from "../modules/types"


export const blockData: Record<string, BlockEntry> = {
//export const pageData: {[key: string]: {[key: string]: any}} = {
    index: {
        template: index,
        validate: false,
        context: {
            menu : [
                [ 'login', 'Авторизация'], 
                [ 'profile', 'Профиль'], 
                [ 'signin', 'Регистрация'], 
                [ 'chats', 'Список чатов'],
                [ 'page_404', 'Страница 404'],
                [ 'page_500', 'Страница 500'],
            ]        
        }
    }, 
    login: {
        template: login,
        validate: true,
        context: {
            page_title: 'Авторизация',
            form_name: 'form',
            button_text: 'Войти',
            header: { title: "ssdf", className: 'a-header'},
            form: {
                name: { proto: 'Input', type: "text", placeholder: 'введите&nbspфамилию'},
                fname: { proto: 'Input', type: "text", placeholder: 'введите&nbspфамилию'}, 
                button: { proto: 'Button', type: "submit", text: 'Войти'}, 
            },
        },
    }, 
    profile: {
        template: profile,
        validate: true,
        context: {},
    }, 
    signin: {
        template: signin,
        validate: true,
        context: {},
    }, 
    page_404: {
        template: page_404,
        context: {},
    }, 
    page_500: {
        template: page_500,
        context: {},
    }, 
    chats: {
        template: chats,
        validate: true,
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
