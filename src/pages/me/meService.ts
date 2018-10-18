import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class MeServices {
    constructor(private httpservice: HttpService) {

    }
    logoutApp(body) {
        return this.httpservice.postBodyNoLoading("logout", body);
    }
}