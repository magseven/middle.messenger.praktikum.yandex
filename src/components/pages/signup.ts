import { BlockProps } from "../../modules/block";
import Form from "../../components/form/form";
import {AuthController} from "../../controllers/authController";
import { stdEvents } from "../../modules/types";
import {validateForm} from '../../modules/utils/validation';
import Page from "../../components/pages/page";

export default class SignUp extends Page {
    _bindSignUp = this.onSignUp.bind( this);

    constructor(props: BlockProps) {
        super(props);                                        
    }

    componentDidUnMount() {
        console.log('dispatchComponentDidUnMount');
        window.eventBus.off( stdEvents.signup, this._bindSignUp);         
    }

    async componentDidMount() {
        console.log('ComponentDidMount');
        window.eventBus.on( stdEvents.signup, this._bindSignUp);         
    }

    async onSignUp() {
        console.log('OnSignUp');

        if ( !validateForm(this.children.form.element as HTMLFormElement)) {
            console.log( 'validation error');
            return;
        }

        (this.children.form as Form).printFormData();

        await new AuthController().logout();
        await new AuthController().signUp( this.children.form.getFormData() as Record<string, string>)

    }

    render() : DocumentFragment {
        return this.compile( this.props.template as string, this.props);
    }
}
