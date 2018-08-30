import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class AttendanceService {
    constructor(private httpservice: HttpService) {

    }

    get_is_department(employee_id){
        let body = JSON.stringify({
            employee_id:employee_id,
        });
       return this.httpservice.postBodyNoLoading("get_is_department",body);
    }

    get_all_edit_card(user_id,need_approve){
        let body = JSON.stringify({
            user_id:user_id,
            need_approve:need_approve,
        });
       return this.httpservice.postBody("get_all_edit_card",body);
    }

    get_today_attendance(day_start,day_end,user_id)
    {
        let body = JSON.stringify({
            day_start:day_start,
            day_end:day_end,
            user_id:user_id,
        });
       return this.httpservice.postBody("get_today_attendance",body);
    }

    save_edit_attendance(lines,user_id,month_time)
    {
        let body = JSON.stringify({
            lines:lines,
            user_id:user_id,
            month_time:month_time,
        });
       return this.httpservice.postBody("save_edit_attendance",body);
    }

    submit_edit_attendance(lines,user_id,month_time)
    {
        let body = JSON.stringify({
            lines:lines,
            user_id:user_id,
            month_time:month_time,
        });
       return this.httpservice.postBody("submit_edit_attendance",body);
    }

    refuse_edit_card(user_id,remark,edit_id){
        let body = JSON.stringify({
            remark:remark,
            user_id:user_id,
            edit_id:edit_id,
        });
       return this.httpservice.postBody("refuse_edit_card",body);
    }
    
    confirm_edit_card(user_id,remark,edit_id){
        let body = JSON.stringify({
            remark:remark,
            user_id:user_id,
            edit_id:edit_id,
        });
       return this.httpservice.postBody("confirm_edit_card",body);
    }

    back_edit_card(user_id,remark,edit_id){
        let body = JSON.stringify({
            remark:remark,
            user_id:user_id,
            edit_id:edit_id,
        });
       return this.httpservice.postBody("back_edit_card",body);
    }

    submit_edit_card(user_id,lines,edit_id,delete_arr){
        let body = JSON.stringify({
            lines:lines,
            user_id:user_id,
            edit_id:edit_id,
            delete_arr:delete_arr,
        });
       return this.httpservice.postBody("submit_edit_card",body);
    }

    save_edit_card(user_id,lines,edit_id,delete_arr){
        let body = JSON.stringify({
            lines:lines,
            user_id:user_id,
            edit_id:edit_id,
            delete_arr:delete_arr,
        });
       return this.httpservice.postBody("save_edit_card",body);
    }

    search_edit_card(type,search_text,user_id){
        let body = JSON.stringify({
            type:type,
            search_text:search_text,
            user_id:user_id,
        });
       return this.httpservice.postBody("search_edit_card",body);
    }

}