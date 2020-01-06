import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class BoxService {
    constructor(private httpservice: HttpService) {

    }

    get_box_active_data(body){
        return this.httpservice.postRoboBody("get_box_active_data", body)
    }

}