import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class BusinessService {
    constructor(private httpservice: HttpService) {
        
    }
    get_total_bus_vacation(body){
        return this.httpservice.postBody("get_total_bus_vacation",body);
    }

    search_bus_vacation(body){
        return this.httpservice.postBody("search_bus_vacation",body);
    }

    get_bus_vacation_detail(body){
        return this.httpservice.postBody("get_bus_vacation_detail",body);
    }

    action_bus_vacation(body) {
        return this.httpservice.postBody("action_bus_vacation",body);
    }
}