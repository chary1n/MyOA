import { HttpService } from './../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class LotteryService {
    constructor(private httpservice: HttpService) {

    }

    set_lottery(body){
        return this.httpservice.postBody("set_lottery", body)
    }

    get_lottery_code(body){
        return this.httpservice.postBody("get_lottery_code", body)
    }
}