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

}