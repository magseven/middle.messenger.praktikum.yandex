import userAPI from '../api/user-api';
import { baseResourceUrl } from '../modules/httpRequest';
import Store from '../modules/store';

export class userController {
    private _userApi: typeof userAPI;

    constructor() {
        this._userApi = userAPI;
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
   

};
