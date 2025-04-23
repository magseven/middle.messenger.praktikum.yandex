// language=hbs

 const profileTemplate: string = `<div>
    <section class="a-login-container">
    {{{ header }}}
    <form class="a-form">
      {{>avatar}}
      {{>form_input name="first_name" type="text" placeholder="Имя" required=true}}
      {{>form_input name="second_name" type="text" placeholder="Фамилия" required=false}}
      {{>form_input name="display_name" type="text" placeholder="Псевдоним" required=false}}
      {{>form_input name="login" type="text" placeholder="Логин" required=true}}
      {{>form_input name="email" type="text" placeholder="email" required=false}}
      {{>form_input name="phone" type="text" placeholder="Телефон" required=false}}
      {{>form_input name="oldPassword" type="password" placeholder="Пароль" required=true}}
      {{>form_input name="newPassword" type="password" placeholder="Новый_пароль" required=true}}
      {{{button}}}
    </form>
    </section>
`;

export default profileTemplate;
//{{>header label=title_profile theme_icon="../static/images/cloud.png" theme_icon_descr="облако"}}
