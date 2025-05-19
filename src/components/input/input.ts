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

        input: new Input({
          attrs: {
            type: props.type,
            id: props.name,
            name: props.name,
            autocomplete: 'off',
            placeholder: props.placeholder ? props.placeholder : '',
            required: props.required ? true : false,
          },
        }),

      });
    }
  
    componentDidUpdate( oldProps: Record<string, unknown>, newProps: Record<string, unknown>): boolean {
      if ( oldProps.text !== newProps.text) {
          this.children.input._element.setAttribute( 'value', newProps.text as string) 
      }
      return true;
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
      },
      events: {
        OnBlur: (e:Event) => {
          e.preventDefault();
          e.stopPropagation();
          if ( !validateField(e.target as HTMLInputElement)) {
            this.element.focus();
            return false;
          }

          return true;
        },        
      }
    });
  }

  getText(): string { return (this._element as HTMLInputElement).value};
  
  render() : DocumentFragment {
    return this.compile( inputTemplate, this.props);
  }

}


