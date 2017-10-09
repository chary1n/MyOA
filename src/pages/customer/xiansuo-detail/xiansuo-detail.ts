import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { ContactListPage} from './../../work-bench/contact-list/contact-list'
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the XiansuoDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-xiansuo-detail',
  templateUrl: 'xiansuo-detail.html',
  providers:[CallNumber]
})
export class XiansuoDetailPage {

  items:any;
  biaoqian:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public alertCtrl: AlertController,private callNumber: CallNumber) {
    this.items = navParams.get('items');
    let tag = this.items.tags.length > 0 ? this.items.tags[0] : "";
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
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad XiansuoDetailPage');
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

}
