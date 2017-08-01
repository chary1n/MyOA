import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class orderService {
    constructor(private httpservice: HttpService) {

    }


// 采购订单
    requestIncomingOrder(moffset, mlimit) {
        let body = JSON.stringify({
            state: 'purchase',
            offset: moffset,
            limit: mlimit
        });
        return this.httpservice.postBody("get_po", body);
    }



}