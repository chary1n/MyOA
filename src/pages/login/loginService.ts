import { Injectable } from '@angular/core';
// import { APP_SERVER_URL, APP_SERVER_URL_T } from './../../providers/Constants';
import { HttpService } from '../../providers/HttpService';

@Injectable()
export class LoginService {
    constructor(private httpService: HttpService) {

    }

    change_password_now(body){
        return this.httpService.postBody("change_password", body)
    }

    confirm_phone_code(body){
        return this.httpService.postBody("confirm_phone_code", body)
    }

    get_phone_code_oa(body){
        return this.httpService.postBody("get_phone_code_oa", body)
    }

    getDBInfo() {
        return this.httpService.getNoLoading('get_db_list', null,1);
    }

    toLogin(logins,passwords,dbs,app_version) {
        let body = JSON.stringify({
            login: logins,
            password: passwords,
            db: dbs,
            app_version:app_version,
        });
        return this.httpService.postBodyNoLoading('login', body,1);
    }

    change_password(old_psw,new_psw,confirm_psw,db_name,user_id){
        let body = JSON.stringify({
            old_psw: old_psw,
            new_psw:new_psw,
            confirm_psw:confirm_psw,
            uid:user_id,
            db_name :db_name
        }
    );
        return this.httpService.postBody('web/session/change_password_oa', body,2);
    }
}
