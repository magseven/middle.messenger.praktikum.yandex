import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import formTemplate from './form.tmpl';

Handlebars.registerPartial( 'form', formTemplate);

class Form extends Block {
    constructor(props: BlockProps) {
      super("form", props);
    }
  
    render() : DocumentFragment {
      return this.compile(formTemplate, { page_title: this.props.text, theme_icon_descr: this.props.icon_descr, theme_icon: this.props.icon });
    }
 }

export default Form;

