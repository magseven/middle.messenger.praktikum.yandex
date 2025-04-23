import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import formTemplate from './form.tmpl';

//import Button from '../button/Button';

Handlebars.registerPartial( 'form', formTemplate);

class Form extends Block {
    constructor(props: BlockProps) {
      super("form", props);
    }
  
    render() : DocumentFragment {
      return this.compile(formTemplate, {children: this.children});
    }
 }

export default Form;

