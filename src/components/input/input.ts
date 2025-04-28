//import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import inputTemplate from './input.tmpl';
import {validateField} from '../../modules/utils/validation'

//Handlebars.registerPartial( 'input', inputTemplate);

class Input extends Block {
    constructor(props: BlockProps) {
      super("div", { 
        ...props, 
        attrs: {
          ...props.attrs || {},
          class: 'form-group',
        },
        events: {
          focusout: (e:Event) => {
            e.preventDefault();
            e.stopPropagation();
            validateField(e.target as HTMLInputElement)
            return true;
          },        
        }
      });
    }
  
    render() : DocumentFragment {
      return this.compile( inputTemplate, this.props);
    }
 }

export default Input;
