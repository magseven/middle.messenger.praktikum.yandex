export default `<div class="form-group">
    {{#if label}} 
        <label for={{name}}>{{label}}</label>
    {{/if}}
    <input class='a-input' type={{type}} id={{name}} name={{name}}  autocomplete="off" {{#if placeholder}} placeholder={{{placeholder}}} {{/if}} {{#if required}} required{{/if}}>
</div>
`;
