import { Block, BlockProps } from "../../modules/block";
import template from './template';
import {Input} from '../input/input';
import Button from '../button/Button';
import {stdEvents} from '../../modules/types'

class Dialog extends Block {
    constructor(props: BlockProps) {
      super( "div", {
        ...props, 
        input: new Input({
          attrs: {
            placeholder: props.label,
            required: "true",
          },
          type: 'text',
          name: 'input',
          label: 'Наименование:', 
        }),
        button: new Button({
          text: 'Создать',
          events: { 
            OnClick: () => {
              const value = ( this.children.input.element as HTMLInputElement).value;
              if ( value) {
                this.element.hidePopover();
                ( this.children.input.element as HTMLInputElement).value = "";
                window.eventBus.emit( stdEvents.createChat, value);
              }
            }   
        },

        }),
      });
    }
  
    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Dialog;

