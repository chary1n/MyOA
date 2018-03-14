import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class KaoQinService {
    constructor(private httpservice: HttpService) {

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

    employee_attendance(data_params)
    {
        let body = JSON.stringify(data_params);
       return this.httpservice.postBody("employee_attendance",body);
    }
}