import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,AlertController} from 'ionic-angular';
import { SupplierlistService } from '../supplier-list/supplierlistService';
// import { LoadingController } from 'ionic-angular';
// import { ContactListPage} from './../contact-list/contact-list'
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the SupplierDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

 
@IonicPage()
@Component({
  selector: 'page-supplier-detail',
  templateUrl: 'supplier-detail.html',
  providers: [SupplierlistService,CallNumber]
})
export class SupplierDetailPage {
  id:any
  items:any
  limit:any
  offset:any
  category:any
  area:any
  show_type = "one"
  constructor(public navCtrl: NavController, public navParams: NavParams,public supplierService :SupplierlistService 
    ,public alertCtrl: AlertController,private callNumber: CallNumber) {
    this.items = navParams.get('items');  
  
    if(this.items.category.length == 1)
    {
       this.category = this.items.category[0];
    }
    else if (this.items.category.length == 2)
    {
       this.category = this.items.category[0] + '、' +this.items.category[1];
    }   
    else
    {
      this.category = '';
    }
    this.area = this.items.street[0].continent;
   
    console.log(this.items);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SupplierDetailPage');
    this.limit = 20;
    this.offset = 0;
  }

  contact_detail()
  {
    console.log(this.items.contracts);
    this.navCtrl.push('ContactListPage',{
          contactList:this.items.contracts,
       });  
  }

   callPhone(number){  
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
     else
     {
        let confirm = this.alertCtrl.create({  
      title: "该供应商没有录入手机号",  
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
  call(number){  
    this.callNumber.callNumber(number, true)  
      .then(() => console.log('Launched dialer!'))  
      .catch(() => console.log('Error launching dialer'));  
  } 
  click_one() {
    this.show_type = "one";
  }

  click_two() {
    this.show_type = "two";
    console.log(this.items.contracts)
  }
}
