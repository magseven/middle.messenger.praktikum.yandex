export default `
    {{#if label}} 
        <label for={{{name}}}>{{label}}</label>
    {{/if}}
    <input type={{type}} id={{{name}}} name={{name}} autocomplete="off" {{#if placeholder}} placeholder={{{placeholder}}} {{/if}} {{#if required}} required{{/if}}>
`;

export const inputTemplate = `{{{ text }}}`;

// export const inputTemplate = `
//     <input type={{type}} id={{{name}}} name={{name}} autocomplete="off" {{#if placeholder}} placeholder={{{placeholder}}} {{/if}} {{#if required}} required{{/if}}>
// `;

