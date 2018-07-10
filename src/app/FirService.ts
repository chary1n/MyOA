import { LoadingController } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class FirService {

  constructor(private http: Http,private loading :LoadingController) {
  }

  getAppPath(url: string, type: number = 0) {
    return 'http://api.fir.im/apps/latest/5961a838548b7a7a16000060?api_token=fd574d0078c5b11777cb3d8a7d4c1d5b';
  }

  //type 不填是OA,填1是linkloving_app_apu
  public get(url: string, paramObj: any, type: number = 0) {
    // let loading = this.loadingCreate(true);  
    console.log(this.getAppPath(url,type));
    return this.http.get(this.getAppPath(url,type))
      .map(data=>this.dealRe(data,null))
      .toPromise()
      .then(res => this.handleSuccess(
        res.json())
      ).catch();
  }

  public post(url: string, paramObj: any, type: number = 0) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append("Accept", "application/json");
    return this.http.post(this.getAppPath(url,type), this.toBodyString(paramObj), new RequestOptions({ headers: headers }))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }

  
  //加载  
  private loadingCreate(isLoading:true,pageIndex?){  
    let loading = this.loading.create({  
      content: '加载中'  
    });  
    pageIndex = typeof(pageIndex)=='undefined'?1:pageIndex;  
    isLoading = typeof(isLoading)=='undefined'?true:isLoading;  
    if(isLoading == true && pageIndex == 1)  
    {  
      loading.present();  
    }  
    return loading;  
  }  

   //返回处理  
  private dealRe(re,loading){  
    // loading.dismiss();  
    return re;  
  }  
  public postBody(url: string, paramObj: any, type: number = 0) {
    let loading = this.loadingCreate(true);  
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.getAppPath(url,type), paramObj, new RequestOptions({ headers: headers }))
      .map(data=>this.dealRe(data,loading))
      .toPromise()
      .then(res => 
        this.handleSuccess(res.json())
      )
      .catch(error => this.handleError(error));
  }

  private handleSuccess(result) {
    return result;
  }

  private handleError(error: Response | any) {
    let msg = '请求失败';
    console.log(error.status)
    if (error.status == 0) {
      msg = '网络连接不佳';
    }
    if (error.status == 400) {
      msg = '请求无效';
      console.log('请检查参数类型是否匹配');
    }
    if (error.status == 404) {
      msg = '请求资源不存在';
      console.error(msg + '，请检查路径是否正确');
    }
    console.log(error);
    alert(msg);//这里使用ToastController
    return { success: false, msg: msg };
  }

  /**
   * @param obj　参数对象
   * @return {string}　参数字符串
   * @example
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toQueryString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return '?' + ret.join('&');
  }

  /**
   *
   * @param obj
   * @return {string}
   *  声明: var obj= {'name':'小军',age:23};
   *  调用: toQueryString(obj);
   *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
   */
  private toBodyString(obj) {
    let ret = [];
    for (let key in obj) {
      key = encodeURIComponent(key);
      let values = obj[key];
      if (values && values.constructor == Array) {//数组
        let queryValues = [];
        for (let i = 0, len = values.length, value; i < len; i++) {
          value = values[i];
          queryValues.push(this.toQueryPair(key, value));
        }
        ret = ret.concat(queryValues);
      } else { //字符串
        ret.push(this.toQueryPair(key, values));
      }
    }
    return ret.join('&');
  }

  private toQueryPair(key, value) {
    if (typeof value == 'undefined') {
      return key;
    }
    return key + '=' + encodeURIComponent(value === null ? '' : String(value));
  }
}

