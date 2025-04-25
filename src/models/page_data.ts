import index from '../components/pages/templates/index.tmpl'
import login from '../components/pages/templates/login.tmpl'
import profile from '../components/pages/templates/profile.tmpl'
import signin from '../components/pages/templates/signin.tmpl'
import page_404 from '../components/pages/templates/page_404.tmpl'
import page_500 from '../components/pages/templates/page_500.templ'
import chats from '../modules/chats/chats.tmpl'

import { BlockEntry } from "../modules/types"


export const blockData: Record<string, BlockEntry> = {
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
            header: { title: "Авторизация"},
            form: {
                login: { proto: 'Input', label: 'Логин', type: "text", placeholder: 'Укажите&nbspлогин'},
                password: { proto: 'Input', type: "text", label: 'Пароль', placeholder: 'Укажите&nbspпароль'}, 
                button: { proto: 'Button', attrs: { type: "submit"}, text: 'Войти'}, 
            },
        },
    }, 
    profile: {
        template: profile,
        validate: true,
        context: {
            page_title: 'Профиль пользователя',
            form_name: 'form',
            header: { 
                title: 'Профиль пользователя',
            },
            form: {
                avatar: { proto: 'Avatar', type: "submit", text: 'Сохранить'},
                first_name: { proto: 'Input', type: "text", placeholder: 'Имя'},
                second_name: { proto: 'Input', type: "text", placeholder: 'Фамилия'}, 
                display_name: { proto: 'Input', type: "text", placeholder: 'Псевдоним'}, 
                login: { proto: 'Input', type: "text", placeholder: 'Логин'}, 
                email: { proto: 'Input', type: "text", placeholder: 'email'}, 
                phone: { proto: 'Input', type: "text", placeholder: 'Телефон'}, 
                oldPassword: { proto: 'Input', type: "text", placeholder: 'Старый&nbspпароль'}, 
                newPassword: { proto: 'Input', type: "text", placeholder: 'Новый&nbspпароль'}, 
                button: { proto: 'Button', type: "submit", text: 'Сохранить'},
            },
        },
    }, 
    signin: {
        template: signin,
        validate: true,
        context: {
            page_title: 'Регистрация пользователя',
            form_name: 'form',
            header: { title: 'Регистрация пользователя'},
            form: {
                first_name: { proto: 'Input', type: "text", placeholder: 'Имя'},
                second_name: { proto: 'Input', type: "text", placeholder: 'Фамилия'}, 
                login: { proto: 'Input', type: "text", placeholder: 'Логин'}, 
                email: { proto: 'Input', type: "text", placeholder: 'email'}, 
                password: { proto: 'Input', type: "text", placeholder: 'Пароль'}, 
                phone: { proto: 'Input', type: "text", placeholder: 'Телефон'}, 
                button: { proto: 'Button', attrs: { type: "submit"}, text: 'Зарегистрировать'}, 
                button1: { proto: 'Button', attrs: { type: "button", name: 'button1'}, text: 'Войти'}, 
            },
        },
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
