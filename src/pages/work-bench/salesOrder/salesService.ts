import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class SalesSearvice {
    constructor(private httpservice: HttpService) {

    }
    getSalesOrder(moffset, mlimit) {
        let body = JSON.stringify({
            state: 'purchase',
            offset: moffset,
            limit: mlimit
        });
        return this.httpservice.postBody("get_po", body);
    }
    getQuotesList(moffset, mlimit) {
        let body = JSON.stringify({
            state: 'purchase',
            offset: moffset,
            limit: mlimit
        });
        return this.httpservice.postBody("get_po", body);
    }
    getSalesReturn(moffset, mlimit) {
        let body = JSON.stringify({
            state: 'purchase',
            offset: moffset,
            limit: mlimit
        });
        return this.httpservice.postBody("get_po", body);
    }

}