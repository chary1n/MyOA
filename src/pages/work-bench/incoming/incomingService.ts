import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

<<<<<<< HEAD
@Injectable()
export class IncomingService {
    constructor(private httpService: HttpService) {

    }

    getStockList(partner_id,picking_type_id,state,limit,offset){
        let body = JSON.stringify({
            partner_id: partner_id,
            picking_type_id: picking_type_id,
            state: state,
            limit:limit,
            offset:offset,
        });
        return this.httpService.get('get_stock_picking_list', body,1);
=======

@Injectable()
export class IncomingService {
    constructor(private httpservice: HttpService) {

    }

    getIncomingList<StockPickingListModel>(mlimit,moffset) {
        let body = JSON.stringify({
            partner_id: 0,
            picking_type_id: 1,
            state: "validate",
            limit:mlimit,
            offset:moffset
        });
       return this.httpservice.postBody("get_stock_picking_list",body,1);
>>>>>>> 647901ff4eb547d4a02fab3fae2279ddd69f96fa
    }

}