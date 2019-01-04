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


    flag(ids, state) {
        let body = JSON.stringify({
            'ids': ids,
            'state': state
        });
        return this.httpService.postBody('rt_mail/OA_flag', body, 2);
    }

    label(email_id, label_id) {
        let body = JSON.stringify({
            'email_id': email_id,
            'label_id': label_id
        });
        return this.httpService.postBody('rt_mail/OA_label', body, 2);
    }


    unseen(ids, state) {
        let body = JSON.stringify({
            'ids': ids,
            'state': state
        });
        return this.httpService.postBody('rt_mail/OA_unseen', body, 2);
    }

    move(ids, state, email_state) {
        let body = JSON.stringify({
            'ids': ids,
            'state': state,
            'email_state': email_state
        });
        return this.httpService.postBody('rt_mail/OA_move', body, 2);
    }

    delete(ids) {
        let body = JSON.stringify({
            'ids': ids,
        });
        return this.httpService.postBody('rt_mail/OA_delete', body, 2);
    }

    OA_delete_draft(ids) {
        let body = JSON.stringify({
            'ids': ids,
        });
        return this.httpService.postBody('rt_mail/OA_delete_draft', body, 2);
    }



    uploadAttachment(user_id, filename, data) {
        let body = JSON.stringify({
            'uid': user_id,
            'name': filename,
            'datas': data,
        });
        return this.httpService.postBody('rt_mail/upload_attachment', body, 2);
    }

    delete_attachment(id) {
        let body = JSON.stringify({
            'id': id,
        });
        return this.httpService.postBodyNoLoading('rt_mail/delete_attachment', body, 2);
    }


    getEmailList(user_id, account_id, email_type, state_type, data_id, limit, offset) {
        let body = JSON.stringify({
            'uid': user_id,
            'account_id': account_id,
            'email_type': email_type,
            'state_type': state_type,
            'data_id': data_id,
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


    get_email_label_folder(account_id, user_id) {
        let body = JSON.stringify({
            'account_id': account_id,
            'uid': user_id
        });
        return this.httpService.postBodyNoLoading('rt_mail/get_email_label_folder', body, 2);
    }


    send_mail(user_id, account_id, email_to, email_cc, email_bcc, subject, body, attach_list, draft) {
        let send_body = JSON.stringify({
            'uid': user_id,
            'account_id': account_id,
            'email_to': email_to,
            'email_cc': email_cc,
            'email_bcc': email_bcc,
            'subject': subject,
            "body_html": body,
            'attachment_ids': attach_list,
            'draft': draft
        });
        return this.httpService.postBody('rt_mail/email_sent', send_body, 2);

    }


    get_contact_list(uid) {
        let body = JSON.stringify({
            'uid': uid,
        });
        return this.httpService.postBodyNoLoading('rt_mail/get_contact_list', body, 2);
    }

    search_email(type, text ,offset , account_id) {
        let body = JSON.stringify({
            'uid': HttpService.user_id,
            'type': type,
            'text': text,
            'offset':offset,
            'account_id':account_id
        });
        return this.httpService.postBody('rt_mail/oa_mail_search', body, 2);
    }

}