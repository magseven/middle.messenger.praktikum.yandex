// components/button/template.js
export default `
    <section class="a-login-container">
      {{>header label=title_auth theme_icon="../static/images/cloud.png" theme_icon_descr="������"}}
      <form class="a-form" name={{ form_name}}>
        {{>form_input name="login" label="��� ������������" type="text" required=true}}
        {{>form_input name="password" label="������" type="password" required=true}}
        {{>button type="submit" label="����"}}
        <a class="a-link" href=index>��� �� ����������������?</a>
      </form>
    </section>
`;

