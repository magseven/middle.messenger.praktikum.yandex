import { Block, BlockProps } from "../../modules/block";
import {AuthController} from "../../controllers/authController";
import {userController} from "../../controllers/userController";
import { stdEvents } from "../../modules/types";
import Store from "../../modules/store";

export default class Page extends Block {
    constructor(props: BlockProps) {
        super("section", props);         

        window.eventBus.on( 'onFormSubmit', this.onFormSubmit.bind( this));         
        window.eventBus.on( stdEvents.logout, this.onLogout.bind( this));         
        window.eventBus.on( stdEvents.updateProfile, this.onUpdateProfile.bind( this));         
        window.eventBus.on( stdEvents.pageLoaded, this.onPageLoaded.bind( this));         
    }

    onPageLoaded() {
        if ( this.props.name && ( this.props.name === 'Profile')) {
            const store = Store; 
            console.log( 'user:', store.getState());   
        }

        // const user = new AuthController().fetchUser();
    }

    onUpdateProfile() {
        const controller = new userController();  
        controller.update( this.children.form.getFormData() as Record<string, string>)
    }

    onFormSubmit() {
        if ( this.props.name && ( this.props.name === 'SignIn' || this.props.name === 'SignUp') ) {
            const controller = new AuthController();  
            if ( this.props.name === 'SignIn')
                controller.signIn( this.children.form.getFormData() as Record<string, string>)
            else if ( this.props.name === 'SignUp')
                controller.signUp( this.children.form.getFormData() as Record<string, string>)
        }
    }

    onLogout() {
        new AuthController().logout();
    }

    render() : DocumentFragment {
        return this.compile( this.props.template as string, this.props);
    }
}
/*
tramp
T1eritoeitoip
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
