import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import buttonTemplate from './input.tmpl';

Handlebars.registerPartial( 'input', buttonTemplate);

class Input extends Block {
    constructor(props: BlockProps) {
      super("button", {...props});
    }
  
    render() : DocumentFragment {
      return this.compile(`${this.props.text}`, {});
    }
 }

export default Input;
