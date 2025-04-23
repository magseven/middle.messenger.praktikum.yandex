import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import inputTemplate from './input.tmpl';

Handlebars.registerPartial( 'input', inputTemplate);

class Input extends Block {
    constructor(props: BlockProps) {
      super("input", props);
    }
  
    render() : DocumentFragment {
      return this.compile( inputTemplate, {});
    }
 }

export default Input;
