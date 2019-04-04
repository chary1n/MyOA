import { HttpService } from './../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
    constructor(private httpService: HttpService) {

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
}