import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import buttonTemplate from './button.tmpl';

Handlebars.registerPartial( 'button', buttonTemplate);

class Button extends Block {
    constructor(props: BlockProps) {
      super("button", props );
    }
  
    render() : DocumentFragment {
      return this.compile( buttonTemplate, {});
//      return this.compile(`${this.props.text}`, {});
    }
 }

export default Button;
  
  // function render(query: string, block: Block) {
  //   const root = document.querySelector(query);
  //   root!.appendChild(block.getContent());
  //   return root;
  // }
  
  // const button = new Button({
  //   text: 'Click me',
  //   type: 'submit',
  //   class: "a-theme a-button a-theme-color",
  // });

  // render(".app", button);
  
  // setTimeout(() => {
  //   button.setProps({
  //       text: 'Click me, please',
  //   });
  // }, 1000);

  