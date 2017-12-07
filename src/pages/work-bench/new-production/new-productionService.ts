import { ModalController } from 'ionic-angular';
import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class NewProductionService {
    constructor(private httpservice: HttpService) {

    }
    search_product_category_no_loading(type,parent_id){
        let body = JSON.stringify({
            type: type,
            parent_id:parent_id,
        });
        return this.httpservice.postBodyNoLoading("search_product_category", body);
    }
    search_product_category(type,parent_id){
        let body = JSON.stringify({
            type: type,
            parent_id:parent_id,
        });
        return this.httpservice.postBody("search_product_category", body);
    }
    
    get_production_detail(categ_id){
        let body = JSON.stringify({
            categ_id: categ_id,
        });
        return this.httpservice.postBody("search_product_detail", body);
    }

    product_bom_stock_move(id,type){
        let body = JSON.stringify({
            id: id,
            type:type,
        });
        return this.httpservice.postBody("product_bom_stock_move", body);
    }

    search_product(type,search_text){
        let body = JSON.stringify({
            search_text: search_text,
            type:type,
        });
        return this.httpservice.postBody("search_product", body);
    }
}