// components/button/template.js
export default `
    <section class="a-login-container">
      {{>header label=title_auth theme_icon="../static/images/cloud.png" theme_icon_descr="облако"}}
      <form class="a-form" name={{ form_name}}>
        {{>form_input name="login" label="Имя пользователя" type="text" required=true}}
        {{>form_input name="password" label="Пароль" type="password" required=true}}
        {{>button type="submit" label="Вход"}}
        <a class="a-link" href=index>Еще не зарегистрированы?</a>
      </form>
    </section>
`;

