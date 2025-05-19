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
            const response = await this._userApi.update(data);
            console.log('update', response.status, response.responseText);
            if ( response.status !== 200) {
                console.log(response.responseText);
            }else{
                console.log('password:', data.oldPassword, data.newPassword);
                const response = await this._userApi.changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword});
                if ( response.status !== 200) {
                    console.log(response.responseText);
                }
            }
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
