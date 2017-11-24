import { ModalController } from 'ionic-angular';
import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class materialService {
    constructor(private httpservice: HttpService) {

    }
    get_material_request_list(limit,offset,user_id){
        let body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_material_request_list", body);
    }

    get_wait_me_material_request_list(limit,offset,user_id){
        let body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_wait_me_material_request_list", body);
    }

    get_already_material_request_list(limit,offset,user_id){
        let body = JSON.stringify({
            user_id: user_id,
            offset: offset,
            limit: limit
        });
        return this.httpservice.postBody("get_already_material_request_list", body);
    }

    get_final_review(){
        let body = JSON.stringify({
           
        });
        return this.httpservice.postBody("get_final_review", body);
    }
}