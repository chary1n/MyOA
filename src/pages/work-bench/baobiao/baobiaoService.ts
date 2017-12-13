import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class BaoBiaoService {
    constructor(private httpservice: HttpService) {

    }

    getZijin() {
        let body = JSON.stringify({
           body:"body",
        });
        return this.httpservice.postBody('get_account_data', body,1);
    }
}