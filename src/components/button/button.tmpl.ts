export default `{{#if text}} {{text}} {{/if}} {{#if image}} {{{image}}} {{/if}}`;

export const menuButton = (buttonList: string) =>
        `{{text}}
         <div id="popMenu" popover="auto" class="a-chat-content-header-dropdown">
         {{{dialog}}} {{{dialog_del}}}
         <datalist id="users"></datalist>
            ${buttonList}
`;

       