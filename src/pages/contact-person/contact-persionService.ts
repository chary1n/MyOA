import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ContactService {
    constructor(private httpservice: HttpService) {

    }

    get_departments(){
        let body = JSON.stringify({
           
        });
       return this.httpservice.postBody("get_departments",body);
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
}