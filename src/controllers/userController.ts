import userAPI from '../api/user-api';
import {Router, stdRoutes} from '../modules/router';
import { router } from '../modules/router';
import Store from '../modules/store';

export class userController {
    private _userApi: typeof userAPI;
    private _store: typeof Store;
    private _router: Router;

    constructor() {
        this._userApi = userAPI;
        this._store = Store;
        this._router = router;
    };                  

    async update(data: Record<string, string>) {
        try {
            console.log( 'store:', this._store.getState());
            await this._userApi.update(data);
        } catch (error) {
            console.error('Update profile error:', error);
            throw error;
        }
    }

    // async get() {
    //     try {
    //         await this._userApi.get();
    //         this._store.set('user', null);
    //         this._router.go(stdRoutes.Index);
    //     } catch (error) {
    //         console.error('Logout error:', error);
    //         throw error;
    //     };
    // };

};
