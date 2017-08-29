import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { CallNumber } from '@ionic-native/call-number';
/**
 * Generated class for the PoContactPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-po-contact',
  templateUrl: 'po-contact.html',
  providers:[CallNumber],
})
export class PoContactPage {
  items:any
  constructor(public navCtrl: NavController, public navParams: NavParams,public callNumber:CallNumber,
  public alertCtrl: AlertController) {
    this.items = this.navParams.get('items');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PoContactPage');
  }

  calling(item){
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
            this.call(item.phone);  
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
