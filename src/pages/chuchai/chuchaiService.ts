import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ChuChaiService {
    constructor(private httpservice: HttpService) {
        
    }

    get_is_department(employee_id){
        let body = JSON.stringify({
            employee_id:employee_id,
        });
       return this.httpservice.postBodyNoLoading("get_is_department",body);
    }

    get_total_trip(user_id,need_approve){
        let body = JSON.stringify({
            user_id:user_id,
            need_approve:need_approve,
        });
       return this.httpservice.postBody("get_total_trip",body);
    }

    pass_trip(user_id,vacation_id,remark){
        let body = JSON.stringify({
            user_id:user_id,
            vacation_id:vacation_id,
            remark:remark,
        });
       return this.httpservice.postBody("pass_trip",body);
    }

    refuse_trip(user_id,vacation_id,remark){
        let body = JSON.stringify({
            user_id:user_id,
            vacation_id:vacation_id,
            remark:remark,
        });
       return this.httpservice.postBody("refuse_trip",body);
    }

    search_trip(type,search_text,user_id){
        let body = JSON.stringify({
            type:type,
            search_text:search_text,
            user_id:user_id,
        });
       return this.httpservice.postBody("search_trip",body);
    }
}