import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class IntpService {
    constructor(private httpservice: HttpService) {

    }

    search_intp(body){
        return this.httpservice.postBody("search_intp",body)
    }

    confirm_intp(body){
        return this.httpservice.postBody("confirm_intp",body)
    }

    refuse_intp(body){
        return this.httpservice.postBody("refuse_intp",body)
    }

    get_intp_detail(body){
        return this.httpservice.postBody("get_intp_detail",body)
    }

    get_total_approval_intp(body){
        return this.httpservice.postBody("get_total_approval_intp",body)
    }   
}