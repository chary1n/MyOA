import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class BaoBiaoService {
    constructor(private httpservice: HttpService) {

    }

    update_hk_account(body){
        return this.httpservice.postBody('update_hk_account', body);
    }

    getZijin() {
        let body = JSON.stringify({
           body:"body",
        });
        return this.httpservice.postBody('get_account_data', body);
    }

    account_hk(){
        let body = JSON.stringify({
           body:"body",
        });
        return this.httpservice.postBody('account_hk', body);
    }
}