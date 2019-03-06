import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class MomentsCircleService {
    constructor(private httpservice: HttpService) {

    }
    get_moments_list(body){
        return this.httpservice.postBody("get_moments_list",body);
    }

    get_moments_data_by_id(body){
        return this.httpservice.postBody("get_moments_data_by_id",body);
    }

    delete_moments_data(body){
        return this.httpservice.postBody("delete_moments_data",body);
    }
    
    collect_moments_data(body){
        return this.httpservice.postBodyNoLoading("collect_moments_data",body);
    }
    
    like_moments_data(body){
        return this.httpservice.postBodyNoLoading("like_moments_data",body);
    }

    search_moments_data(body){
        return this.httpservice.postBody("search_moments_data",body);
    }

    get_moments_message(body){
        return this.httpservice.postBodyNoLoading("get_moments_message",body);
    }

    read_total_reply(body){
        return this.httpservice.postBody("read_total_reply", body);
    }

    delete_reply(body){
        return this.httpservice.postBody("delete_reply", body);
    }

    create_new_moments(body){
        return this.httpservice.postBody("create_new_moments", body);
    }

    get_calendar_by_id(body){
        return this.httpservice.postBody("get_calendar_by_id", body);
    }
}