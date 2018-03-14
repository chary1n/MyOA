import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class WriteJournalService{
    constructor(private httpservice: HttpService) {

    }
    //创建拜访记录
    create_visit_journal(body) {
        return this.httpservice.postBody("create_visit", body);
    }

    //获取拜访列表
    get_visit_list(body){
        return this.httpservice.postBody("get_visit_list", body);
    }

    //获取销售团队列表
    get_sale_team(body){
        return this.httpservice.postBody("get_sale_team", body, 1);
    }
}