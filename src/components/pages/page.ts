import { Block, BlockProps } from "../../modules/block";
import { EventBus } from "../../modules/event_bus";
import { AuthController } from "../../controllers/auth-controller";

export default class Page extends Block {
    constructor(props: BlockProps) {
        super("section", props);         

        if ( !window.eventBus)
            window.eventBus = new EventBus();

        this.onFormSubmit = this.onFormSubmit.bind(this);        
        window.eventBus.on( 'onFormSubmit', this.onFormSubmit);         
    }

    onFormSubmit(props: BlockProps) {
        console.log('process FormSubmit', this.props);
        if ( this.props.name && this.props.name === 'Auth')
                    AuthController.login        (authForm.getFormData() as Record<string, string>).catch((error) => {
                console.error('Ошибка входа:', error);
            });
    }

    render() : DocumentFragment {
        console.log('page Render', this.props);
        return this.compile( this.props.template as string, this.props);
    }
}
/*

function render(query: string, block: Page) {
      const root = document.querySelector(query);
      root!.replaceWith(block.getContent());
      return root;
}

if (!window.eventBus) {
    window.eventBus = new EventBus();
}

const data = blockData[getCurrentPage()] || blockData.index;
const page = new Page( pageData( data.context) as BlockProps);   

render(".app", page);
*/
