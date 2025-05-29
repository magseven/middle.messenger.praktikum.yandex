import { Events, Block, BlockProps } from "../../modules/block";
import template from './template';
import {Input} from '../input/input';
import Button from '../button/Button';
import ComboBox from '../combobox/combobox';

class Dialog extends Block {
    constructor(props: BlockProps) {
      super( "div", {
        ...props, 
        // combobox: 
        //   props.select ? 
        //     new ComboBox({
        //       options: props.combo_options,
        //       attrs: {
        //        placeholder: props.label,
        //        required: 'true',
        //         class: "input-field input-field:focus",
        //        name: 'input',
        //        id: props.input_id,
        //        autocomplete: "off"
        //       },
        //     events: props.combobox_events as Events,
        //     }) : 
            
        //     null,
        input: !props.select ? new Input({
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
        }) : null,
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
  
    hidePopOver() {
      this.element.hidePopover();   
    }

    render() : DocumentFragment {
      return this.compile( template, this.props);
    }
 }

export default Dialog;

