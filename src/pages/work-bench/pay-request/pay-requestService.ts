import { ModalController } from 'ionic-angular';
import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class PaymentRequestService {
    constructor(private httpservice: HttpService) {
        
    }
    get_payment_request_list(type,limit,offset,user_id,is_plus){
        let body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit,
            type:type,
            is_plus:is_plus
        });
        return this.httpservice.postBody("get_payment_request_list", body);
    }

    reject_payment(id,user_id){
        let body = JSON.stringify({
            payment_id: id,
            user_id:user_id,
        });
        return this.httpservice.postBody("reject_payment", body);
    }

    confirm_payment(id,user_id){
        let body = JSON.stringify({
            payment_id: id,
            user_id:user_id,
        });
        return this.httpservice.postBody("confirm_payment", body);
    }

    manager_confirm(id,user_id){
        let body = JSON.stringify({
            payment_id: id,
            user_id:user_id,
        });
        return this.httpservice.postBody("manager_confirm", body);
    }

    get_bill_detail(id){
        let body = JSON.stringify({
            payment_id: id,
        });
        return this.httpservice.postBody("get_bill_detail", body);
    }

    search_payment(search_name,payment_type,user_id,search_type,search_domain){
        let body = JSON.stringify({
            search_name: search_name,
            payment_type:payment_type,
            user_id:user_id,
            search_type:search_type,
            search_domain:search_domain,
        });
        return this.httpservice.postBody("search_payment", body);
    }
}