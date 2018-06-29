import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';



@Injectable()
export class PersonService{
    constructor(private httpservice: HttpService) {

    }

    //获取绩效考核列表
    get_performance_list(body){
        return this.httpservice.postBody("get_performance_list", body);
    }

    //保存或者提交
    get_performance_state(body){
        return this.httpservice.postBody("get_performance_state", body);
    }

    //获取结果
    get_performance_result(body){
        return this.httpservice.postBody("get_performance_result", body);
    }
}