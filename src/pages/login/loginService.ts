import { Injectable } from '@angular/core';
import { APP_SERVER_URL } from './../../providers/Constants';
import { HttpService } from '../../providers/HttpService';

@Injectable()
export class LoginService{
    constructor(private httpService :HttpService){

    }

    getDBInfo(){
        return this.httpService.get(APP_SERVER_URL+'/linkloving_app_api/get_db_list',null);
    }


}
