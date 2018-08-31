import { HttpService } from '../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class FirstShowService {
    constructor(private httpService: HttpService) {

    }

    get_schedule_list(body){
        return this.httpService.postBody("get_schedule_list", body);
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
        return this.httpService.postBody("get_event_type", body);
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

    finish_wait_thing(body){
        return this.httpService.postBody("write_wait_thing", body);
    }

    cancel_wait_thing(body){
        return this.httpService.postBody("cancel_wait_thing", body);
    }

    search_one_partner(body){
        return this.httpService.postBody("search_one_partner", body);
    }

    get_late_list(body){
        return this.httpService.postBody("get_late_list", body);
    }
}