export default `{{#if text}} {{text}} {{/if}} {{#if image}} {{{image}}} {{/if}}`;

export const menuButton = (buttonList: string) =>
        `{{text}}
         {{{dialog}}}
         <div id="popMenu" popover="auto" class="a-chat-content-header-dropdown">
            ${buttonList}
`;

       