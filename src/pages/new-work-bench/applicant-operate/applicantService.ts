import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ApplicantService {
    constructor(private httpservice: HttpService) {

    }

    send_msg(body){
        return this.httpservice.postBody("send_msg",body)
    }

    reback_offer(body){
        return this.httpservice.postBody("reback_offer",body)
    }

    search_applicant(body){
        return this.httpservice.postBody("search_applicant",body)
    }

    confirm_offer(body){
        return this.httpservice.postBody("confirm_offer",body)
    }

    refuse_offer(body){
        return this.httpservice.postBody("refuse_offer",body)
    }

    get_applicant_offer_detail(body){
        return this.httpservice.postBody("get_applicant_offer_detail",body)
    }

    get_approval_offer_applicant(body){
        return this.httpservice.postBody("get_approval_offer_applicant",body)
    }

    un_active_applicant(body){
        return this.httpservice.postBody("un_active_applicant",body) 
    }

    create_offer(body){
        return this.httpservice.postBody("create_offer",body) 
    }

   getDepartmentNoLoading(){
        let body = JSON.stringify({
            partner_id:1
          });
        return this.httpservice.postBodyNoLoading("get_all_departments", body);
    }

    get_all_job(body){
        return this.httpservice.postBodyNoLoading("get_all_job",body) 
    }

    get_applicant_detail(body){
        return this.httpservice.postBody("get_applicant_detail",body) 
    }

    get_total_applicant(body){
        return this.httpservice.postBody("get_total_applicant",body) 
    }
}