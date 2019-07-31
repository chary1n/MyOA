import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class ShopService {
    constructor(private httpservice: HttpService) {

    }
    
    get_location_now(latitude, longti, distance){
        // let url_str = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=" + latitude + "," + longti + "&output=json&pois=1&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7"
        let url_str = "http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=" + latitude + "," + longti + "&output=json&radius=" + distance + "&pois=1&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7"
        return this.httpservice.getLocationWithUrl(url_str);
      }

    get_me_sale_team(body){
        return this.httpservice.postBodyNoLoading("get_me_sale_team", body)
    }

    get_total_contacts(body){
        return this.httpservice.postBodyNoLoading("get_total_contacts", body)
    }

    get_employees_visit(body){
        return this.httpservice.postBody("get_employees_visit", body)
    }

    get_team_department_tree(body){
        return this.httpservice.postBody("get_team_department_tree", body)
    }

    edit_shop(body){
        return this.httpservice.postBody("edit_shop", body) 
    }

    get_total_continent(body){
        return this.httpservice.postBodyNoLoading("get_total_continent", body) 
    }

    get_total_source_id(body){
        return this.httpservice.postBodyNoLoading("get_total_source_id", body) 
    }

    search_partner_name(body){
        return this.httpservice.postBody("search_partner_name", body) 
    }

    search_visit_by_domain(body){
        return this.httpservice.postBody("search_visit_by_domain", body) 
    }

    search_shop_by_domain(body){
        return this.httpservice.postBody("search_shop_by_domain", body) 
    }

    get_total_shop_visit(body){
        return this.httpservice.postBody("get_total_shop_visit", body) 
    }

    get_total_shop_gps_new(body){
        return this.httpservice.postBody("get_total_shop_gps_new", body) 
    }

    get_total_shop_gps(body){
        return this.httpservice.postBody("get_total_shop_gps", body) 
    }

    create_new_shop(body){
        return this.httpservice.postBody("create_new_shop", body) 
    }

    get_total_states(body){
       return this.httpservice.postBody("get_total_states", body) 
    }

    get_total_country_state(body){
        return this.httpservice.postBody("get_total_country_state", body)
    }

    get_total_countrys(body){
        return this.httpservice.postBody("get_total_countrys", body)
    }

    get_total_partners(body){
        return this.httpservice.postBody("get_total_partners", body)
    }

    submit_visit_record(body){
        return this.httpservice.postBody("submit_visit_record", body)
    }

    get_shop_detail(body){
        return this.httpservice.postBody("get_shop_detail", body);
    }

    get_total_shop(body){
        return this.httpservice.postBodyNoLoading("get_total_shop", body);
    }

    trans_location(latitude,longti){
       let url_str = "http://api.map.baidu.com/geoconv/v2/?coords=" + longti + "," + latitude + "&from=4&to=5&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7" 
       return this.httpservice.getWithUrl(url_str);
    }

    trans_location_ios(latitude,longti){
       let url_str = "http://api.map.baidu.com/geoconv/v1/?coords=" + longti + "," + latitude + "&from=1&to=5&ak=cVef1ROo1IR5OkZ5Fly78vDuOoGmLmD7" 
       return this.httpservice.getWithUrl(url_str);
    }

    trans_baidu_to_gaode(latitude, longti){
        let url_str = "https://restapi.amap.com/v3/assistant/coordinate/convert?key=2846ff12cd5ed2d3a60244ea61315f15&locations=" + longti + "," + latitude + "&coordsys=baidu" 
        return this.httpservice.getWithUrl(url_str);
        // https://restapi.amap.com/v3/assistant/coordinate/convert?parameters
    }
}