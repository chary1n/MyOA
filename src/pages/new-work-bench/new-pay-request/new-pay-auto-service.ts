import {AutoCompleteService} from 'ionic2-auto-complete';
import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class NewPayAutoService implements AutoCompleteService {
  labelAttribute = "name";

  constructor() {

  }
  getResults(keyword:string) {
    //   this.labelAttribute = keyword;
      console.log(keyword);
      let obj1 = {
          name:"",
          id:1,
      }
      let obj2 = {
          name:"",
          id:2,
      }
      let obj3 = {
          name:"",
          id:3,
      }
      let arr = [];
      obj1.name = "搜 单号："+keyword;
      arr.push(obj1);
      obj2.name = "搜 申请人：" +keyword;
      arr.push(obj2);
      obj3.name = "搜 供应商：" +keyword;
      arr.push(obj3);
    return arr;
  }
}