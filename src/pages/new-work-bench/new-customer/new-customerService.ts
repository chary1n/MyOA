import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class NewCustomerService {
    constructor(private httpservice: HttpService) {

    }

    get_partner_messages(body){
        return this.httpservice.postBody("get_partner_messages", body);
    }

    get_customer_shops(body){
        return this.httpservice.postBody("get_customer_shops", body);
    }

    get_customer_detail(body){
        return this.httpservice.postBody("get_customer_detail", body);
    }

    search_partner_with_domain(body){
        return this.httpservice.postBody("search_partner_with_domain", body);
    }

    get_total_customer_with_domain(body){
        return this.httpservice.postBody("get_total_customer_with_domain", body);
    }
}