import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class NewZanZhiService {
    constructor(private httpservice: HttpService) {

    }

    get_zz_detail(body){
        return this.httpservice.postBody("get_zz_detail", body);
    }

    get_zanzhi_listNoLoading(id,limit,offset,type,zz_type){
        let body = JSON.stringify({
            user_id:id,
            limit :limit,
            offset:offset,
            type :type,
            zz_type:zz_type
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    }

    get_zanzhi_list(id,limit,offset,type,zz_type){
        let body = JSON.stringify({
            user_id:id,
            limit :limit,
            offset:offset,
            type :type,
            zz_type:zz_type,
        });
        return this.httpservice.postBody("get_zanzhi_list", body);
    }

    confirm(sheet_id,user_id ,title,type){
        let body = JSON.stringify({
            sheet_id:sheet_id,
            user_id:user_id,
            reason :title,
            type :type
        });
       return this.httpservice.postBody("confirm_zanzhi",body);
    }

    refuse(sheet_id,reason,user_id)
    {
        let body = JSON.stringify({
            sheet_id:sheet_id,
            reason:reason,
            user_id:user_id,
        });
       return this.httpservice.postBody("refuse_zanzhi",body);
    }

    searchZanzhiList(id,type,data,text,zz_type){
        let body = JSON.stringify({
            user_id:id,
            type :type ,
            data :data ,
            text:text,
            zz_type:zz_type,
        });
        return this.httpservice.postBody("search_zanzhi_list", body);
    }
}