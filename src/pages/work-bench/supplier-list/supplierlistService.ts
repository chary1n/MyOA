import { HttpService } from './../../../providers/HttpService';
import { Injectable } from '@angular/core';


@Injectable()
export class SupplierlistService {
    constructor(private httpservice: HttpService) {

    }

    getSupplierList(mlimit,moffset) {
        let body = JSON.stringify({
            limit:mlimit,
            offset:moffset
        });
       return this.httpservice.postBody("get_supplier",body);
    }
    getSupplierDetai(limit,offset,id)
    {
        let body = JSON.stringify({
            limit:limit,
            offset:offset,
            id:id,
        });
       return this.httpservice.postBody("get_supplier",body);
    }
    searchSupplier(name)
    {
        let body = JSON.stringify({
            name:name,
        });
       return this.httpservice.postBody("search_supplier",body);
    }
}