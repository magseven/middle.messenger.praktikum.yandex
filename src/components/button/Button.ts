import { Block, BlockProps } from "../../modules/block";
import buttonTemplate from './button.tmpl';

class Button extends Block {
    constructor(props: BlockProps) {
      super("button", {
        ...props, 
        attrs: {
          ...props.attrs || {},
          class: 'a-theme a-button a-theme-color'
        }
      });
    }
  
    render() : DocumentFragment {
      return this.compile( buttonTemplate, this.props);
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

  