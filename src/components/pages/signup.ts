import { Block, BlockProps } from "../../modules/block";
import { Input_F } from "../../components/input/input";
import  Avatar from "../../components/avatar/avatar";
import Form from "../../components/form/form";
import {AuthController} from "../../controllers/authController";
import {userController} from "../../controllers/userController";
import { stdEvents } from "../../modules/types";
import Store from "../../modules/store";
import {router, stdRoutes} from "../../modules/router";
import {validateForm} from '../../modules/utils/validation';
import Page from "../../components/pages/page";

export default class SignUp extends Page {
    constructor(props: BlockProps) {
        super(props);    
                                    
    }

    dispatchComponentDidUnMount() {
        console.log('dispatchComponentDidUnMount');
        window.eventBus.offAll( stdEvents.signup);         
    }

    async componentDidMount() {
        console.log('ComponentDidMount');
        window.eventBus.on( stdEvents.signup, this.onSignUp.bind( this));         
    }

    onSignUp() {
        console.log('OnSignUp', this.props.name);

        // if ( this.props.name === 'SignIn' || this.props.name === 'SignUp' || this.props.name === 'Profile') {
        //     if ( validateForm(this.children.form.element as HTMLFormElement))
        //         (this.children.form as Form).printFormData();
        // }

        const res = new AuthController().signUp( this.children.form.getFormData() as Record<string, string>)
        console.log('result', res);
        router.go(stdRoutes.Login);
    }


    render() : DocumentFragment {
        return this.compile( this.props.template as string, this.props);
    }
}
