import { BlockProps } from "../../modules/block";
import { Input_F } from "../input/input";
import  Avatar from "../avatar/avatar";
import {AuthController} from "../../controllers/authController";
import {userController} from "../../controllers/userController";
import { stdEvents } from "../../modules/types";
import Store from "../../modules/store";
import {router, stdRoutes} from "../../modules/router";
import {validateForm} from '../../modules/utils/validation';
import Page from "../../components/pages/page";

export default class Profile extends Page {
    constructor(props: BlockProps) {
        super(props);    
                                    
    }

    componentDidUnMount() {
        console.log('dispatchComponentDidUnMount');
        window.eventBus.off( stdEvents.changeAvatar, this.onChangeAvatar.bind( this));         
        window.eventBus.off( stdEvents.updateProfile, this.onUpdateProfile.bind( this));         
        window.eventBus.off( stdEvents.logout, this.onLogout.bind( this));         
    }

    async componentDidMount() {
        window.eventBus.on( stdEvents.updateProfile, this.onUpdateProfile.bind( this));         
        window.eventBus.on( stdEvents.logout, this.onLogout.bind( this));         
        window.eventBus.on( stdEvents.changeAvatar, this.onChangeAvatar.bind( this));         

        if ( this.props.name) {
            console.log('onPopState name entry', this.props.name);
            const user = await new AuthController().fetchUser();
            if ( !user) {
                router.go( stdRoutes.Login);
                return;
            }
        
            this._get( user);
            console.log('onPopState name exit', this.props.name);
        }
    }

    _get( user: Record<string, string | null>|null) {
        console.log('get');
        if ( !user)
            return;

        Object.values(this.children.form.children).forEach((value) => {
            if ( value instanceof Input_F){
                const property_name = value.children.input._element.getAttribute( 'name');
                if ( property_name && property_name in user) {                        
                    value.setProps({text: user[property_name]});
                }
            }else if ( value instanceof Avatar) {
                const a_input = value.children.a_input.element as HTMLInputElement
                const a_image = value.children.a_image.element as HTMLImageElement
                if ( a_input ) {                        
                    console.log('get', user['avatar']);
                    if ( user['avatar'])
                        a_image.setAttribute( 'src', user['avatar']);
                }  
            }
        });
    }

    onFormSubmit() {
        console.log('onFormSubmit', this.props.name);

        if ( !validateForm(this.children.form.element as HTMLFormElement)) {
            console.log( 'validation error');
            return;
        }

        if ( this.props.name != undefined) {
            new userController().update( this.children.form.getFormData() as Record<string, string>)
        }
    }

    async onUpdateProfile() {
        console.log('onUpdateProfile', this.props.name);

        if ( !validateForm(this.children.form.element as HTMLFormElement)) {
            console.log( 'validation error');
            return;
        }

        const form = new FormData(this.children.form.element as HTMLFormElement);
        const avatar = this.children.form.children.avatar;
        if ( avatar) {
            const a_input = avatar.children.a_input.element as HTMLInputElement

            if ( a_input && a_input.files) {
                form.append('avatar', a_input.files[0]);
                const success = await new userController().update( this.children.form.getFormData() as Record<string, string>, form)
                if ( success) {
                    const user = Store.getState().user;
                    if ( user?.avatar)
                        console.log('user.avatar', user.avatar);

                    this._get( user as Record<string,string|null>);
                }
            }
        }
    }

    onChangeAvatar() {
        console.log('onChangeAvatar', this.props.name);

        if ( !validateForm(this.children.form.element as HTMLFormElement)) {
            console.log( 'validation error');
            return;
        }

        const avatar = this.children.form.children.avatar;
        if ( !avatar)
            return;

        const a_input = avatar.children.a_input.element as HTMLInputElement
        const a_image = avatar.children.a_image.element as HTMLImageElement

        if ( a_input && a_input.files && a_input.files[0]) {
            a_image.setAttribute( 'src', '../../static/images/' + a_input.files[0].name);
        }
    }

    async onLogout() {
        console.log( 'onLogout');
        await new AuthController().logout();
        router.go(stdRoutes.Login);
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
