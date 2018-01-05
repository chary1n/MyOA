import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class GongDanService {
    constructor(private httpservice: HttpService) {

    }
    create_work_order(body) {
        return this.httpservice.postBody("create_work_order", body,1);
    }


    getDepartment(){
        let body = JSON.stringify({
            partner_id:1
          });
        return this.httpservice.postBody("get_all_departments", body);
    }
}