import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ShenGouService {
    constructor(private httpservice: HttpService) {

    }
    getshengouList(limit,offset,user_id){
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
            user_id:user_id,
        });
       return this.httpservice.postBody("get_shengoulist",body);
    }

    refuse_shengou(user_id,reason,sheet_id)
    {
        let body = JSON.stringify({
            reason:reason,
            sheet_id:sheet_id,
            user_id:user_id,
        });
       return this.httpservice.postBody("refuse_shengou",body);
    }

    reset_shengou(user_id,sheet_id){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
        });
       return this.httpservice.postBody("reset_shengou",body);
    }

    get_all_departments(){
        let body = JSON.stringify({
           
        });
        return this.httpservice.postBody("get_all_departments",body);
    }

    get_all_products(){
         let body = JSON.stringify({
           
        });
        return this.httpservice.postBody("get_all_products",body);
    }
}