//import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import inputFTemplate from './input.tmpl';
import {inputTemplate} from './input.tmpl';
import {validateField} from '../../modules/utils/validation'

export class Input_F extends Block {
    constructor(props: BlockProps) {
      super("div", { 
        ...props, 
        attrs: {
          ...props.attrs || {},
          class: 'form-group',
        },
        events: {
          OnFocusout: (e:Event) => {
            e.preventDefault();
            e.stopPropagation();
            validateField(e.target as HTMLInputElement)
            return true;
          },        
        }
      });
    }
  
    render() : DocumentFragment {
      return this.compile( inputFTemplate, this.props);
    }
 }

export class Input extends Block {
  constructor(props: BlockProps) {
    super("input", { 
      ...props, 
      attrs: {
        ...props.attrs || {},
        // class: 'form-group',
      },
      events: {
        OnFocusout: (e:Event) => {
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


