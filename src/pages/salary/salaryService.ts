import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';
// import { APP_SERVER_URL, APP_SERVER_URL_T } from './../../providers/Constants';

@Injectable()
export class SalaryService {
    constructor(private httpService: HttpService) {

    }
    get_detail_bt(body){
        return this.httpService.postBody("get_detail_bt", body);
    }

    get_approval_bt(body){
        return this.httpService.postBody("get_approval_bt", body);
    }

    confirm_salary_action(body){
        return this.httpService.postBody("confirm_salary_action", body);
    }

    refuse_salary_action(body){
        return this.httpService.postBody("refuse_salary_action", body);
    }

    get_detail_tc(body){
        return this.httpService.postBody("get_detail_tc", body);
    }

    get_approval_tc(body){
        return this.httpService.postBody("get_approval_tc", body);
    }

    get_approval_num(body){
        return this.httpService.postBodyNoLoading("get_approval_num", body);
    }

    refuse_adjust_salary(body){
        return this.httpService.postBody("refuse_adjust_salary",body);
    }

    pass_adjust_salary(body){
        return this.httpService.postBody("pass_adjust_salary",body);
    }

    get_adjust_salary_detail(body){
        return this.httpService.postBody("get_adjust_salary_detail",body);
    }

    get_wait_approved_adjust_salary(body){
        return this.httpService.postBody("get_wait_approved_adjust_salary",body);
    }

    refuse_salary(body){
        return this.httpService.postBody("refuse_salary",body);
    }

    pass_salary(body){
        return this.httpService.postBody("pass_salary",body);
    }

    get_salary_detail(body){
        return this.httpService.postBody("get_salary_detail",body);
    }

    get_wait_approved_salary(body){
        return this.httpService.postBody("get_wait_approved_salary",body);
    }

    create(user_id, year, children, continues, big, house_tax, house, old_person, total,id) {
        let body = JSON.stringify({
            user_id: user_id,
            year: year,
            children: children,
            continues: continues,
            big: big,
            house_tax: house_tax,
            house: house,
            old_person: old_person,
            total: total,
            id :id
        });
        return this.httpService.postBody('rt_salary/create_apply', body, 2);
    }

    get_list() {
        let body = JSON.stringify({
            user_id: HttpService.user_id
        });
        return this.httpService.postBody('rt_salary/get_list', body, 2);
    }

    get_detail(id) {
        let body = JSON.stringify({
            id: id,
            user_id: HttpService.user_id
        });
        return this.httpService.postBody('rt_salary/get_detail', body, 2);
    }

}