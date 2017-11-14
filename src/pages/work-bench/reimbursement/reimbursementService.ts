import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ReimbursementService {
    constructor(private httpservice: HttpService) {

    }
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

    confirm1(sheet_id,user_id,reason){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
            reason:reason,
        });
       return this.httpservice.postBody("confirm_approve1",body);
    }

    confirm2(sheet_id,user_id,reason){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
            reason:reason,
        });
       return this.httpservice.postBody("confirm_approve2",body);
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
}