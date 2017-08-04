import { ModalController } from 'ionic-angular';
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

    // 询价单
        requestPriceOrder(moffset, mlimit) {
        let body = JSON.stringify({
            state: 'draft',
            offset: moffset,
            limit: mlimit
        });
        return this.httpservice.postBody("get_po", body);
    }



    // make By MRp
    requestMakeOrderByMRP(moffset,mlimit){
        let body = JSON.stringify({
            state: 'make_by_mrp',
            offset: moffset,
            limit: mlimit
        });
        return this.httpservice.postBody("get_po", body);
    }
    // 获取订单详细
     requestOrderDetail(mid){
        let body = JSON.stringify({
            id:mid
        });
        return this.httpservice.postBody("get_po", body);
    }

    //采购退货
    requestReturnOrder(moffset, mlimit) {
        let body = JSON.stringify({
            offset: moffset,
            limit: mlimit
        });
        return this.httpservice.postBody("get_prma", body);
    }

    //采购退货详情
    requestReturnOrderDetail(mid) {
        let body = JSON.stringify({
            id:mid
        });
        return this.httpservice.postBody("get_prma", body);
    }

    //联系人
    get_contact_phone_number(id,model)
    {
        let body = JSON.stringify({
            id:id,
            model:model
        });
        return this.httpservice.postBody("get_contact_phone_number", body);
    }

    get_delivery_notes(id)
    {
        let body = JSON.stringify({
            id:id,
        });
        return this.httpservice.postBody("get_delivery_notes", body);
    }

    get_back_delivery_notes(id)
    {
        let body = JSON.stringify({
            id:id,
            prma:"1"
        });
        return this.httpservice.postBody("get_delivery_notes", body);
    }
}