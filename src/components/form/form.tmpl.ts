// language=hbs
export default `{{#each children}}
                    {{{lookup ../this @key}}}
                {{/each}}`;
