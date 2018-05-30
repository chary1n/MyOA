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


    //获取管理的销售团队
    get_sale_team(uid){
        let body = JSON.stringify({
            uid: uid
        });
        return this.httpservice.postBody("get_sale_team", body);
    }

    //获取所有的销售团队
    get_all_sale_team(){
        let body = JSON.stringify({
        });
        return this.httpservice.postBody("get_all_sale_team", body);
    }

    //获取团队的销售员
    get_saleteam_person(body){
        return this.httpservice.postBody("get_saleteam_person", body);
    }
}