import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName,ContactFindOptions ,ContactFieldType} from '@ionic-native/contacts';
/**
 * Generated class for the CamCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cam-card',
  templateUrl: 'cam-card.html',
  providers:[Contacts],
})
export class CamCardPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private contacts: Contacts) {
    let options = new ContactFindOptions();  
      let fields: ContactFieldType[];  
      fields = ["displayName", "phoneNumbers"];  
      options.filter = "";  
      options.multiple = true;  
      options.hasPhoneNumber = true;  
      
      this.contacts.find(fields, options).then((result) => {  
        for (let contact of result) {
            console.log(contact);
          }
      });  
      
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamCardPage');
  }

}
