import { HttpService } from '../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class FirstShowService {
    constructor(private httpService: HttpService) {

    }
    search_one_pcc_partner(body){
        return this.httpService.postBodyNoLoading("search_one_pcc_partner", body)
    }

    get_all_rw_reply(body){
        return this.httpService.postBody("get_all_rw_reply", body)
    }

    create_rw_reply(body){
        return this.httpService.postBody("create_rw_reply", body)
    }

    get_all_manager(body){
        return this.httpService.postBody("get_all_manager", body)
    }

    rw_reply(body){
        return this.httpService.postBody("rw_reply", body)
    }

    get_total_need_pcc_list(body){
        return this.httpService.postBody("get_total_need_pcc_list", body)
    }

    get_pcc_list(body){
        return this.httpService.postBody("get_pcc_list", body)
    }

    get_total_task(body){
        return this.httpService.postBody("get_total_task", body)
    }

    quit_all(body){
        return this.httpService.postBody("quit_all", body);
    }

    meeting_fuze_is_check_in(body)
    {
        return this.httpService.postBody("meeting_fuze_is_check_in", body);
    }

    delete_sub_project(body){
        return this.httpService.postBody("delete_sub_project", body);
    }

    delete_meeting_line(body){
        return this.httpService.postBody("delete_meeting_line", body);
    }

    check_in(body){
        return this.httpService.postBody("check_in", body);
    }

    meeting_check_in(body){
        return this.httpService.postBody("meeting_check_in", body);
    }

    read_event(body){
        return this.httpService.postBodyNoLoading("read_event", body);
    }

    get_calendar_all(body){
        return this.httpService.postBody("get_calendar_all", body);
    }

    get_all_department(body){
        return this.httpService.postBody("get_all_department_tree", body);
    }

    get_is_department(employee_id){
        let body = JSON.stringify({
            employee_id:employee_id,
        });
       return this.httpService.postBodyNoLoading("get_is_department",body);
    }

    delete_reply(body){
        return this.httpService.postBody("delete_reply", body);
    }

    read_total_reply(body){
        return this.httpService.postBody("read_total_reply", body);
    }

    get_un_read_reply(body){
        return this.httpService.postBodyNoLoading("get_un_read_reply", body);
    }

    get_employee_detail(user_id){
        let body = JSON.stringify({
           user_id:user_id,
          });
        return this.httpService.postBody("get_employee_detail", body,1);
    }

    update_zan(body){
        return this.httpService.postBodyNoLoading("update_zan", body);
    }

    reply_to(body){
        return this.httpService.postBody("reply_to", body);
    }

    get_event_detail(body){
        return this.httpService.postBodyNoLoading("get_event_detail", body);
    }

    get_schedule_list(body){
        return this.httpService.postBodyNoLoading("get_schedule_list", body);
    }

    get_schedule_list_with_domain(body,domain){
        return this.httpService.postBodyNoLoading("get_schedule_list_with_domain", {'body':body,'domain':domain});
    }

    get_schedule_list_with_domain_new(body,domain){
        return this.httpService.postBodyNoLoading("get_schedule_list_with_domain_new", {'body':body,'domain':domain});
    }

    get_backlog_identify(body){
        return this.httpService.postBodyNoLoading("get_backlog_identify", body);
    }
    //跳转到相应的模块
    get_res_model(body){
        return this.httpService.postBody("get_res_model", body);
    }

    delete_res_model(body){
        return this.httpService.postBody("delete_res_model", body);
    }

    get_event_type(body){
        return this.httpService.postBodyNoLoading("get_event_type", body);
    }
    
    get_all_partner(body){
        return this.httpService.postBody("get_all_partner", body);
    }

    get_calendar_alarms(body){
        return this.httpService.postBody("get_calendar_alarms", body);
    }

    create_new_schedule(body){
        return this.httpService.postBody("create_new_schedule", body);
    }

    write_wait_thing(body){
        return this.httpService.postBody("write_wait_thing", body);
    }

    write_wait_thing_new(body){
        return this.httpService.postBody("write_wait_thing_new", body);
    }

    finish_wait_thing(body){
        return this.httpService.postBody("write_wait_thing", body);
    }

    cancel_wait_thing(body){
        return this.httpService.postBody("cancel_wait_thing", body);
    }

    search_one_partner(body){
        return this.httpService.postBodyNoLoading("search_one_partner", body);
    }

    search_one_other_partner(body){
        return this.httpService.postBodyNoLoading("search_one_other_partner", body);
    }

    get_late_list(body){
        return this.httpService.postBody("get_late_list_new", body);
    }

    //获取审批页面的数目
    get_approval_num(body){
        return this.httpService.postBodyNoLoading("get_approval_num", body);
    }

    create_meeting(body){
        return this.httpService.postBody("create_meeting", body);
    }
    
    get_meeting(body){
        return this.httpService.postBodyNoLoading("get_meeting", body);
    }
    
    create_meeting_line(body){
        return this.httpService.postBody("create_meeting_line", body);
    }


    // delete_meeting_line(body){
    //     return this.httpService.postBody("delete_meeting_line", body);
    // }

    delete_meeting(body){
        return this.httpService.postBody("delete_meeting", body);
    }

    write_meeting(body){
        return this.httpService.postBody("write_meeting", body);
    }

    // get_meeting_line(body){
    //     return this.httpService.postBody("get_meeting_line", body);
    // }

    change_meeting(body){
        return this.httpService.postBody("change_meeting", body);
    }
    
    get_all_schedule(body){
        return this.httpService.postBody("get_all_schedule_new", body);
    }

    get_all_schedule_new_test(body){
        return this.httpService.postBody("get_all_schedule_new_test", body);
    }
    

    search_all_schedule(body){
        return this.httpService.postBody("search_all_schedule", body);
    }
}