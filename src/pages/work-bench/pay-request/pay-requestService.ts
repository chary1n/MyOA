import { ModalController } from 'ionic-angular';
import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class PaymentRequestService {
    constructor(private httpservice: HttpService) {
        
    }
    get_payment_request_list(type,limit,offset,user_id){
        let body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit,
            type:type,
        });
        return this.httpservice.postBody("get_payment_request_list", body);
    }
}