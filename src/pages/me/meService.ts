import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class MeServices {
    constructor(private httpservice: HttpService) {

    }
    save_info(body){
        return this.httpservice.postBody("save_info", body);
    }

    logoutApp(body) {
        return this.httpservice.postBodyNoLoading("logout", body);
    }

     toLogin(logins,passwords,dbs,app_version) {
        let body = JSON.stringify({
            login: logins,
            password: passwords,
            db: dbs,
            app_version:app_version,
        });
        return this.httpservice.postBodyNoLoading('login', body,1);
    }
}