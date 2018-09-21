import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class EmailService {
    constructor(private httpService: HttpService) {

    }

    getAccountDetail(user_id) {
        let body = JSON.stringify({
            'uid': user_id,
        });
        return this.httpService.postBody('get_account_detail', body);
    }

    getEmailList(user_id, account_id, email_type, state_type,data_id, limit, offset) {
        let body = JSON.stringify({
            'uid': user_id,
            'account_id': account_id,
            'email_type': email_type,
            'state_type': state_type,
            'data_id':data_id,
            'limit': limit,
            'offset': offset
        });
        return this.httpService.postBody('get_email_list', body);
    }

    get_email_detail(id) {
        let body = JSON.stringify({
            'id': id
        });
        return this.httpService.postBody('rt_mail/get_email_detail', body, 2);
    }


    get_email_label_folder(account_id,user_id){
        let body = JSON.stringify({
            'account_id': account_id,
            'uid':user_id
        });
        return this.httpService.postBodyNoLoading('rt_mail/get_email_label_folder', body, 2);
    }


    send_mail(user_id,account_id,email_to,email_cc,email_bcc,subject,body,draft){
        let send_body = JSON.stringify({
            'uid':user_id,
            'account_id':account_id,
            'email_to': email_to,
            'email_cc':email_cc,
            'email_bcc':email_bcc,
            'subject':subject,
            "body_html":body,
            'draft':draft
        });
        return this.httpService.postBodyNoLoading('rt_mail/email_sent', send_body, 2);

    }
}