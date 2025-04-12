// language=hbs

export default `
    <section class="a-login-container">
      {{>header label=title_auth theme_icon="../static/images/cloud.png" theme_icon_descr="облако"}}
      <form class="a-form">
        {{>form_input name="login" label="Имя пользователя" type="text" required=true}}
        {{>form_input name="password" label="Пароль" type="password" required=true}}
        {{>button type="submit" label="Вход"}}
        <a class="a-link" href="./signin.html">Еще не зарегистрированы?</a>
      </form>
    </section>
`;

// {{<page_header title={{title_auth}} }}
// <body>
//   <main>
//     <section class="a-login-container">
//       {{>header label=title_auth theme_icon="static/cloud.png" theme_icon_descr="������"}}
//       <form class="a-form">
//         {{>form_input name="login" label="��� ������������" type="text" required=true}}
//         {{>form_input name="password" label="������" type="password" required=true}}
//         {{>button type="submit" label="����"}}
//         <a class="a-link" href="./signin.html">��� �� ����������������?</a>
//       </form>
//     </section>
//   </main>
// </body>
// </html>
