import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class PandianService {
    constructor(private httpservice: HttpService) {

    }
    get_stock_inventory(body){
        return this.httpservice.postBody("get_stock_inventory",body);
    }

    search_stock_inventory(body){
        return this.httpservice.postBody("search_stock_inventory",body);
    }

    confirm_stock_inventory(body){
        return this.httpservice.postBody("confirm_stock_inventory",body);
    }
}