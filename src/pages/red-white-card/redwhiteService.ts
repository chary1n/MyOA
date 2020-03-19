import { Injectable } from '@angular/core';
import { HttpService } from '../../providers/HttpService';

@Injectable()
export class RedWhiteService {
    constructor(private httpService: HttpService) {

    }

    search_employee_by_name(body){
        return this.httpService.postBodyNoLoading("search_employee_by_name", body);
    }

    delete_card(body){
        return this.httpService.postBody("delete_card", body);
    }

    get_red_white_card_list_with_domain(body){
        return this.httpService.postBody("get_red_white_card_list_with_domain", body);
    }

    create_card(body) {
        return this.httpService.postBody("create_card", body);
    }

    action_card(body){
        return this.httpService.postBody("action_card", body);
    }

    get_red_white_card_list(body){
        return this.httpService.postBody("get_red_white_card_list", body);
    }

    get_red_white_card_detail(body){
        return this.httpService.postBody("get_red_white_card_detail", body);
    }
    
    change_json_red_white_card_detail(body){
        return this.httpService.postBody("change_json_red_white_card_detail", body);
    }
}