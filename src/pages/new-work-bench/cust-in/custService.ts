import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class CustService {
    constructor(private httpservice: HttpService) {

    }

    get_total_cust_in(body){
        return this.httpservice.postBodyNoLoading("get_total_cust_in", body)
    }

    search_cust_in_with_domain(body){
        return this.httpservice.postBody("search_cust_in_with_domain", body)
    }

    confirm_account_payment(body){
        return this.httpservice.postBody("confirm_account_payment", body)
    }

    get_total_sale_man(body){
        return this.httpservice.postBody("get_total_sale_man", body)
    }

    get_total_team(body){
        return this.httpservice.postBody("get_total_team", body)
    }

    get_account_payment_detail(body){
        return this.httpservice.postBody("get_account_payment_detail", body)
    }

    get_total_account_payment(body){
        return this.httpservice.postBody("get_total_account_payment", body)
    }
}