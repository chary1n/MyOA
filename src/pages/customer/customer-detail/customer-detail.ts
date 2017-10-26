import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { ContactListPage } from './../../work-bench/contact-list/contact-list'
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';
import { CustomerService } from './../CustomerService';
import { WebIntent } from "@ionic-native/web-intent";
import { Storage } from '@ionic/storage';
declare let startApp: any;

/**
 * Generated class for the CustomerDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-customer-detail',
  templateUrl: 'customer-detail.html',
  providers: [CallNumber, AppAvailability, CustomerService, WebIntent],
})
export class CustomerDetailPage {
  items: any;
  biaoqian: any;
  productName;
  show_type: any;
  type:any;
  create_uid:any;
  author_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private callNumber: CallNumber,
    private appAvailability: AppAvailability,
    public platform: Platform, public customerService: CustomerService,
    private webintent: WebIntent) {
    this.items = navParams.get('items');

    let index = 0;
    for (let item of this.items.message_ids) {
      // console.log(new Date(item.date.replace(' ','T')+'Z').getTime())
      // let newDate = new Date(item.date.replace(' ','T')+'Z').getTime()+8*3600;
      item.date = new Date(item.date.replace(' ', 'T') + 'Z').getTime();
      this.items.message_ids[index] = item;
      index++;
    }

    this.show_type = "one";
    let tag = '';
    if (this.items.tag.length == 1) {
      tag = this.items.tag[0];
    }
    else if (this.items.tag.length == 2) {
      tag = this.items.tag[0] + "/" + this.items.tag[1];
    }

    let level = '';
    let priority = '';
    if (this.items.level == 1) {
      level = " 1st";
    }
    else if (this.items.level == 2) {
      level = " 2nd";
    }
    else if (this.items.level == 3) {
      level = " 3rd";
    }
    if (this.items.priority) {
      priority = " 星级:" + this.items.priority;
    }
    this.biaoqian = tag + level + priority;

    if (this.items.product_series.length > 0) {
      let index = 0;
      let name = '';
      for (var item_pro of this.items.product_series) {
        if (name != '') {
          name = name + ',' + item_pro.name;
        }
        else {
          name = item_pro.name;
        }
        index++;
      }
      this.productName = name;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }

  contact_detail() {
    this.navCtrl.push('ContactListPage', {
      contactList: this.items.contracts,
    });
  }

  ionViewDidEnter() {
    console.log(this.navParams)
    if (this.navParams.get('need_fresh') == true) {
      this.reload_info();
      this.navParams.data.need_fresh = false;
    }
  }

  callPhone() {
    //  alert(this.items.phone);
     if(this.items.phone != 'false' && this.items.phone != '')
     {
        let confirm = this.alertCtrl.create({  
      title: this.items.phone,  
      buttons: [  
        {  
          text: '取消',  
          handler: () => {  
          }  
        },  
        {  
          text: '确定',  
          handler: () => {  
            this.call(this.items.phone);  

            this.customerService.get_all_message_label().then((res) => {
         console.log(res);
      if(res.result.res_code == 1)
      {
        let result_arr = ["question"];
        for (let item of res.result.res_data) {
           if (item.name == "电话")
           {
             result_arr.push(item.id);
              let obj = {
      body:"<p>" + "电话:" + this.items.phone + "</p>",
      res_id:this.items.id,
      create_uid:this.create_uid,
      message_label_ids:result_arr,
      author_id:this.author_id,  
    }
    console.log(obj);
    
    this.customerService.createInfo(obj).then((res) => {
      console.log(res);
      if(res)
      {
        if(res.result.res_data.success == 1)
        {
          this.reload_info();
        }
      }
    })
           }
      }
      }
    })
            
          }  
        }  
      ]  
    });  
      confirm.present();  
     } 
     else
     {
        let confirm = this.alertCtrl.create({  
      title: "该客户没有录入手机号",  
      buttons: [  
        {  
          text: '确定',  
          handler: () => {  
          }  
        }
      ]  
    });  
      confirm.present(); 
     }
  }

  call(number) {
    this.callNumber.callNumber(number, true)
      .then(() => console.log('Launched dialer!'))
      .catch(() => console.log('Error launching dialer'));
  }

  click_one() {
    this.show_type = "one";
  }

  click_two() {
    this.show_type = "two";
  }

  click_three() {
    this.show_type = "three";
  }

  sendEmail() {
    this.openAppWith('alicloudmail://', 'com.alibaba.cloudmail')
  }

  openAppWith(ios_bundle_id, android_bundle_id) {
    let app;

    if (this.platform.is('ios')) {
      app = ios_bundle_id;
    }
    else if (this.platform.is('android')) {
      let sApp = startApp.set({
        "component": ["com.alibaba.cloudmail", "com.alibaba.alimei.activity.Welcome"]
      });
      sApp.start(function () { /* success */
        console.log("OK");
      }, function (error) { /* fail */
        alert("请先下载阿里邮箱");
      });
      return ;
    }
    let ctrl = this.alertCtrl;

    this.appAvailability.check(app).then(

      function () { // success callback

        let browser = new InAppBrowser();
        browser.create(app, '_system', 'location=yes');
        // window.open('camcard://','_system',  'location=yes');
      },
      function () {
        console.log('1');
        ctrl.create({
          title: '提示',
          subTitle: "请先下载阿里邮箱",
          buttons: [
            {
              text: '取消',
              handler: () => {

              }
            }, {
              text: '跳转下载',
              handler: () => {
                let browser = new InAppBrowser();
                browser.create('https://itunes.apple.com/cn/app/a-li-you-xiang/id923828102?mt=8');
              }
            }
          ]
        }).present();
      }
    );
  }

  createInfo() {
    this.navCtrl.push('CreateInfoPage', {
      res_id: this.items.id,
    })
  }

  call_contact(item){

    if(item.phone != 'false' && item.phone != '')
     {
        let confirm = this.alertCtrl.create({  
      title: item.phone,  
      buttons: [  
        {  
          text: '取消',  
          handler: () => {  
          }  
        },  
        {  
          text: '确定',  
          handler: () => {  
            console.log("start");
            this.customerService.get_all_message_label().then((res) => {
         console.log(res);
      if(res.result.res_code == 1)
      {
        let result_arr = ["question"];
        for (let item of res.result.res_data) {
           if (item.name == "电话")
           {
             result_arr.push(item.id);
              let obj = {
      body:"<p>" + "电话:" + item.phone + "</p>",
      res_id:this.items.id,
      create_uid:this.create_uid,
      message_label_ids:result_arr,
      author_id:this.author_id,  
    }
    console.log(obj);
    
    this.customerService.createInfo(obj).then((res) => {
      console.log(res);
      if(res)
      {
        if(res.result.res_data.success == 1)
        {
          this.reload_info();
        }
      }
    })
           }
      }
      }
    })
    this.call(item.phone);
          }  
        }  
      ]  
    });  
      confirm.present();  
     } 
  }

  reload_info(){
      this.customerService.customer_details(this.items.id).then((res) => {
      if(res.result&&res.result.res_code==1){
        console.log(res);
       this.items = res.result.res_data;
       let index = 0;
       for (let item of this.items.message_ids) {
     
        item.date = new Date(item.date.replace(' ','T')+'Z').getTime();
        this.items.message_ids[index] = item;
        index ++;
    }
      }
    })
  } 

  
}
