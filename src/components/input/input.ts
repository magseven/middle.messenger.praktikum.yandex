import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import inputTemplate from './input.tmpl';

Handlebars.registerPartial( 'input', inputTemplate);

class Input extends Block {
    constructor(props: BlockProps) {
      super("div", { 
        ...props, 
        attrs: {
          ...props.attrs || {},
          class: 'a-input'
        }
      }
      );
    }
  
    render() : DocumentFragment {
      return this.compile( inputTemplate, this.props);
    }
 }

export default Input;
