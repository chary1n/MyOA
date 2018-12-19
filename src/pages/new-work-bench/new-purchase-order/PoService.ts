import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class PoService {
    constructor(private httpservice: HttpService) {

    }

    // 获取订单详细
    get_po(body) {
        return this.httpservice.postBody("get_po", body);
    }

    get_po_approve(body){
        return this.httpservice.postBodyNoLoading("get_po_approve", body);
    }

    confirm_po(body){
        return this.httpservice.postBody("confirm_po", body);
    }

    cancel_po(body){
        return this.httpservice.postBody("cancel_po", body);
    }

    //采购退货
    get_prma(body) {
        // let body = JSON.stringify({
        //     offset: moffset,
        //     limit: mlimit,
        //     user_id:HttpService.user_id
        // });
        return this.httpservice.postBody("get_prma", body);
    }

    search_po(body){
        return this.httpservice.postBody("search_po", body);
    }

    search_return(body){
        return this.httpservice.postBody("search_return", body);
    }
}