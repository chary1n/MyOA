import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class BaoBiaoService {
    constructor(private httpservice: HttpService) {

    }

    get_hk_account_detail(body){
        return this.httpservice.postBody('get_hk_account_detail', body);
    }

    get_hk_account_data(body){
        return this.httpservice.postBody('get_hk_account_data', body);
    }

    get_today_data(body){
        return this.httpservice.postBody('get_today_data', body);
    }

    update_hk_account(body){
        return this.httpservice.postBody('update_hk_account', body);
    }

    getZijin(body) {
        // let body = JSON.stringify({
        //    body:"body",
        // });
        return this.httpservice.postBody('get_account_data', body);
    }

    account_hk(){
        let body = JSON.stringify({
           body:"body",
        });
        return this.httpservice.postBody('account_hk', body);
    }
}