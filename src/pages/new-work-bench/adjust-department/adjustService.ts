import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class AdjustService {
    constructor(private httpservice: HttpService) {

    }

    deal_adjust_department(body){
        return this.httpservice.postBody("deal_adjust_department",body)
    }

    get_adjust_department_detail(body){
        return this.httpservice.postBody("get_adjust_department_detail",body)
    }

    get_total_adjust_department(body){
        return this.httpservice.postBody("get_total_adjust_department",body)
    }
}