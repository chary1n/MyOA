import {AutoCompleteService} from 'ionic2-auto-complete';
// import { Http } from '@angular/http';
import {Injectable} from "@angular/core";
import 'rxjs/add/operator/map'

@Injectable()
export class ShenGouAutoService implements AutoCompleteService {
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
      let arr = [];
      obj1.name = "搜 单号："+keyword;
      arr.push(obj1);
    return arr;
  }
}