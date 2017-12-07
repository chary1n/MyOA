import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class InspectionService {
    constructor(private httpservice: HttpService) {

    }

    // 全部退回
    requestBack(production_ids, pickIds) {
        let body = JSON.stringify({
            state: 'reject',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            uid:HttpService.user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }

    createDebtOrder(production_ids, pickIds) {
        let body = JSON.stringify({
            state: 'process',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            uid:HttpService.user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }


    //不创建欠单或者 不用做操作就请求这个
    noDebtOrder(production_ids, pickIds) {
        let body = JSON.stringify({
            state: 'cancel_backorder',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            uid:HttpService.user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }


    //去分拣
    goFenjian(production_ids, pickIds) {
        let body = JSON.stringify({
            state: 'picking_done',
            is_all: "part",
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            uid:HttpService.user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }


    // 全部入库
    allIncoming(production_ids, pickIds) {
        let body = JSON.stringify({
            state: 'transfer_way',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            is_all: 'all',
            uid:HttpService.user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }


    // 仅良品入库，不良品退回
    onlyGoodProductsIncoming(production_ids, pickIds) {
        let body = JSON.stringify({
            state: 'transfer_way',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds,
            is_all: 'part',
            uid:HttpService.user_id
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }

}