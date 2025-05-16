import { Block, BlockProps } from "../../modules/block";
import formTemplate from './form.tmpl';
import {validateForm} from '../../modules/utils/validation';
import {EventBus} from '../../modules/event_bus';

class Form extends Block {
    constructor(props: BlockProps) {
      super("form", {...props, attrs: {
                        class: 'a-form',
                      },
                      events: {
                        OnSubmit: (e: Event) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (e instanceof SubmitEvent) {
                            if ( validateForm(e.target as HTMLFormElement))
                              this.printFormData(e);

                            if ( !window.eventBus)
                              window.eventBus = new EventBus();

                            console.log('emitted onFormSubmit');
                            window.eventBus.emit( 'onFormSubmit', this.props);
                          }
                        },
                    },
      });
    }
    
    public getFormData(): Record<string, string | Blob> {
      if (!this._element) return {};
      
      const formData = new FormData(this._element as HTMLFormElement);
      const result: Record<string, string | Blob> = {};

      formData.forEach((value, key) => {
        result[key] = value; // value автоматически будет string | File (File наследует Blob)
      });

      return result;
    };

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

