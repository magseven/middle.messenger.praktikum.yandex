export default `{{#if text}} {{text}} {{/if}} {{#if image}} {{{image}}} {{/if}}`;

export const menuButton = (buttonList: string) =>
        `{{text}}
         <datalist id="users"></datalist>
         <div id="popMenu" popover="auto" class="a-chat-content-header-dropdown">
         {{{dialog}}} {{{dialog_del}}}
            ${buttonList}
`;
