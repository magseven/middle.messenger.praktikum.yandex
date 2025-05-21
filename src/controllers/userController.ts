import userAPI from '../api/user-api';
import { baseResourceUrl } from '../modules/httpRequest';
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

    async update(data: Record<string, string>, form?: FormData) {
        try {
            let response = await this._userApi.update(data);
            if ( response.status !== 200) {
                console.log(response.responseText);
                return false;
            }else{
                if ( data.oldPassword && data.newPassword) {
                    const response = await this._userApi.changePassword({ oldPassword: data.oldPassword, newPassword: data.newPassword});
                    if ( response.status !== 200) {
                        console.log(response.responseText);
                    }
                }
                if ( form) {
                    response = await this._userApi.updateAvatar(form);
                    if ( response.status !== 200) {
                        console.log(response.responseText);
                        return false;
                    }
                }

                const user = JSON.parse(response.responseText);
                user.avatar = baseResourceUrl + user.avatar;
                Store.set( 'user', user);
                return true;                
            }
        } catch (error) {
            console.error('Update profile error:', error);
           return false;
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
