// language=hbs

const indexTemplate: string = `
    <nav class="a-login-container">
      <h1>Sprint_2</h1>
      <ul>
        {{#each menu}} <li><a class="a-link" href="./{{{this.[0]}}}">{{{this.[1]}}}</a></li> {{/each}}
      </ul>
    </nav>
`;

export default indexTemplate;

