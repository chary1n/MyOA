import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class NewReimbursementService {
    constructor(private httpservice: HttpService) {

    }
    get_bx_detail(body){
        return this.httpservice.postBody("get_bx_detail",body);
    }

    //新的接口
    pass_bx_ok(body){
        return this.httpservice.postBody("pass_bx_ok",body);
    }

    get_before_approved_list(body){
        return this.httpservice.postBody("get_before_approved_list",body);
    }

    get_me_total_bx(body){
        return this.httpservice.postBody("get_me_total_bx",body);
    }
    
    //旧的接口
    getApprovalList(limit,offset,user_id)
    {
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
            user_id:user_id,
        });
       return this.httpservice.postBody("wait_approval",body);
    }

    getAlreadApprovalList(limit,offset,user_id)
    {
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
            user_id:user_id,
        });
       return this.httpservice.postBody("already_approved",body);
    }

    confirm1(sheet_id,user_id,reason,expense_line_ids){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
            reason:reason,
            expense_line_ids:expense_line_ids,
        });
       return this.httpservice.postBody("confirm_approve1",body);
    }

    confirm2(sheet_id,user_id,reason,expense_line_ids){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
            reason:reason,
            expense_line_ids:expense_line_ids,
        });
       return this.httpservice.postBody("confirm_approve2",body);
    }

    confirm_approve3(sheet_id,user_id,reason,expense_line_ids){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
            reason:reason,
            expense_line_ids:expense_line_ids,
        });
       return this.httpservice.postBody("confirm_approve3",body);
    }

    refuse(sheet_id,reason,user_id)
    {
        let body = JSON.stringify({
            sheet_id:sheet_id,
            reason:reason,
            user_id:user_id,
        });
       return this.httpservice.postBody("refuse_approve",body);
    }

    searchApproveList(type,user_id,search_text)
    {
        let body = JSON.stringify({
            type:type,
            user_id:user_id,
            search_text:search_text,
        });
       return this.httpservice.postBody("search_approve",body);
    }

    searchAlreadyApproveList(type,user_id,search_text)
    {
        let body = JSON.stringify({
            type:type,
            user_id:user_id,
            search_text:search_text,
        });
       return this.httpservice.postBody("search_already_approve",body);
    }

    searchMeList(type,user_id,search_text)
    {
        let body = JSON.stringify({
            type:type,
            user_id:user_id,
            search_text:search_text,
        });
       return this.httpservice.postBody("search_me",body);
    }
}