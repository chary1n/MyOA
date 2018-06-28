import { Injectable } from '@angular/core';
import { APP_SERVER_URL, APP_SERVER_URL_T } from './../../providers/Constants';
import { HttpService } from '../../providers/HttpService';

@Injectable()
export class LoginService {
    constructor(private httpService: HttpService) {

    }

    getDBInfo() {
        return this.httpService.get('get_db_list', null,1);
    }

    toLogin(logins,passwords,dbs,app_version) {
        let body = JSON.stringify({
            login: logins,
            password: passwords,
            db: dbs,
            app_version:app_version,
        });
        return this.httpService.postBody('login', body,1);
    }

    change_password(old_psw,new_psw,confirm_psw){
        let body = JSON.stringify([{
            'name': 'old_pwd',
            'value':old_psw,
        },{
            'name': 'new_password',
            'value':new_psw,
        },{
            'name': 'confirm_pwd',
            'value':confirm_psw,
        }]);
        return this.httpService.postBody('/web/session/change_password', body,2);
    }
}
