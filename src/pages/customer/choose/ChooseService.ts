import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class ChooseService {
    constructor(private httpservice: HttpService) {

    }

    //类型
    get_partner_tag_list(){
        let body = JSON.stringify({

        });
        return this.httpservice.postBody("get_partner_tag_list", body);
    }

    //感兴趣的产品
    get_product_series(){
        let body = JSON.stringify({

        });
        return this.httpservice.postBody("get_product_series", body);
    }

    //国家
    get_countries() {
        let body = JSON.stringify({

        });
        return this.httpservice.postBody("get_countries", body);
    }

    //来源
    get_origins(){
        let body = JSON.stringify({

        });
        return this.httpservice.postBody("get_origins", body);
    }

    //渠道
    get_sources(){
        let body = JSON.stringify({

        });
        return this.httpservice.postBody("get_sources", body);
    }
}