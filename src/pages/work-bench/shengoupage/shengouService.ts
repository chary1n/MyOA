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

    reset_shengou(user_id,sheet_id,data,department_id){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
            line_data:data,
            department_id:department_id,
        });
       return this.httpservice.postBody("reset_shengou",body);
    }

    get_all_departments(user_id){
        let body = JSON.stringify({
           partner_id:user_id,
        });
        return this.httpservice.postBody("get_all_departments",body);
    }

    get_all_products(){
         let body = JSON.stringify({
           
        });
        return this.httpservice.postBody("get_all_products",body);
    }

    create_shengou(data) {
        let body = JSON.stringify(data);
        console.log("JSON 的body 是" + body)
        return this.httpservice.postBody("create_shengou", body);
    }

    search_shengou(search_text,user_id){
        let body = JSON.stringify({
           search_text:search_text,
           user_id:user_id,
        });
        return this.httpservice.postBody("search_shengou",body);
    }
    search_wait_me_audit(search_text,user_id){
        let body = JSON.stringify({
           search_text:search_text,
           user_id:user_id,
           type:'wait'
        });
        return this.httpservice.postBody("search_shengou2",body);
    }

    search_audited(search_text,user_id){
        let body = JSON.stringify({
           search_text:search_text,
           user_id:user_id,
           type :'audited'
        });
        return this.httpservice.postBody("search_shengou2",body);
    }


    get_audited_purchase(limit,offset,user_id){
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
            user_id:user_id,
            type : "audited"
        });
       return this.httpservice.postBody("audited_purchase",body);
    }

    get_wait_audit_purchase(limit,offset,user_id){
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
            user_id:user_id,
            type :"wait"
        });
       return this.httpservice.postBody("audited_purchase",body);
    }

    confirm1(sheet_id,user_id){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
        });
       return this.httpservice.postBody("confirm_purchase",body);
    }

    refuse(sheet_id,reason,user_id)
    {
        let body = JSON.stringify({
            sheet_id:sheet_id,
            reason:reason,
            user_id:user_id,
        });
       return this.httpservice.postBody("refuse_audit",body);
    }


    getAuditDetail(id) {
        let body = JSON.stringify({
            id: id
        });
        return this.httpservice.postBody("get_audit_detail", body);
    }

    push_apply(sheet_id,user_id){
        let body = JSON.stringify({
            sheet_id: sheet_id,
            user_id:user_id,
        });
        return this.httpservice.postBody("push_apply", body);
    }
}