import { Events, Block, BlockProps } from "../../modules/block";
import template from './template';
import {Input} from '../input/input';
import Button from '../button/Button';

class Dialog extends Block {
    constructor(props: BlockProps) {
      super( "div", {
        ...props, 
        input: new Input({
          attrs: {
            placeholder: props.label,
            required: 'true',
            class: "input-field input-field:focus",
            name: 'input',
            type: "text",
            list: props.list,
            id: props.input_id,
            autocomplete: "off"
          },
          events: props.input_events as Events,
          label: props.label, 
        }),
        button: new Button({
          text: props.button_text,
          attrs: {
            class: "submit-button submit-button:hover",
          },
          events: props.button_events as Events,
        }),
      });
      console.log('events', this.events);
    }
  
    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Dialog;

