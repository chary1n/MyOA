import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class LeaveService {
    constructor(private httpservice: HttpService) {

    }

    get_user_is_system_salary(body){
        return this.httpservice.postBody("get_user_is_system_salary",body) 
    }

    hr_confirm_dimission(body){
        return this.httpservice.postBody("hr_confirm_dimission",body) 
    }

    confirm_dimission(body){
        return this.httpservice.postBody("confirm_dimission",body) 
    }

    refuse_dimission(body){
        return this.httpservice.postBody("refuse_dimission",body) 
    }

    get_dismission_detail(body){
        return this.httpservice.postBody("get_dismission_detail",body) 
    }

    get_dismission_list(body){
        return this.httpservice.postBody("get_dismission_list",body) 
    }
}