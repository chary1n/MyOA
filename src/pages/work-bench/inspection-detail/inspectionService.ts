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
            picking_id: pickIds
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }

    createDebtOrder(production_ids, pickIds) {
        let body = JSON.stringify({
            state: 'process',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }

      noDebtOrder(production_ids, pickIds) {
        let body = JSON.stringify({
            state: 'cancel_backorder',
            pack_operation_product_ids: production_ids,
            picking_id: pickIds
        });
        return this.httpservice.postBody("change_stock_picking_state", body, 1);
    }

       

    

}