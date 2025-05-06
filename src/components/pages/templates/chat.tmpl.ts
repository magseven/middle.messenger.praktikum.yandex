// language=hbs
export default `
      {{{ chat }}}
      {{{ frame }}}
`;


// export default `
//     <section class="a-chat">
//         <div class="a-chat-frame">
//             <div class="a-chat-bar">
//                 <div class="a-chat-bar-title">
//                     <a class="a-chat-bar-title-link" href=#>Профиль&nbsp;>&nbsp;<a>
//                 </div>
//                 <div class="a-chat-bar-search">
//                     <input type="text" class="a-chat-bar-search-field f-inter fa-search" placeholder="&#xf002;&nbspПоиск"/>
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

// <div class="a-link>href="./{{this.[0]}}">{{this.[1]}}</div>

// <div class="a-chat-bar-list-item-avatar">
// </div>
export const chatBarList = `{{#each data}}{{{processItem this}}}{{/each}}`;
// `{{#each data}}
//                               {{{processItem item}}}
//                               {{/each}}
//  `;

 export const chatBarListItem = `
     <div class="a-chat-bar-list-item-avatar">
     </div>
     <div class="a-chat-bar-list-item-content">
         <div class="a-chat-bar-list-item-content-header">
             <h3>{{ title}}</h3>
             <h3>{{ date }}</h3>
         </div>
         <div class="a-chat-bar-list-item-content-message">
             <h3> {{ message }} </h3>
             <h3> {{ unread }} </h3>
         </div>
     </div>
 `;
 
 export const chatBarListItemContent = `{{{header}}}{{{message}}}`;
 export const chatBarListItemContentHeader = `{{{caption}}}{{{date}}}`;
 export const chatBarListItemContentMessage = `{{{message}}}{{{unread}}}`;

//  {{{processItem caption}}}
//  {{{processItem date}}}
//  {{{processItem message}}}
//  {{{processItem unread}}}

// <div class="a-chat-bar-list-item-content">
//         <div class="a-chat-bar-list-item-content-header">
//             <h3> {{ title}} </h3>
//             <h3> {{ date }} </h3>
//         </div>
//         <div class="a-chat-bar-list-item-content-message">
//             <h3> {{ message }} </h3>
//             <h3> {{ unread }} </h3>
//         </div>
//     </div>
