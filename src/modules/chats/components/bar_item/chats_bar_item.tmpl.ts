// language=hbs
 
export default `
<div class="a-chat-bar-list-item">
    <div class="a-chat-bar-list-item-avatar">
    </div>
    <div class="a-chat-bar-list-item-content">
        <div class="a-chat-bar-list-item-content-header">
            <h3> {{ title}} </h3>
            <h3> {{ date }} </h3>
        </div>
        <div class="a-chat-bar-list-item-content-message">
            <h3> {{ message }} </h3>
            <h3> {{ unread }} </h3>
        </div>
    </div>
</div>
`;
