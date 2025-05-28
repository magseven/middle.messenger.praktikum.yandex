import AuthAPI from '../api/auth-api';
import {Router, stdRoutes} from '../modules/router';
import { router } from '../modules/router';
import Store from '../modules/store';
import {baseResourceUrl} from '../modules/httpRequest';

export class AuthController {
    private _authApi: AuthAPI;
    private _store: typeof Store;
    private _router: Router;

    constructor() {
        this._authApi = new AuthAPI();
        this._store = Store;
        this._router = router;
    };                  

    async signIn(data: Record<string, string>) {
        try {
            const response = await this._authApi.signIn(data);
            console.log( response.responseText, response.status, Store.getState().user);
            if (( response.status === 400) || ( response.status === 200)) {
                if ( !Store.getState().user){
                    await this.fetchUser();
                }
                this._router.go(stdRoutes.Chat);
            }
        } catch (error) {
            console.log('Sign in error:', error);
            //@ts-expect-error will contain response text
            if ( JSON.parse(error.responseText)['reason'] === 'User already in system') 
                router.go( stdRoutes.Chat);
            
        }
    }

    async signUp(data: Record<string, string>) {
        try {
            await this._authApi.signUp(data);
            const user = await this.fetchUser();
            console.log( 'valid user:', user);    
            if (user)
                this._router.go(stdRoutes.Chat);        
        } catch (error) {
            console.log('Sign up error:', error);
        }
    }

    async logout() {
        try {
            await this._authApi.logout();
            this._store.set('user', null);
        } catch (error) {
            console.log('Logout error:', error);
        };
    };

    async fetchUser() {
        try {
            const user = await this._authApi.getUser();
            if (user) {
                user.avatar = baseResourceUrl + user.avatar;
                this._store.set('user', user);
            };
            
            return user;
        } catch (error) {
            // @ts-expect error will contain error text
            console.log('Fetch user error:', error);
            this._store.set('user', null);

            return null;
        };
    };
};
