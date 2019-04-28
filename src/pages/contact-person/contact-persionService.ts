import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ContactService {
    constructor(private httpservice: HttpService) {

    }
    new_edit_employee(body){
        return this.httpservice.postBody("new_edit_employee",body)
    }

    un_active_employee(body){
        return this.httpservice.postBody("un_active_employee",body)
    }

    get_department_employees(departments){
        let body = JSON.stringify({
            department_ids :departments
        });
        return this.httpservice.postBody("get_department_employees",body);
    }
    get_departments(){
        let body = JSON.stringify({
           
        });
       return this.httpservice.postBodyNoLoading("get_departments",body);
    }
    
    get_department_detail(department_id){
        let body = JSON.stringify({
           department_id:department_id,
        });
       return this.httpservice.postBody("get_department_detail",body);
    }

    get_all_employees(){
        let body = JSON.stringify({
        });
       return this.httpservice.postBody("get_all_employees",body);
    }

    get_employees(limit,offset){
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
        });
       return this.httpservice.postBody("get_employees",body);
    }

    search_employees(name){
        let body = JSON.stringify({
            name:name,
        });
       return this.httpservice.postBody("search_employees",body);
    }
}