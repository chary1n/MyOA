import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class SaleReportService {
    constructor(private httpservice: HttpService) {

    }

    sale_data_for_sale_man(body){
        return this.httpservice.postBody("sale_data_for_sale_man", body);
    }
}