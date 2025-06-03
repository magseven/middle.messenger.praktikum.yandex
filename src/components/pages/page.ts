import { Block, BlockProps } from "../../modules/block";
import {AuthController} from "../../controllers/authController";
import { stdEvents } from "../../modules/types";
import Store from "../../modules/store";
import {router, stdRoutes} from "../../modules/router";

export default class Page extends Block {
    constructor(props: BlockProps) {
        super("section", props);    
                                    
    }

    componentDidUnMount() {
        console.log('dispatchComponentDidUnMount');
        if ( this.props.name === 'SignIn')
            window.eventBus.off( stdEvents.login, this.onLogin);                 
    }

    async componentDidMount() {
        if ( this.props.name === 'SignIn'){
            const user = await new AuthController().fetchUser();
            console.log( 'SignIn', user, Store.getState().user);
            if ( user) {
                router.go( stdRoutes.Chat);
                return;
            }

            this.children.form.children.button.setEvents({
                        OnClick: (e: Event) => {
                            e.preventDefault();
                            e.stopPropagation();
                            console.log('button onClick');
                            window.eventBus.emit( stdEvents.login, this.props.name, this.children.form.getFormData());
                        }});
            window.eventBus.on( stdEvents.login, this.onLogin);                 
        }

    }

    onFormSubmit() {
        console.log('onFormSubmit', this.props.name);

        // if ( this.props.name === 'SignIn' || this.props.name === 'SignUp' || this.props.name === 'Profile') {
        //     if ( validateForm(this.children.form.element as HTMLFormElement))
        //         (this.children.form as Form).printFormData();
        // }

        if ( this.props.name != undefined) {
            if ( this.props.name === 'SignIn')
                new AuthController().signIn( this.children.form.getFormData() as Record<string, string>)
        }
    }

    onLogin( name: string, data: Record<string, string>) {
        console.log('onLogin', name);

    //     if ( validateForm(this.children.form.element as HTMLFormElement))
    //         (this.children.form as Form).printFormData();
    // }

        new AuthController().signIn( data)
    }

    render() : DocumentFragment {
        return this.compile( this.props.template as string, this.props);
    }
}
