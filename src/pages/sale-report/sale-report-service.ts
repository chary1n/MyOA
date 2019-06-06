import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class SaleReportService {
    constructor(private httpservice: HttpService) {

    }

    get_team_dashboard(body){
        return this.httpservice.postBody("get_team_dashboard", body);
    }

    sale_data_for_sale_man(body){
        return this.httpservice.postBody("sale_data_for_sale_man", body);
    }
}