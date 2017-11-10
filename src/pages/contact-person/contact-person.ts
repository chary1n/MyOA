import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService} from './contact-persionService'
/**
 * Generated class for the ContactPersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-person',
  templateUrl: 'contact-person.html',
  providers:[ContactService]
})
export class ContactPersonPage {
  departmentList;
  constructor(public navCtrl: NavController, public navParams: NavParams,public contactService:ContactService) {
      this.contactService.get_departments().then((res) => {
        if (res.result && res.result.res_code == 1)
        {
          console.log(res)
          this.departmentList = res.result.res_data;
        }
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPersonPage');
  }

}
