import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class YearEndSalaryService {
    constructor(private httpservice: HttpService) {

    }

    get_me_allowance_jj(body){
        return this.httpservice.postBody("get_me_allowance_jj", body)
    }

    get_all_department_allowance(body) {
        return this.httpservice.postBody("get_all_department_allowance", body)
    }

    get_department_allowance_detail(body){
        return this.httpservice.postBody("get_department_allowance_detail", body)
    }

    get_department_allowance_line_detail(body){
        return this.httpservice.postBody("get_department_allowance_line_detail", body)
    }

    confirm_salary_action(body){
        return this.httpservice.postBody("confirm_salary_action", body);
    }

    refuse_salary_action(body){
        return this.httpservice.postBody("refuse_salary_action", body);
    }
}