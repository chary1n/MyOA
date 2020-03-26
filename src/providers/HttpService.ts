// import { NativeService } from './NativeService';
// import { UrlServer } from './UrlServer';
import { LoadingController, AlertController, Platform ,ToastController} from 'ionic-angular';
import * as constansts from './Constants';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Storage } from '@ionic/storage';
import { InAppBrowser } from '@ionic-native/in-app-browser';



@Injectable()
export class HttpService {
  static appUrl;
  static user_id;
  static user;
  static is_alert = false;
  static need_back_login;
  static need_login = false;
  static now_server_url = 'http://service.linkloving.net:8888/'
  // static now_server_url = 'http://192.168.2.12:8081/'
  // static now_server_url = 'http://10.0.0.2:8081/'
  constructor(private http: Http, private loading: LoadingController,
    private platform: Platform,
    public storage: Storage, public ctrl: AlertController, private inAppBrowser: InAppBrowser,
    public toastCtrl: ToastController
  ) {
  }

  getAppPath(url: string, type: number = 0) {
    if (type == 1) {
      return HttpService.appUrl + constansts.APPSUBPATH + url;
    } else if (type == 2) {
      return HttpService.appUrl + url;
    } else {
      return HttpService.appUrl + constansts.OAUBPATH + url;
    }
  }

  public getWithUrl(url: string) {
    let loading = this.loadingCreate(true);
    return this.http.get(url)
      .map(data => this.dealRe(data, loading))
      .toPromise()
      .then(res => this.handleSuccess(
        res.json())
      )
      .catch(error => this.handleError(
        error
      ));
  }

  public getLocationWithUrl(url: string) {
    let loading = this.loadingCreate(true);

    return this.http.get(url)
      .map(data => this.dealRe(data, loading))
      .toPromise()
      .then(res => this.handleSuccess(
        this.deleteBy(res))
      )
      .catch(error => this.handleError(
        error
      ));
  }

  deleteBy(res) {
    // var num1=res._body.split("(")  //["deleteChild", "236737)"]
    // var num2=num1[1].split(")") //["236737", ""]
    // var result= num2[0]
    var result = res._body.substring(29, res._body.length - 1)
    return JSON.parse(result)
  }

  public getWithUrlNoLoading(url: string) {
    return this.http.get(url)
      .toPromise()
      .then(res => this.handleSuccess(
        res.json())
      )
      .catch(error => this.handleError(
        error
      ));
  }

  public getWithUrlNoLoadingNoCatch(url: string) {
    return this.http.get(url)
      .toPromise()
      .then(res => this.handleSuccess(
        res.json())
      )
  }

  //type 不填是OA,填1是linkloving_app_apu
  public get(url: string, paramObj: any, type: number = 0) {
    let loading = this.loadingCreate(true);
    return this.http.get(this.getAppPath(url, type) + this.toQueryString(paramObj))
      .map(data => this.dealRe(data, loading))
      .toPromise()
      .then(res => this.handleSuccess(
        res.json())
      )
      .catch(error => this.handleError(
        error
      ));
  }


  //type 不填是OA,填1是linkloving_app_apu
  public getNoLoading(url: string, paramObj: any, type: number = 0) {
    return this.http.get(this.getAppPath(url, type) + this.toQueryString(paramObj))
      .toPromise()
      .then(res => this.handleSuccess(
        res.json())
      )
      .catch(error => this.handleError(
        error
      ));
  }


  public post(url: string, paramObj: any, type: number = 0) {
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    headers.append("Accept", "application/json");
    return this.http.post(this.getAppPath(url, type), this.toBodyString(paramObj), new RequestOptions({ headers: headers }))
      .toPromise()
      .then(res => this.handleSuccess(res.json()))
      .catch(error => this.handleError(error));
  }


