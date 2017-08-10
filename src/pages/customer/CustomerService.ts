import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class CustomerService {
    constructor(private httpservice: HttpService) {

    }

    get_clues(limit, offset) {
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
        });
        return this.httpservice.postBody("get_clues", body);
    }
}