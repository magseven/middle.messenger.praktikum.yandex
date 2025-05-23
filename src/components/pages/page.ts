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

export default class Page extends Block {
    constructor(props: BlockProps) {
        super("section", props);    
                                    
    }

    dispatchComponentDidUnMount() {
        console.log('dispatchComponentDidUnMount');
        if ( this.props.name === 'Profile') {
            window.eventBus.off( stdEvents.changeAvatar, this.onChangeAvatar.bind( this));         
            window.eventBus.off( stdEvents.updateProfile, this.onUpdateProfile.bind( this));         
            window.eventBus.off( stdEvents.logout, this.onLogout.bind( this));         
        }else if ( this.props.name === 'SignIn')
            window.eventBus.off( stdEvents.login, this.onLogin);                 
    }

    async componentDidMount() {
        if ( this.props.name === 'Profile') {
            window.eventBus.on( stdEvents.updateProfile, this.onUpdateProfile.bind( this));         
            window.eventBus.on( stdEvents.logout, this.onLogout.bind( this));         
        }else if ( this.props.name === 'SignIn'){
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
        }else if ( this.props.name === 'Chat'){
            const user = await new AuthController().fetchUser();
            if ( !user) {
                router.go( stdRoutes.Login);
                return;
            }
        }

        if ( this.props.name && ( this.props.name === 'Profile')) {
            console.log('onPopState name entry', this.props.name);
            const user = await new AuthController().fetchUser();
            if ( !user) {
                router.go( stdRoutes.Login);
                return;
            }
        
            Object.entries(this.children.form.children).forEach(([key, value]) => {
                if ( value instanceof Input_F){
                    const property_name = value.children.input._element.getAttribute( 'name');
                    if ( property_name && property_name in user) {                        
                        value.setProps({text: user[property_name]});
                    }
                }else if ( value instanceof Avatar) {
                    const property_name = value.children.input._element.getAttribute( 'name');
                    if ( property_name && property_name in user) {                        
                        value.children.input.setProps({file: user[property_name]});
                    }
                }
            });
            console.log('onPopState name exit', this.props.name);
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
            else if ( this.props.name === 'SignUp')
                new AuthController().signUp( this.children.form.getFormData() as Record<string, string>)
            else if ( this.props.name === 'Profile')
                new userController().update( this.children.form.getFormData() as Record<string, string>)
        }
    }

    onUpdateProfile() {
        console.log('onUpdateProfile', this.props.name);

        //     if ( validateForm(this.children.form.element as HTMLFormElement))
        //         (this.children.form as Form).printFormData();
        // }
        const form = new FormData(this.children.form.element as HTMLFormElement);
        const avatar: HTMLInputElement  = this.children.form.children.avatar.children.input.element as HTMLInputElement;
        if ( avatar && avatar.files?.length && avatar.files[0]) {
            console.log('avatar', avatar.files[0], this.children.form.children.avatar.children.input);
            form.append('avatar', avatar.files[0]);
            new userController().update( this.children.form.getFormData() as Record<string, string>, form)
        }
    }

    onLogin( name: string, data: Record<string, string>) {
        console.log('onLogin', name);

    //     if ( validateForm(this.children.form.element as HTMLFormElement))
    //         (this.children.form as Form).printFormData();
    // }

        new AuthController().signIn( data)
    }

    onChangeAvatar() {
        console.log('onChangeAvatar', this.props.name);

        // if ( this.props.name === 'SignIn' || this.props.name === 'SignUp' || this.props.name === 'Profile') {
        //     if ( validateForm(this.children.form.element as HTMLFormElement))
        //         (this.children.form as Form).printFormData();
        // }
        this.children.image.setProps({src: 't.png'});
    }

    onLogout() {
        console.log( 'onLogout');
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
