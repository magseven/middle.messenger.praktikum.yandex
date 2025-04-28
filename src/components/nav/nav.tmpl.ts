export default `
<ul>
  {{#each nav}} <li><a class="a-link" href="./{{{this.[0]}}}">{{{this.[1]}}}</a></li> {{/each}}
</ul>
`
