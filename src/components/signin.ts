// language=hbs

export default `
    <section class="a-login-container">
    {{>header label=title_reg theme_icon="../static/images/cloud.png" theme_icon_descr="облако"}}
    <form>
      {{>form_input name="first_name" type="text" placeholder="Имя" required=true}}
      {{>form_input name="second_name" type="text" placeholder="Фамилия" required=false}}
      {{>form_input name="login" type="text" placeholder="Логин" required=true}}
      {{>form_input name="email" type="text" placeholder="email"}}
      {{>form_input name="phone" type="text" placeholder="Телефон"}}
      {{>form_input name="password" type="password" placeholder="Пароль" required=true}}
      {{>button type="submit" label="Зарегистрировать"}}
      <div class="a-button-bar">
        {{>button type="button" label="Вход"}}
      </div>
    </form>
    </section>
`
