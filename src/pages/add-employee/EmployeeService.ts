import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class EmployeeService {
    constructor(private httpservice: HttpService) {

    }

    get_me_info(body){
        return this.httpservice.postBody("get_me_info", body)
    }

    new_department_tree(body){
        return this.httpservice.postBody("new_department_tree", body)
    }

    search_id_exist(body){
        return this.httpservice.postBodyNoLoading("search_id_exist", body);
    }

    get_all_bank(body){
        return this.httpservice.postBodyNoLoading("get_all_bank", body);
    }

    get_all_job(body){
        return this.httpservice.postBodyNoLoading("get_all_job", body);
    }

    get_all_attendance(body){
        return this.httpservice.postBodyNoLoading("get_all_attendance", body);
    }

    get_all_department_tree(body){
        return this.httpservice.postBodyNoLoading("get_all_department_tree_simple", body);
    }

    get_all_department_tree_loading(body){
        return this.httpservice.postBody("get_all_department_tree_simple", body);
    }

    get_all_department(){

        let body = JSON.stringify({
          
        });
        return this.httpservice.postBodyNoLoading("get_all_department", body);

    }



    // 获取民族
    get_employee_list() {
        let body = JSON.stringify({
          
        });
        return this.httpservice.postBodyNoLoading("get_employee_list", body);
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
        return this.httpservice.postBodyNoLoading("get_employee_info", body);
    }

    update_employee(data){
        let body = JSON.stringify(data);
        return this.httpservice.postBody("update_employee", body);
    }


    update_nfc_number(data){
        let body = JSON.stringify(data);
        return this.httpservice.postBody("update_nfc_number", body);
    }


}