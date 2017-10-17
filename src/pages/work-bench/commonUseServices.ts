import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class CommonUseServices {
    constructor(private httpservice: HttpService) {

    }
    getApplyList(moffset, mlimit, id) {
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit,
            user_id: id
        });
        return this.httpservice.postBody("get_applylist", body);
    }
    getApplyDetail(id){
        let body = JSON.stringify({
            id : id
        });
        return this.httpservice.postBody("get_applylist_detail", body);
    }
    getPaymentReminding(id){
        let body = JSON.stringify({
            id : id
        });
        return this.httpservice.postBody("get_payment_reminding", body);
    }
}