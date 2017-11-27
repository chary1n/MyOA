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

    search_employee(name){
        let body = JSON.stringify({
           name:name,
        });
        return this.httpservice.postBody("search_employee", body);
    }

    action_pass(id,remark,create_uid){
        let body = JSON.stringify({
           id:id,
           remark:remark,
           create_uid:create_uid,
        });
        return this.httpservice.postBody("action_pass", body);
    }

    action_deny(id,remark,create_uid){
        let body = JSON.stringify({
           id:id,
           remark:remark,
           create_uid:create_uid,
        });
        return this.httpservice.postBody("action_deny", body);
    }

    action_to_next(id,remark,create_uid,to_last_review,type,partner_name,partner_id){
        let body = JSON.stringify({
           id:id,
           remark:remark,
           create_uid:create_uid,
           to_last_review:to_last_review,
           type:type,
           partner_name:partner_name,
           partner_id:partner_id,
        });
        return this.httpservice.postBody("action_to_next", body);
    }

    search_material_request(search_text,type,user_id){
        let body = JSON.stringify({
           search_text:search_text,
           type:type,
           user_id:user_id,
        });
        return this.httpservice.postBody("search_material_request", body);
    }
}