import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class PurchaseAccountService {
    constructor(private httpservice: HttpService) {

    }

    get_purchase_account(body){
        return this.httpservice.postBody("get_purchase_account", body);
    }

    search_purchase_account(body){
        return this.httpservice.postBody("search_purchase_account", body);
    }

    get_purchase_account_detail(body){
        return this.httpservice.postBody("get_purchase_account_detail", body);
    }

    refuse_purchase_account(body){
        return this.httpservice.postBody("refuse_purchase_account", body)
    }

    confirm_purchase_account(body){
        return this.httpservice.postBody("confirm_purchase_account", body)
    }
}