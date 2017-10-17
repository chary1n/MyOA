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
}