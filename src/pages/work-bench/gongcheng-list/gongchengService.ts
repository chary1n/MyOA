import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class GongchengService {
    constructor(private httpservice: HttpService) {

    }
    get_material_request(body){
        return this.httpservice.postBody("get_material_request",body);
    }

    search_material_request(body){
        return this.httpservice.postBody("search_material_request",body);
    }

    approval_material_request(body){
        return this.httpservice.postBody("approval_material_request",body);
    }
}