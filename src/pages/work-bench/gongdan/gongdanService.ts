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

    work_order_statistics(){
        let body = JSON.stringify({
            uid:HttpService.user_id
          });
        return this.httpservice.postBody("work_order_statistics", body,1);
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
          });
        return this.httpservice.postBody("work_order_add_record", body,1);
    }

    get_all_employees(){
        let body = JSON.stringify({
        });
       return this.httpservice.postBody("get_all_employees",body);
    }
}