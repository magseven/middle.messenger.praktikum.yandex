//import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import formTemplate from './form.tmpl';
import {validateForm} from '../../modules/utils/validation';


class Form extends Block {
    constructor(props: BlockProps) {
      super("form", {...props, attrs: {
                        class: 'a-form',
                      },
                      events: {
                        OnSubmit: (e: Event) => {
                          console.log('submit');
                          e.preventDefault();
                          e.stopPropagation();
                          if (e instanceof SubmitEvent) {
                            if ( validateForm(e.target as HTMLFormElement))
                              this.printFormData(e);
                            }
                        },
                    },
      });
    }
    
    printFormData( event: SubmitEvent) {
      event.preventDefault();
      
      const form = event.target as HTMLFormElement;
      const fd = new FormData( form);
      const data: Record<string, string> = {};

      fd.forEach((value, key) => {
          data[key] = value.toString();
        });

      console.log('Данные формы:', data);

  };
  
  render() : DocumentFragment {
    return this.compile(formTemplate, {children: this.children});
  }
 }

export default Form;

