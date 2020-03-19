import { AutoCompleteService } from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class RedWhiteAutoService implements AutoCompleteService {
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
        let arr = [];
        obj1.name = "搜 原因：" + keyword;
        arr.push(obj1);
        obj2.name = "搜 员工：" + keyword;
        arr.push(obj2);
        return arr;
    }
}