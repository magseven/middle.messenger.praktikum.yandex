import index from '../components/pages/templates/index.tmpl'
import login from '../components/pages/templates/login.tmpl'
import profile from '../components/pages/templates/profile.tmpl'
import signin from '../components/pages/templates/signin.tmpl'
import error_page from '../components/pages/templates/error_page.tmpl'
import chats from '../modules/chats/chats.tmpl'

import { BlockEntry, defForm } from "../modules/types"


export const blockData: Record<string, BlockEntry> = {
    index: {
        template: index,
        validate: false,
        context: {
            nav: [
                [ 'login', 'Авторизация'], 
                [ 'profile', 'Профиль'], 
                [ 'signin', 'Регистрация'], 
                [ 'chats', 'Список чатов'],
                [ 'page_404', 'Страница 404'],
                [ 'page_500', 'Страница 500'],
            ],    
            heading: { proto: 'Heading', text: 'Sprint_2'},
            paragraph: { proto: 'Paragraph', text:"Не туда попали" },
            link: { proto: 'Link', attrs: { href: "index.html"}, text: "назад"},
        }
    }, 
    login: {
        template: login,
        validate: true,
        context: {
            page_title: 'Авторизация',
            form_name: 'form',
            header: { proto: 'Header', title: "Авторизация"},
            form: {
                proto: 'Form',
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
                avatar: { proto: 'Avatar', type: "submit", name: 'avatar', text: 'Сохранить'},
                first_name: { proto: 'Input', type: "text", name: 'first_name', placeholder: 'Имя'},
                second_name: { proto: 'Input', type: "text", name: 'second_name', placeholder: 'Фамилия'}, 
                display_name: { proto: 'Input', type: "text", name: 'display_name', placeholder: 'Псевдоним'}, 
                login: { proto: 'Input', type: "text", name: 'login', placeholder: 'Логин'}, 
                email: { proto: 'Input', type: "text", name: 'email', placeholder: 'email'}, 
                phone: { proto: 'Input', type: "text", name: 'phone', placeholder: 'Телефон'}, 
                oldPassword: { proto: 'Input', type: "text", name: 'oldPassword', placeholder: 'Старый&nbspпароль'}, 
                newPassword: { proto: 'Input', type: "text",name: 'newPassword', placeholder: 'Новый&nbspпароль'}, 
                button: { proto: 'Button', attrs: {type: "submit"}, text: 'Сохранить'},
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
                first_name: { proto: 'Input', type: "text", name: 'first_name', placeholder: 'Имя'},
                second_name: { proto: 'Input', type: "text", name: 'second_name', placeholder: 'Фамилия'}, 
                login: { proto: 'Input', type: "text", name: 'login', placeholder: 'Логин'}, 
                email: { proto: 'Input', type: "text", name: 'email', placeholder: 'email'}, 
                password: { proto: 'Input', type: "text", name: 'password', placeholder: 'Пароль'}, 
                phone: { proto: 'Input', type: "text", name: 'phone', placeholder: 'Телефон'}, 
                button: { proto: 'Button', attrs: { type: "submit"},text: 'Зарегистрировать'}, 
                button1: { proto: 'Button', /*attrs: { type: "button", name: 'button2'},*/ text: 'Войти'}, 
            },
        },
    }, 
    page_404: {
        template: error_page,
        context: {
            heading: { proto: 'Heading', text: '404'},
            paragraph: { proto: 'Paragraph', text:"Не туда попали" },
            link: { proto: 'Link', attrs: { href: "index.html"}, text: "назад"},
        },
    }, 
    page_500: {
        template: error_page,
        context: {
            heading: { proto: 'Heading', text: '500'},
            paragraph: { proto: 'Paragraph', text:"Уже исправляем" },
            link: { proto: 'Link', attrs: { href: "index.html"}, text: "назад"},
        },
    }, 
    chats: {
        template: chats,
        validate: true,
        context: {
            page_title: 'Sprint_2',
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

