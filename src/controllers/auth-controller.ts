import AuthAPI from '../api/auth-api.js';
import Routes from '../modules/utils/route.js';
import {Router, stdRoutes} from '../modules/utils/router.js';
import { router } from '../modules/utils/router.js';
//import { Store } from '../utils/Store.ts';

export class AuthController {
    private _authApi: AuthAPI;
    private _store: Store;
    private _router: Router;

    constructor() {
        this._authApi = new AuthAPI();
        this._store = Store.getInstance();
        this._router = router;
    };                  

    async login(data: Record<string, string>) {
        try {
            console.log('auth-api login');
            await this._authApi.signIn(data);
            const user = await this.fetchUser();

            if (user) {
                this._router.go(stdRoutes.Chat);
            }
        } catch (error) {
            // @ts-ignore
            if (JSON.parse(error.responseText)['reason'] === 'User already in system') router.go(Routes.Messenger);
            console.error('Sign in error:', error);
            throw error;
        }
    }

    async signUp(data: Record<string, string>) {
        try {
            await this._authApi.signUp(data);
            const user = await this.fetchUser();

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
            this.store.set('user', null);
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
                this.store.set('user', user);
            };
            return user;
        } catch (error) {
            // @ts-ignore
            if (JSON.parse(error.responseText)['reason'] === 'Cookie is not valid') router.go(Routes.Index);
            console.error('Fetch user error:', error);
            this.store.set('user', null);
            return null;
        };
    };
};

export default new AuthController();
