import index from '../components/pages/templates/index.tmpl'
import login from '../components/pages/templates/login.tmpl'
import profile from '../components/pages/templates/profile.tmpl'
import signup from '../components/pages/templates/signup.tmpl'
import error_page from '../components/pages/templates/error_page.tmpl'
import chats from '../components/pages/templates/chat.tmpl'
import {stdEvents} from '../modules/types'
import {router, stdRoutes} from '../modules/router'
import imgAvatar from '../static/images/avatar.svg'
import { BlockEntry } from "../modules/types"


export const blockData: Record<string, BlockEntry> = {
    index: {
        template: index,
        validate: false,
        context: {
            nav: {
                proto: 'Nav',
                attrs: {
                    class: 'a-login-container',
                },
                menu:
                [
                    [ 'login', 'Авторизация'], 
                    [ 'profile', 'Профиль'], 
                    [ 'signup', 'Регистрация'], 
                    [ 'chats', 'Список чатов'],
                    [ 'page_404', 'Страница 404'],
                    [ 'page_500', 'Страница 500'],
                ],
                heading: { proto: 'Heading', text: 'Sprint_2'},
            },    
        }
    }, 
    login: {
        template: login,
        validate: true,
        context: {
            name: 'SignIn',
            header: { proto: 'Header', title: "Авторизация"},
            attrs: {class: 'a-login-container'},
            form: {
                proto: 'Form',
                name: 'form',
                login: { proto: 'Input_F', label: 'Логин', type: "text", placeholder: 'Укажите логин'},
                password: { proto: 'Input_F', type: "password", label: 'Пароль', placeholder: 'Укажите пароль'}, 
                button: { 
                    proto: 'Button', 
                    text: 'Войти', 
                    attrs: { 
                        type: 'button', 
                        class: 'a-button'
                    }, 
                },
            },
        }, 
    },
    profile: {
        template: profile,
        validate: true,
        context: {
            name: 'Profile',
            header: { 
                proto: 'Header',
                title: 'Профиль пользователя',
            },
            attrs: {class: 'a-login-container'},
            form: {
                proto: 'Form',
                avatar: { 
                    proto: 'Avatar',
                    attrs : { class: 'a-avatar'}, 
                    a_image: {
                        proto: 'Img',
                        attrs: {
                            src: imgAvatar,
                            alt: "Аватар",
                        },          
                    }, 
                    a_input: {
                        proto: 'Input',
                        attrs: {
                            type: 'file',
                            accept: 'image/*',
                            // width: '200px',
                            // height: '200px',
                            hidden: 'true',
                        },
                        events: {
                            OnChange: (e: Event) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log('onchange');                                
                                window.eventBus.emit( stdEvents.changeAvatar);
                            },
                        },
                    },
                },
                first_name: { proto: 'Input_F', type: "text", name: 'first_name', placeholder: 'Имя'},
                second_name: { proto: 'Input_F', type: "text", name: 'second_name', placeholder: 'Фамилия'}, 
                display_name: { proto: 'Input_F', type: "text", name: 'display_name', placeholder: 'Псевдоним'}, 
                login: { proto: 'Input_F', type: "text", name: 'login', placeholder: 'Логин'}, 
                email: { proto: 'Input_F', type: "text", name: 'email', placeholder: 'email'}, 
                phone: { proto: 'Input_F', type: "text", name: 'phone', placeholder: 'Телефон'}, 
                oldPassword: { proto: 'Input_F', type: "password", name: 'oldPassword', placeholder: 'Старый пароль'}, 
                newPassword: { proto: 'Input_F', type: "password", name: 'newPassword', placeholder: 'Новый пароль'}, 
                button: { proto: 'Button', text: 'Сохранить', attrs: {class: 'a-button', type:'button'}, 
                    events: {
                        OnClick: () => {
                            console.log( 'profile button click');
                            window.eventBus.emit( stdEvents.updateProfile);
                        }
                    },
                },
            },
            logout: { proto: 'Button', attrs: {type: "submit", class: 'a-button'}, text: 'Logout', events: {
                    OnClick: () => {
                            window.eventBus.emit( stdEvents.logout);
                    }
                },},
        },
    }, 
    signup: {
        template: signup,
        validate: true,
        context: {
            name: 'SignUp',
            header: { 
                proto: 'Header',
                title: 'Регистрация пользователя'
            },
            attrs: {class: 'a-login-container'},
            form: {
                proto: 'Form',
                first_name: { proto: 'Input_F', type: "text", name: 'first_name', placeholder: 'Имя'},
                second_name: { proto: 'Input_F', type: "text", name: 'second_name', placeholder: 'Фамилия'}, 
                login: { proto: 'Input_F', type: "text", name: 'login', placeholder: 'Логин'}, 
                email: { proto: 'Input_F', type: "text", name: 'email', placeholder: 'email'}, 
                password: { proto: 'Input_F', type: "password", name: 'password', placeholder: 'Пароль'}, 
                phone: { proto: 'Input_F', type: "text", name: 'phone', placeholder: 'Телефон'}, 
                button: { proto: 'Button', attrs: { type: "submit", class: 'a-button'},text: 'Зарегистрировать'}, 
                button1: { 
                    proto: 'Button', 
                    attrs: { class: 'a-button'},  
                    events: {
                        OnClick: () => {
                            console.log('Создать пользователя');
                        }
                    },
                    text: 'Войти'
                }, 
            },
        },
    }, 
    page_404: {
        template: error_page,
        context: {
            attrs: {class: 'a-special-page'},
            heading: { proto: 'Heading', text: '404'},
            paragraph: { proto: 'Paragraph', text:"Не туда попали" },
            link: { proto: 'Link', attrs: { href: "index.html"}, text: "назад"},
        },
    }, 
    page_500: {
        template: error_page,
        context: {
            attrs: {class: 'a-special-page'},
            heading: { proto: 'Heading', text: '500'},
            paragraph: { proto: 'Paragraph', text:"Уже исправляем" },
            link: { proto: 'Link', attrs: { href: "index.html"}, text: "назад"},
        },
    }, 
    chats: {
        template: chats,
        validate: true,
        context: {
            chat: {
                proto: 'Chat',
                frame: { 
                    proto: 'ChatFrame', 
                    content: { 
                        proto: 'ChatContent',
                        header: { 
                            proto: 'ChatContentHeader',
                        },
                        content: { 
                            proto: 'ChatContentItems',
                            data: [
                                { dir: '0', message: 'У меня есть предложение'},    
                                { dir: '1', message: 'Огромное количество'},    
                                { dir: '0', message: 'Оптовая продажа пылесосов и микроволновых печей'}
                            ],    
                        },
                        footer: { 
                            proto: 'ChatContentFooter',
                        },
                    },


                    bar: { 
                        proto: 'ChatBar',
                        btitle: { 
                            proto: 'ChatBarTitle',
                            chat: {
                                proto: 'Div',                             
                                attrs: { class: 'a-chat-bar-title-link'}, 
                                content: 'Создать чат&nbsp;&nbsp;>',
                                events: { 
                                    OnClick: () => { window.eventBus.emit( stdEvents.createChat);}
                                }
                            },
                            link: {
                                proto: 'Div',                             
                                attrs: { class: 'a-chat-bar-title-link'}, 
                                content: 'Профиль&nbsp;&nbsp;>',
                                events: { 
                                    OnClick: () => {router.go( stdRoutes.Profile)}
                                }
                            },
                        },

                        bsearch: { 
                            proto: 'ChatBarSearch', 
                            searchField: { proto: 'Input', 
                                attrs: { 
                                    type: 'text', class: 'a-chat-bar-search-field', placeholder: 'Поиск'
                                },
                            },
                        },
                        blist: { 
                            proto: 'ChatBarList',
                            data: [
                                { id: '1', title: 'Игорь', date:  '15.04.25', message: 'У меня есть предложение', unread: '18'},    
                                { id: '2', title: 'Светлана', date:  '25.03.25', message: 'Огромное количество', unread: '28'},    
                                { id: '3', title: 'Василий', date:  '25.03.25', message: 'Оптовая продажа пылесосов и микроволновых печей', unread: '28'},
                            ],    
                        },            
                    },
                },
            }            
        }
    }
};

