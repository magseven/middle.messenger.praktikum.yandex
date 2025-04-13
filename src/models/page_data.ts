import index from '../components/index'
import login from '../components/login'
import profile from '../components/profile'
import signin from '../components/signin'
import page_404 from '../components/page_404'
import page_500 from '../components/page_500'
import chats from '../modules/chats/chats.tmpl'

export const pageData: {[key: string]: {[key: string]: any}} = {
    index: {
        template: index,
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
        context: {
            page_title: 'Авторизация',
        },
    }, 
    profile: {
        template: profile,
        context: {},
    }, 
    signin: {
        template: signin,
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
