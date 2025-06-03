import { Block, BlockProps } from "../../modules/block";
import formTemplate from './form.tmpl';

class Form extends Block {
    constructor(props: BlockProps) {
      super("form", {...props, attrs: {
                        class: 'a-form',
                      },
                    //   events: {
                    //     OnSubmit: (e: Event) => {
                    //       e.preventDefault();
                    //       e.stopPropagation();

                    //       console.log('form onSubmit');
                    //       // if (e instanceof SubmitEvent) {
                    //       //   if ( validateForm(e.target as HTMLFormElement))
                    //       //     this.printFormData(e);

                    //         window.eventBus.emit( 'onFormSubmit', this.props);
                    //       // }
                    //     },
                    // },
      });
    }
    

    printFormData() {
      const form = this.element;//event.target as HTMLFormElement;
      const fd = new FormData( form as HTMLFormElement);
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

