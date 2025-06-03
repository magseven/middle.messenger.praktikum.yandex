import { Block, BlockProps } from "../../modules/block";
import inputFTemplate from './input.tmpl';
import {inputTemplate} from './input.tmpl';

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
    });
  }

  getText(): string { return (this._element as HTMLInputElement).value};

  selectedOption() {
    const datalist = this.datalist;
    if ( !datalist)
      return;

    const selectedOption = Array.from( datalist.options)
                          .find( option => option.value === this.value);

    return selectedOption ? selectedOption.dataset.id : null;
  }

  get datalist(): HTMLDataListElement | null {
    const datalist_name= this.element.getAttribute('list');
    if ( !datalist_name)
      return null;

    const datalist = document.getElementById( datalist_name) as HTMLDataListElement;
    return datalist ? datalist : null;
  }

  get value() {
    return (this.element as HTMLInputElement).value;
  }

  set value( newValue) {
    (this.element as HTMLInputElement).value = newValue;  
  }
  
  render() : DocumentFragment {
    return this.compile( inputTemplate, this.props);
  }

}


