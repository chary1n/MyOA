import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class VacationService {
    constructor(private httpservice: HttpService) {
        
    }

    create_submit_vacation(body){
        return this.httpservice.postBodyNoLoading("create_submit_vacation",body);
    }

    create_save_vacation(body){
        return this.httpservice.postBodyNoLoading("create_save_vacation",body);
    }

    get_vacation_duration(body){
        return this.httpservice.postBodyNoLoading("get_vacation_duration",body);
    }

    get_vacation_warning(body){
        return this.httpservice.postBodyNoLoading("get_vacation_warning",body);
    }

    save_vacation(body){
        return this.httpservice.postBody("save_vacation",body);
    }

    submit_vacation(body){
        return this.httpservice.postBody("submit_vacation",body);
    }

    back_vacation(body){
        return this.httpservice.postBody("back_vacation",body);
    }

    get_vacation_detail(body){
        return this.httpservice.postBody("get_vacation_detail",body);
    }
    
    get_is_department(employee_id){
        let body = JSON.stringify({
            employee_id:employee_id,
        });
       return this.httpservice.postBodyNoLoading("get_is_department",body);
    }

    get_total_vacation(user_id,need_approve){
        let body = JSON.stringify({
            user_id:user_id,
            need_approve:need_approve,
        });
       return this.httpservice.postBody("get_total_vacation",body);
    }

    pass_vacation(user_id,vacation_id,remark){
        let body = JSON.stringify({
            user_id:user_id,
            vacation_id:vacation_id,
            remark:remark,
        });
       return this.httpservice.postBody("pass_vacation",body);
    }

    refuse_vacation(user_id,vacation_id,remark){
        let body = JSON.stringify({
            user_id:user_id,
            vacation_id:vacation_id,
            remark:remark,
        });
       return this.httpservice.postBody("refuse_vacation",body);
    }

    search_vacation(type,search_text,user_id,me){
        let body = JSON.stringify({
            type:type,
            search_text:search_text,
            user_id:user_id,
            me:me
        });
       return this.httpservice.postBody("search_vacation",body);
    }
}