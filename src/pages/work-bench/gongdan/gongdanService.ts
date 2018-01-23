import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class GongDanService {
    constructor(private httpservice: HttpService) {

    }
    create_work_order(body) {
        return this.httpservice.postBody("create_work_order", body,1);
    }






    my_work_order_statistics(){
        let body = JSON.stringify({
            uid:HttpService.user_id
          });
        return this.httpservice.postBody("my_work_order_statistics", body,1);
    }


    work_order_search(body){
        return this.httpservice.postBody("work_order_search", body,1);
    }


    work_order_searchNoLoading(body){
        return this.httpservice.postBodyNoLoading("work_order_search", body,1);
    }

    work_order_statistics(start_date,end_date,tag_ids){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            start_date:start_date,
            end_date:end_date,
            tag_ids:tag_ids,
          });
        return this.httpservice.postBodyNoLoading("work_order_statistics", body,1);
    }

    work_order_statisticsWithTime(start_date,end_date){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            start_date :start_date,
            end_date :end_date
          });
        return this.httpservice.postBody("work_order_statistics", body,1);
    }


    searchAtMe(body){
        return this.httpservice.postBodyNoLoading("searchAtMe", body,1);
    }


    getDepartment(){
        let body = JSON.stringify({
            partner_id:1
          });
        return this.httpservice.postBody("get_all_departments", body);
    }

    getGongdanDetail(id){
        let body = JSON.stringify({
            work_order_id:id,
            uid:HttpService.user_id
          });
        return this.httpservice.postBody("work_order_search_by_id", body,1);
    }

    work_order_add_record(content,reply_uid,record_type,work_order_id,parent_id){
        let body = JSON.stringify({
            content:content,
            reply_uid:reply_uid,
            record_type:record_type,
            work_order_id:work_order_id,
            parent_id:parent_id,
            uid :HttpService.user_id
          });
        return this.httpservice.postBody("work_order_add_record", body,1);
    }

    get_all_employees(){
        let body = JSON.stringify({
        });
       return this.httpservice.postBody("get_all_employees",body);
    }

    get_department_employees(department_ids)
    {
        let body = JSON.stringify({
            department_ids:department_ids
        });
       return this.httpservice.postBody("get_department_employees",body);
    }

    work_order_action(uid,work_order_id,action_type,assign_uid){
        let body = JSON.stringify({
            uid:uid,
            work_order_id:work_order_id,
            action_type:action_type,
            assign_uid:assign_uid,
          });
        return this.httpservice.postBody("work_order_action", body,1);
    }

    work_order_retract(uid,work_order_id){
         let body = JSON.stringify({
            uid:uid,
            work_order_id:work_order_id,
          });
        return this.httpservice.postBody("work_order_retract", body,1);
    }

    commit_draft(body){
        return this.httpservice.postBody("commit_draft", body,1);
    }

    search_gongdan(search_text,search_type){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            search_text:search_text,
            search_type:search_type,
          });
        return this.httpservice.postBody("search_gongdan", body,1);
    }

    get_all_biaoqian(){
        return this.httpservice.postBodyNoLoading("get_all_biaoqian", {},1);
    }

    update_biaoqian(work_order_id,tag_ids){
        let body = JSON.stringify({
            uid:HttpService.user_id,
            work_order_id:work_order_id,
            tag_ids:tag_ids,
          });
        return this.httpservice.postBody("update_biaoqian", body,1);
    }
}