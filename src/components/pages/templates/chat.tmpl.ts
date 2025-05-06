// language=hbs
export default `
      {{{ chat }}}
        {{{ frame }}}
`;


export const chatBarList = `{{#each data}}{{{processItem this}}}{{/each}}`;


export const chatBarListItem = `
     <div class="a-chat-bar-list-item-avatar">
        <img src='../../../static/images/blank_circle.png' alt="Аватар" width=36px">
     </div>
     <div class="a-chat-bar-list-item-content">
         <div class="a-chat-bar-list-item-content-header">
             <h3 class="a-chat-bar-list-item-content-header-title">{{ title}}</h3>
             <h3 class="a-chat-bar-list-item-content-header-date">{{ date }}</h3>
         </div>
         <div class="a-chat-bar-list-item-content-message">
             <h3 class="a-chat-bar-list-item-content-message-message">{{ message }}</h3>
             <h3 class="a-chat-bar-list-item-content-message-unread a-chat-bar-list-item-content-message-circle">{{ unread }}</h3>
         </div>
     </div>
 `;

 
export const chatContentFrame = `
    <div class="a-chat-content-frame">
        <div class="a-chat-content_header">
        </div>
        <div class="a-chat-content_itemlist">
        </div>
        <div class="a-chat-content_footer">
        </div>
    </div>
`;


 export const chatContent = `{{#each data}}{{{processContentItem this}}}{{/each}}`;

 export const chatContentItem = `
     {{{ message }}} {{{ image}}}
 `;

