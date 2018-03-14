import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class EmployeeService {
    constructor(private httpservice: HttpService) {

    }

    // 获取民族
    get_employee_list() {
        let body = JSON.stringify({
          
        });
        return this.httpservice.postBody("get_employee_list", body);
    }


    getDepartmentNoLoading(){
        let body = JSON.stringify({
            partner_id:1
          });
        return this.httpservice.postBodyNoLoading("get_all_departments", body);
    }


    create_employee(data){
        let body = JSON.stringify(data);
        return this.httpservice.postBody("create_employee", body);
    }

    get_employee_info(id_list,is_all){
        let body = JSON.stringify({
            id_list:id_list,
            is_all:is_all
        });
        return this.httpservice.postBody("get_employee_info", body);
    }

    update_employee(data){
        let body = JSON.stringify(data);
        return this.httpservice.postBody("update_employee", body);
    }

}