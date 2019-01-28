import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class NewPayService {
    constructor(private httpservice: HttpService) {

    }

    get_pay_detail(body){
        return this.httpservice.postBody("get_pay_detail", body)
    }

    search_payment(body){
        return this.httpservice.postBody("search_payment", body)
    }

    get_bill_detail(body){
        return this.httpservice.postBody("get_bill_detail", body)
    }

    get_all_pay_list(body) {
        return this.httpservice.postBody("get_all_pay_list", body)
    }

    approval_pay_request(body) {
        return this.httpservice.postBody("approval_pay_request", body)
    }

    get_po(body) {
        return this.httpservice.postBody("get_po", body)
    }
}