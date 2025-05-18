import AuthAPI from '../api/auth-api';
import {Router, stdRoutes} from '../modules/router';
import { router } from '../modules/router';
import Store from '../modules/store';

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
            console.log( 'promise', response);    

            const user = await this.fetchUser();
            if (user) {
                this._router.go(stdRoutes.Chat);
            }


        } catch (error) {
            console.error('Sign in error:', error);
            // @ts-ignore
            if ( JSON.parse(error.responseText)['reason'] === 'User already in system') 
                router.go( stdRoutes.Chat);
            
            console.error('Sign in error:', error);
            throw error;
        }
    }

    async signUp(data: Record<string, string>) {
        try {
            await this._authApi.signUp(data);
            const user = await this.fetchUser();
            console.log( 'valid user:', user);    
            if (user) {
                this._router.go(stdRoutes.Chat);
            }
        } catch (error) {
            console.error('Sign up error:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await this._authApi.logout();
            this._store.set('user', null);
            this._router.go(stdRoutes.Index);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        };
    };

    async fetchUser() {
        try {
            const user = await this._authApi.getUser();
            if (user) {
                this._store.set('user', user);
                console.log('user after login', this._store.getState());
            };
            return user;
        } catch (error) {
            // @ts-ignore            
            console.error('Fetch user error:', error);
            this._store.set('user', null);

            router.go( stdRoutes.Index);
            return null;
        };
    };
};