  //加载  
  private loadingCreate(isLoading: true, pageIndex?) {
    let loading = this.loading.create({
      content: '加载中',
      enableBackdropDismiss: true
    });
    pageIndex = typeof (pageIndex) == 'undefined' ? 1 : pageIndex;
    isLoading = typeof (isLoading) == 'undefined' ? true : isLoading;

    if (isLoading == true && pageIndex == 1) {
      loading.present();
    }
    return loading;
  }

  //返回处理  
  private dealRe(re, loading) {
    loading.dismiss();
    return re;
  }
  public postBody(url: string, paramObj: any, type: number = 0) {
    let loading = this.loadingCreate(true);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    return this.http.post(this.getAppPath(url, type), paramObj, new RequestOptions({
      headers: headers
    }))
      .map(data => this.dealRe(data, loading))
      .toPromise()
      .then(res =>
        this.handleSuccess(res.json())
      )
      .catch(error => this.handleError(error));
  }

  public postRoboBody(url: string, paramObj: any, type: number = 0) {
    let loading = this.loadingCreate(true);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post('http://robotime.cn:1111/productivity?startTime=' + paramObj , {}, new RequestOptions({
      headers: headers
    }))
      .map(data => this.dealRe(data, loading))
      .toPromise()
      .then(res =>
        this.handleSuccess(res.json())
      )
      .catch(error => this.handleError(error));
  }

  public postBodyNoLoading(url: string, paramObj: any, type: number = 0) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this.http.post(this.getAppPath(url, type), paramObj, new RequestOptions({ headers: headers }))
      .toPromise()
      .then(res =>
        this.handleSuccess(res.json())
      )
      .catch(error => this.handleError(error));
  }

  private handleSuccess(result) {
    console.log(result)

    if (result.error) {
      console.log(result.error.data.message)


      if ((new RegExp("请更新新版OA,否则无法使用").test(result.error.data.message))) {
        this.ctrl.create({
          title: "提示",
          subTitle: result.error.data.message,
          buttons: [{
            text: '立即更新',
            handler: () => {
              if (this.platform.is('android')) {
                this.inAppBrowser.create("https://fir.im/OAandroid", '_system');
              } else {
                this.inAppBrowser.create('http://fir.robotime.cn/MyOa', '_system');
              }
              //  

            }
          }
          ]
        }).present();
      }
      else {
        var toast = this.toastCtrl.create({
            message: result.error.data.message,
            duration: 1000,
            position: 'buttom'
        });
        toast.onDidDismiss(() => {
            HttpService.is_alert = false
        });
        if(!HttpService.is_alert){
          console.log('弹框弹出来了')
          toast.present()
          // ctrl._setZIndex(1,undefined)
          HttpService.is_alert = true
        }
      //  var ctrl =  this.ctrl.create({
      //     title: "提示",
      //     subTitle: result.error.data.message,
      //     buttons: [{
      //       text: '确定',
      //       cssClass:'alertCss',
      //       handler: () => {
      //         HttpService.is_alert = false
      //       }
      //     }
      //     ]
      //   })
      //   ctrl.onDidDismiss(res=>{
      //     HttpService.is_alert = false
      //   })
      //   if(!HttpService.is_alert){
      //     console.log('弹框弹出来了')
      //     ctrl.present()
      //     // ctrl._setZIndex(1,undefined)
      //     HttpService.is_alert = true
      //   }
      }

      return result;
    }
    else {
      return result;
    }

  }

  private handleError(error: Response | any) {
    let msg = '请求失败';
    console.log(error.status)
    console.log(error)
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

    // alert(msg);//这里使用ToastController

    var ctrl =  this.ctrl.create({
      title: "提示",
      subTitle: msg,
      buttons: [{
        text: '确定',
        handler: () => {
          HttpService.is_alert = false
        }
      }
      ]
    })
    ctrl.onDidDismiss(res=>{
      HttpService.is_alert = false
    })
    if(!HttpService.is_alert){
      ctrl.present()
      console.log('弹框弹出来了')
      HttpService.is_alert = true
    }
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

