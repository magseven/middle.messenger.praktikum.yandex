// language=hbs

export default `
    <section class="a-chat">
        <div class="a-chat-frame">
            <div class="a-chat-bar">
                <div class="a-chat-bar-title">
                    <a href=login>Профиль</a>
                </div>
                <div class="a-chat-bar-search">
                    <input class="a-chat-bar-search-field" />
                </div>
                <div class="a-chat-bar-list">
                    {{#each chats}}{{>chats_bar_item }}{{/each}}
                </div>
            </div>
            <div class="a-chat-content">
            </div>
        </div>
    </section>
`;

// <div class="a-link>href="./{{this.[0]}}">{{this.[1]}}</div>
