// components/button/template.js
export default `
    <section class="a-login-container">
      {{{ header }}}
      {{{ form }}}
        <a class="a-link" href=index>Еще не зарегистрирован?</a>
      </form>
    </section>
`;

// export default `
//     <section class="a-login-container">
//       {{{ header }}}
//       <form class="a-form" name={{ form_name}}>
//         {{>input name="login" label="Имя пользователя" type="text" required=true}}
//         {{>input name="password" label="Пароль" type="password" required=true}}
//         {{{ button }}}
//         <a class="a-link" href=index>Еще не зарегистрирован?</a>
//       </form>
//     </section>
// `;

// label=title_auth theme_icon="../static/images/cloud.png" theme_icon_descr="������"}}
