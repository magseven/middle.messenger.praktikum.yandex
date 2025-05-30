import { Events, Block, BlockProps } from "../../modules/block";
import template from './template';
import {Input} from '../input/input';
import Button from '../button/Button';
import ComboBox from '../combobox/combobox';

class Dialog extends Block {
    constructor(props: BlockProps) {
      super( "div", {
        ...props, 
        combobox: 
          props.select ? 
            new ComboBox({
              attrs: {
                placeholder: props.label,
                required: 'true',
                class: "input-field input-field:focus",
                name: 'combobox',
                id: props.combobox_id,
                autocomplete: "off",
                autofocus: props.combobox_autofocus,
              },
              events: props.combobox_events as Events,
            }) : 
            
            null,

        input: !props.select ? new Input({
          attrs: {
            placeholder: props.label,
            required: 'true',
            class: "input-field input-field:focus",
            name: 'input',
            type: "text",
            list: props.input_datalist,
            id: props.input_id,
            autocomplete: "off",
            autofocus: props.input_autofocus,
          },
          events: props.input_events as Events,
          label: props.label, 
        }) : null,
        button: new Button({
          text: props.button_text,
          attrs: {
            class: "submit-button submit-button:hover",
          },
          events: props.button_events as Events,
        }),
      });
    }
  
    hidePopOver() {
      this.element.hidePopover();   
    }

    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Dialog;

