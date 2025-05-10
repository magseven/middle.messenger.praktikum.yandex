export default `{{#if text}} {{text}} {{/if}} {{#if image}} {{{image}}} {{/if}}`;

export const menuButton = (buttonList: string) =>`{{text}}<div id="popMenu" popover class="a-chat-content-header-dropdown">
                            ${buttonList}
                          </div>        
`;
