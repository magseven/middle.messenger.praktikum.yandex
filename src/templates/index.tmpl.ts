// language=hbs

export default `
  <div>
    <nav class="a-login-container">
      <h1>Sprint_1</h1>
      <ul>
        {{#each this}} <li><a class="a-link" href="./{{this.[0]}}">{{this.[1]}}</a></li> {{/each}}
      </ul>
    </nav>
  </div>
`;

