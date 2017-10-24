import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController,Platform } from 'ionic-angular';
import { ContactListPage} from './../../work-bench/contact-list/contact-list'
import { CallNumber } from '@ionic-native/call-number';
import { InAppBrowser} from '@ionic-native/in-app-browser';
import { AppAvailability } from '@ionic-native/app-availability';

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
  providers:[CallNumber,AppAvailability],
})
export class CustomerDetailPage {
  items:any;
  biaoqian:any;
  productName;
  show_type:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private callNumber: CallNumber,
  private appAvailability: AppAvailability,public platform: Platform) {
    this.items = navParams.get('items');
    this.show_type = "one";
    let tag = '';
    if (this.items.tag.length == 1)
    {
      tag =  this.items.tag[0] ;
    }
    else if (this.items.tag.length == 2)
    {
      tag = this.items.tag[0] + "/" + this.items.tag[1];
    }
    
    let level = '';
    let priority = '';
    if (this.items.level == 1)
    {
      level = " 1st";
    }
    else if (this.items.level == 2)
    {
      level = " 2nd";
    }
    else if (this.items.level == 3)
    {
      level = " 3rd";
    }
    if (this.items.priority)
    {
      priority = " 星级:" + this.items.priority;
    }
    this.biaoqian = tag + level + priority;

    if (this.items.product_series.length > 0)
    {
      let index = 0;
      let name = '';
      for (var item_pro of this.items.product_series) {
        if (name != '')
        {
          name = name + ',' + item_pro.name; 
        }
        else
        {
          name = item_pro.name;
        }
        index ++;
      }
      this.productName = name;
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerDetailPage');
  }

  contact_detail(){
    this.navCtrl.push('ContactListPage',{
          contactList:this.items.contracts,
       });  
  }


  callPhone(){  
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
          }  
        }  
      ]  
    });  
      confirm.present();  
     } 
  }

  call(number){  
    this.callNumber.callNumber(number, true)  
      .then(() => console.log('Launched dialer!'))  
      .catch(() => console.log('Error launching dialer'));  
  } 

  click_one(){
    this.show_type = "one";
  }

  click_two(){
    this.show_type = "two";
  }

  click_three(){
    this.show_type = "three";
  }

  sendEmail(){
    this.openAppWith('alicloudmail://','')
  }

  openAppWith(ios_bundle_id,android_bundle_id)
  {
    let app;

    if (this.platform.is('ios')) {
        app = ios_bundle_id;
    } 
    else if (this.platform.is('android')) {
        // app = 'com.twitter.android';
    }
    let ctrl = this.alertCtrl;
    this.appAvailability.check(app).then(
      
     function() { // success callback
      
          let browser = new InAppBrowser();
          browser.create(app,'_system', 'location=yes');
       
			
      
      // window.open('camcard://','_system',  'location=yes');
		},
    function(){
      console.log('1');
      ctrl.create({
                  title: '提示',
                  subTitle: "请先下载阿里邮箱",
                  buttons: [
                 {
                    text: '取消',
                    handler: () => {
                     
                 }
             },{
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

}
