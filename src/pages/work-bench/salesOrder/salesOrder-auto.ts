import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class SalesOrderAutoService implements AutoCompleteService {
    labelAttribute = "name";

    constructor(private http: Http) {

    }
    getResults(keyword: string) {
        //   this.labelAttribute = keyword;
        console.log(keyword);
        let obj1 = {
            name: "",
            id: 1,
        }
        let obj2 = {
            name: "",
            id: 2,
        }
        let obj3 = {
            name: "",
            id: 3,
        }
        let obj4 = {
            name: "",
            id: 4,
        }
        let obj5 = {
            name: "",
            id: 5,
        }
        let obj6 = {
            name: "",
            id: 6,
        }
        let arr = [];
        obj1.name = "搜 订单:" + keyword;
        arr.push(obj1);
        obj2.name = "搜 客户:" + keyword;
        arr.push(obj2);
        obj3.name = "搜 产品:" + keyword;
        arr.push(obj3);
        obj4.name = "搜 销售员:" + keyword;
        arr.push(obj4);
        obj5.name = "搜 销售团队:" + keyword;
        arr.push(obj5);
        obj6.name = "搜 PI号码:" + keyword;
        arr.push(obj6);
        return arr;
    }
}