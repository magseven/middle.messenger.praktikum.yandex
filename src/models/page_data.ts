import index from '../components/pages/templates/index.tmpl'
import login from '../components/pages/templates/login.tmpl'
import profile from '../components/pages/templates/profile.tmpl'
import signin from '../components/pages/templates/signin.tmpl'
import error_page from '../components/pages/templates/error_page.tmpl'
import chats from '../components/pages/templates/chat.tmpl'

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
                    [ 'signin', 'Регистрация'], 
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
            header: { proto: 'Header', title: "Авторизация"},
            attrs: {class: 'a-login-container'},
            form: {
                proto: 'Form',
                login: { proto: 'Input_F', label: 'Логин', type: "text", placeholder: 'Укажите&nbspлогин'},
                password: { proto: 'Input_F', type: "text", label: 'Пароль', placeholder: 'Укажите&nbspпароль'}, 
                button: { proto: 'Button', attrs: { type: "submit"}, text: 'Войти'}, 
            },
        },
    }, 
    profile: {
        template: profile,
        validate: true,
        context: {
            header: { 
                proto: 'Header',
                title: 'Профиль пользователя',
            },
            attrs: {class: 'a-login-container'},
            form: {
                proto: 'Form',
                avatar: { proto: 'Avatar', type: "submit", name: 'avatar', text: 'Сохранить'},
                first_name: { proto: 'Input_F', type: "text", name: 'first_name', placeholder: 'Имя'},
                second_name: { proto: 'Input_F', type: "text", name: 'second_name', placeholder: 'Фамилия'}, 
                display_name: { proto: 'Input_F', type: "text", name: 'display_name', placeholder: 'Псевдоним'}, 
                login: { proto: 'Input_F', type: "text", name: 'login', placeholder: 'Логин'}, 
                email: { proto: 'Input_F', type: "text", name: 'email', placeholder: 'email'}, 
                phone: { proto: 'Input_F', type: "text", name: 'phone', placeholder: 'Телефон'}, 
                oldPassword: { proto: 'Input_F', type: "text", name: 'oldPassword', placeholder: 'Старый&nbspпароль'}, 
                newPassword: { proto: 'Input_F', type: "text", name: 'newPassword', placeholder: 'Новый&nbspпароль'}, 
                button: { proto: 'Button', attrs: {type: "submit"}, text: 'Сохранить'},
            },
        },
    }, 
    signin: {
        template: signin,
        validate: true,
        context: {
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
                password: { proto: 'Input_F', type: "text", name: 'password', placeholder: 'Пароль'}, 
                phone: { proto: 'Input_F', type: "text", name: 'phone', placeholder: 'Телефон'}, 
                button: { proto: 'Button', attrs: { type: "submit"},text: 'Зарегистрировать'}, 
                button1: { proto: 'Button', /*attrs: { type: "button", name: 'button2'},*/ text: 'Войти'}, 
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
                        bar: { 
                                proto: 'ChatBar',
                                btitle: { 
                                    proto: 'ChatBarTitle',
                                    link: { proto: 'Link', attrs: { class: 'a-chat-bar-title-link', href: '#'}, text: 'Профиль&nbsp;&nbsp;'}
                                },
                                bsearch: { 
                                    proto: 'ChatBarSearch', 
                                    searchField: { proto: 'Input', 
                                        attrs: { 
                                            type: 'text', class: 'a-chat-bar-search-field f-inter fa-search', placeholder: 'Поиск'
                                        },
                                    },
                                },
                                blist: { 
                                     proto: 'ChatBarList',
                                     data: [{ title: 'chat1', date:  '15.04.25', message: 'message1', unread: '18'},    
                                            { title: 'chat2', date:  '25.03.25', message: 'message2', unread: '28'}],    
                                    //  data: [
                                    //         {item: { proto: 'Heading', text: 'Чат1'}},
                                    //         {item: { proto: 'Heading', text: 'Чат1'}},
                                    //  ],
                                //     item: {
                                //         proto: 'ChatBarListItem',
                                //         content: {
                                //             proto: 'ChatBarListItemContent',
                                //             header: {
                                //                 proto: 'ChatBarListItemContentHeader',
                                //                 caption: { proto: 'Heading', text: 'Чат1'},
                                //                 date: { proto: 'Paragraph', text: '15.04.25'},
                                //             },
                                //             message: {
                                //                 proto: 'ChatBarListItemContentMessage',
                                //                 message: { proto: 'Paragraph', text: 'message1'},
                                //                 unread: { proto: 'Paragraph', text: '18'},
                                //             }
                                //         }
                                //     }

                                },            
                    },
                    },
                content: { proto: 'ChatContent'},
    // export default `
//     <section class="a-chat">
//         <div class="a-chat-frame">
//             <div class="a-chat-bar">
//                 <div class="a-chat-bar-title">
//                     <a class="a-chat-bar-title-link" href=#>Профиль&nbsp;>&nbsp;<a>
//                 </div>
//                 <div class="a-chat-bar-search">
//                     <Input_F type="text" class="a-chat-bar-search-field f-inter fa-search" placeholder="&#xf002;&nbspПоиск"/>
//                 </div>
//                 <div class="a-chat-bar-list">
//                     {{#each chats}}{{>chats_bar_item }}{{/each}}
//                 </div>
//             </div>
//             <div class="a-chat-content">
//             </div>
//         </div>
//     </section>
// `;

            //     data:
            //     [
            //     {
            //         title:  'Чат1',
            //         date:   '15.04.25',
            //         message:'message1',
            //         unread: 23,
            //     },
            //     {
            //         title:  'Чат2',
            //         date:   '05.04.25',
            //         message:'message7',
            //         unread: 2,
            //     },
            //     {
            //         title:  'Чат2',
            //         date:   '10.03.25',
            //         message:'message10',
            //         unread: 13,
            //     },
            // ]
            }
        }
    }
};

