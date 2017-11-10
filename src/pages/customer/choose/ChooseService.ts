import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';

@Injectable()
export class ChooseService {
    constructor(private httpservice: HttpService) {

    }

    add_partners(items){
            let arr = [];
        for (var item of items) {
           let obj = {
           company_name:'',
           company_id:'',
           saleman_id:'',
           saleteam_id:'',
           country_id:'',
           crm_source_id:'',
           source_id:'',
           tag_list:'',
           partner_type:'',
           star_cnt:'',
           series_ids:[],
           members:[],
           partner_lv:'', 
           website:'',
           comment:'',
           user_id:'',
        }

        let member = {
            name:'',
            phone:'',
            email:'',
            street:'',
            type:'',
            job_title:'',
        }
        member.name = item.displayName;
        member.email = item.email;
        member.phone = item.phoneNumber;
        member.street = item.address;
        member.type = this.exchangeType(item.type);
        member.job_title = item.departmentName;

        obj.company_id = item.company_id;
        obj.website = item.web_site;
        obj.saleman_id = item.saleman_id;
        obj.company_name = item.companyName;
        obj.saleteam_id = item.saleteam_id;
        obj.country_id = item.country_id;
        obj.crm_source_id = item.crm_source_id;
        obj.source_id = item.source_id;
        obj.tag_list = item.tag_list;
        obj.partner_type = item.partner_type;
        obj.star_cnt = item.star_cnt;
        obj.series_ids = item.series_ids;
        obj.members = [member];
        obj.partner_lv = item.partner_lv;
        obj.comment = item.comment;
        obj.user_id = item.user_id;
        arr.push(obj);
        console.log(obj);
    }
        let body = JSON.stringify({
            partners:arr,
        });
        return this.httpservice.postBody("add_partners", body);
    }

    //销售员
    get_saleman_list(){
        let body = JSON.stringify({
        });
        return this.httpservice.postBody("get_saleman_list", body);
    }

    //销售团队
    get_saleteam_list(){
        let body = JSON.stringify({
        });
        return this.httpservice.postBody("get_saleteam_list", body);
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

    exchangeType(type)
    {
        if (type == "联系人")
        {
            return "contact";
        }
        else if (type == "开票地址")
        {
            return "invoice";
        }
        else if (type == "送货地址")
        {
            return "delivery";
        }
        else if (type == "其他地址")
        {
            return "other";
        }
    }
}