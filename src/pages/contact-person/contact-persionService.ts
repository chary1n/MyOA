import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ContactService {
    constructor(private httpservice: HttpService) {

    }

    get_departments(){
        let body = JSON.stringify({
           
        });
       return this.httpservice.postBody("get_departments",body);
    }
}