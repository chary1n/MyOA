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
       return this.httpservice.postBodyNoLoading("employee_attendance",body);
    }

    get_ble_device(){
        let body = JSON.stringify({});
       return this.httpservice.postBodyNoLoading("get_ble_device",body);
    }

    get_employee_attendance(day_start,day_end,user_id){
        let body = JSON.stringify({
            day_start:day_start,
            day_end:day_end,
            user_id:user_id,
        });
       return this.httpservice.postBodyNoLoading("get_employee_attendance",body);
    }

    get_is_department(employee_id){
        let body = JSON.stringify({
            employee_id:employee_id,
        });
       return this.httpservice.postBodyNoLoading("get_is_department",body);
    }

    get_department_employee_attendance(manager_id,day_start,day_end){
        let body = JSON.stringify({
            manager_id:manager_id,
            day_start:day_start,
            day_end:day_end,
        });
       return this.httpservice.postBody("get_department_employee_attendance",body);
    }

    trans_location(latitude,longti){
       let url_str = "http://api.map.baidu.com/geoconv/v1/?coords=" + longti + "," + latitude + "&from=1&to=5&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7" 
       return this.httpservice.getWithUrl(url_str);
    }

    get_location_now(latitude,longti){
        let url_str = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=" + latitude + "," + longti + "&output=json&pois=1&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7"
        return this.httpservice.getLocationWithUrl(url_str);
    }

    location_attendance(data_params)
    {
        let body = JSON.stringify(data_params);
       return this.httpservice.postBody("location_attendance",body);
    }

    get_month_attendance(month_str, user_id)
    {
        let body = JSON.stringify({
            month_str:month_str,
            user_id:user_id,
        });
       return this.httpservice.postBody("get_month_attendance",body);
    }
}