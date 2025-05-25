// language=hbs
export default `
      {{{ chat }}}
        {{{ frame }}}
`;

export const chatBarListItem = `
     <div class="a-chat-bar-list-item-avatar">
        {{{ avatar}}}
     </div>
     <div class="a-chat-bar-list-item-content">
         <div class="a-chat-bar-list-item-content-header">
             <h3 class="a-chat-bar-list-item-content-header-title f-inter">{{ title}}</h3>
             <h3 class="a-chat-bar-list-item-content-header-date f-inter">{{ date }}</h3>
         </div>
         <div class="a-chat-bar-list-item-content-message">
             <h3 class="a-chat-bar-list-item-content-message-message f-inter">{{ message }}</h3>
             <h3 class="a-chat-bar-list-item-content-message-unread a-chat-bar-list-item-content-message-circle f-inter">{{ unread }}</h3>
         </div>
     </div>
 `;

 
export const chatContent = `{{{ header }}}{{{ content }}}{{{ footer }}}`;

export const chatContentHeader = `
    <div class="a-chat-content-header-avatar">
        {{{ avatar }}}
    </div>
    <div class="a-chat-content-header-title">
        <h3 class="a-chat-content-header-title-text f-inter">{{title}}</h3>
    </div>
    <div class="a-chat-content-header-menu">
    {{{ button }}}
    </div>
 `;

export const chatContentFooter = `
    <div class="a-chat-content-footer-menu">
        <label>
        {{{ clip }}}
         {{{input}}}
         </label>
    </div>
    <div class="a-chat-content-footer-message">
        {{{ message }}}
    </div>
    <div class="a-chat-content-footer-button">
        {{{ button }}}
    </div>
 `;

 export const chatContentItems = `{{#each data}}{{{processContentItem this}}}{{/each}}`;
 export const chatContentItem = `Дата: {{{time}}} {{{ message }}} Пользователь: {{{ user_id}}}`;
