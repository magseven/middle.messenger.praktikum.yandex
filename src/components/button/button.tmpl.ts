export default `{{#if text}} {{text}} {{/if}} {{#if image}} {{{image}}} {{/if}}`;

export const menuButton = (buttonList: string) =>
        `{{text}}
         <div id="popMenu" popover class="a-chat-content-header-dropdown">
            ${buttonList}
`;

        //  </div>        
        //   <div id="user_dialog" popover class="a-dialog">
        //     <label for="a_user_name">Пользователь</label>
        //     <input name="a_user_name"></input>
        //     {{{text}}}
        //   </div>
