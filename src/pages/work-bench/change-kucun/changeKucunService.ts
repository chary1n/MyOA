import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ChangeKucunService{
    constructor(private httpservice: HttpService) {
        
            }
    getwaitList(state, user_id){  
            let body = JSON.stringify({
                state: state,
                user_id: user_id
            });
            return this.httpservice.postBody("get_wait_meapply",body);
    } 
    getsearchList(state, searchText, type, user_id){  
            let body = JSON.stringify({
                state: state,
                searchText: searchText,
                type: type,
                user_id: user_id
            });
            return this.httpservice.postBody("get_wait_meapply",body);
    } 
    changeStateKucun(state, id, user_id){
        let body = JSON.stringify({
            state: state,
            id: id,
            user_id: user_id
        });
        return this.httpservice.postBody("change_wait_meapply",body);
    }
}