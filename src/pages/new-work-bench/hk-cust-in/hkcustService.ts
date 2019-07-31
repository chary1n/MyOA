import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class HkCustService {
    constructor(private httpservice: HttpService) {

    }

    get_total_hk_cust_in(body){
        return this.httpservice.postBody("get_total_hk_cust_in", body)
    }

    get_total_hk_account_payment(body){
        return this.httpservice.postBody("get_total_hk_account_payment", body)
    }

    search_hk_cust_in_with_domain(body){
        return this.httpservice.postBody("search_hk_cust_in_with_domain", body)
    }

    get_hk_account_payment_detail(body){
        return this.httpservice.postBody("get_hk_account_payment_detail", body)
    }

    get_me_sale_team(body){
        return this.httpservice.postBodyNoLoading("get_me_sale_team", body)
    }

    confirm_hk_account_payment(body){
        return this.httpservice.postBody("confirm_hk_account_payment", body)
    }
}