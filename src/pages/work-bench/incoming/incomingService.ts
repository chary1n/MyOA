import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

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
    }

}