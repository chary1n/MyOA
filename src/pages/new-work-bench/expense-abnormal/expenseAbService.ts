import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ExpAbService {
    constructor(private httpservice: HttpService) {

    }

    get_all_expense_abnormal_data(body){
        return this.httpservice.postBody("get_all_expense_abnormal_data", body)
    }

    search_expense_abnormal_data(body) {
        return this.httpservice.postBody("search_expense_abnormal_data", body)
    }

    get_expense_abnormal_detail(body) {
        return this.httpservice.postBody("get_expense_abnormal_detail", body)
    }
}