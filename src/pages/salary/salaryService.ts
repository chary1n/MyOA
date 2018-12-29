import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';
// import { APP_SERVER_URL, APP_SERVER_URL_T } from './../../providers/Constants';

@Injectable()
export class SalaryService {
    constructor(private httpService: HttpService) {

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