import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class CustomerService {
    constructor(private httpservice: HttpService) {

    }

    customer_details(id){
        let body = JSON.stringify({
            id:id
        });
        return this.httpservice.postBody("customer_details", body);
    }

    //获取线索
    get_clues(limit, offset, user_id) {
        let body = JSON.stringify({
            limit: limit,
            offset: offset,
            user_id: user_id,
        });
        return this.httpservice.postBody("get_clues", body);
    }

    //潜在客户
    getQianZaiCustomer(limit, offset, user_id) {
        let body = JSON.stringify({
            limit: limit,
            offset: offset,
            is_order: "False",
            public_partners: "!=",
            user_id: user_id,
        });
        return this.httpservice.postBody("get_customers", body);
    }

    //客户
    getNormalCustomer(limit, offset, user_id) {
        let body = JSON.stringify({
            limit: limit,
            offset: offset,
            is_order: "True",
            user_id: user_id
        });
        return this.httpservice.postBody("get_customers", body);
    }

    //公海客户
    getPublicCustomer(limit, offset, user_id) {
        let body = JSON.stringify({
            limit: limit,
            offset: offset,
            public_partners: "=",
            user_id: user_id
        });
        return this.httpservice.postBody("get_customers", body);
    }


    searchClues(mName,mId) {
        let body = JSON.stringify({
            type: "public",
            name: mName,
            user_id :mId 
        });
        return this.httpservice.postBody("search_customer", body);
    }

    searchHiddenCustomer(mName,mId) {
        let body = JSON.stringify({
            type: "not_public",
            name: mName,
            user_id :mId 
        });
        return this.httpservice.postBody("search_customer", body);
    }

    searchNormalCustomer(mName,mId) {
        let body = JSON.stringify({
            type: "simple",
            name: mName,
            user_id :mId 
        });
        return this.httpservice.postBody("search_customer", body);
    }

    searchPublicCustomer(mName,mId) {
        let body = JSON.stringify({
            type: "public",
            name: mName,
            user_id :mId 
        });
        return this.httpservice.postBody("search_customer", body);
    }
}