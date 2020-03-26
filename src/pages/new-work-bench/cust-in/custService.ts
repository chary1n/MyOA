import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class CustService {
    constructor(private httpservice: HttpService) {

    }

    get_so_is_in_use(body){
        return this.httpservice.postBody("get_so_is_in_use", body)
    }

    get_pay_detail(body){
        return this.httpservice.postBody("get_pay_detail", body)
    }

    get_zz_detail(body){
        return this.httpservice.postBody("get_zz_detail", body)
    }

    get_bx_detail(body){
        return this.httpservice.postBody("get_bx_detail", body)
    }

    get_total_sale_order(body){
        return this.httpservice.postBody("get_total_sale_order", body)
    }

    get_me_sale_team(body){
        return this.httpservice.postBodyNoLoading("get_me_sale_team", body)
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

    get_all_departments_select(body){
        return this.httpservice.postBody("get_all_departments_select", body)
    }

    get_all_meeting_f(body) {
        return this.httpservice.postBody("get_all_meeting_f", body)
    }
}