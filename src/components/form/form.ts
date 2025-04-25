import Handlebars from 'handlebars';
import { Block, BlockProps } from "../../modules/block";
import formTemplate from './form.tmpl';

//import Button from '../button/Button';

Handlebars.registerPartial( 'form', formTemplate);

class Form extends Block {
    constructor(props: BlockProps) {
      super("form", {...props, attrs: {
                        class: 'a-form',
                        events: {
                          click: (e: MouseEvent) => {
                            console.log('A Clicked');
                          //   e.preventDefault();
                          //   e.stopPropagation();
                          },
                          submit: (e: SubmitEvent) => {
                            // e.preventDefault();
                            console.log('submit Event');
                            this.printFormData(e);
                            // e.stopPropagation();
                          },
                        },
                    }
        }
      );
    }
    
    printFormData( event: SubmitEvent) {
      console.log('Данные формы:');
      const fd = new FormData(event.currentTarget as HTMLFormElement);
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

