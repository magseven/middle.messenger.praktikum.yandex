// header: new Header({ page_title: data.context.page_title, className: 'a-theme a-header a-theme-color', text: 'text'}),
// form: new Form({ className: 'a-form',
//     input: new Input({ className: 'a-input', type: 'text', name: "name", placeholder: 'введите&nbspфамилию'}), 
//     button: new Button({ type: 'submit', className: 'a-theme a-button a-theme-color', text: 'Войти'}) 
// },),


      // #  context: {
      // #       page_title: 'Авторизация',
      // #       form_name: 'form',
      // #       button_text: 'Войти',
      //         header: { title: "ssdf", className: 'a-header'},
      // #       form: {
      // #           name: { proto: type: "text", placeholder: 'введите&nbspфамилию'} 
      // #           name: { type: "button", placeholder: 'введите&nbspфамилию'} 
      // #       }
      //#   },

import { BlockContext } from '../types';
import { Block, Children } from '../block';
import Header from '../../components/header/header';
import Form from '../../components/form/form';
import Input from '../../components/input/input';
import Button from '../../components/button/Button';

type BlockClass = typeof Input | typeof Button;
const classRegistry: Record<string, BlockClass> = {
      Input,
      Button,
};
  
export const pageData = ( context: BlockContext) => {
      let result: Children = {};

      if ( context.header)
            result.header = new Header({ ...context.header});

      if ( context.form) {
            result.form = new Form( Object.entries( context.form).map(([key,value])=>({
                  key, value: new classRegistry[value.proto](value) 
            })).reduce(( acc, item) => ({...acc, [item.key]: item.value})))
      }
console.log(result);
      return result;
}
