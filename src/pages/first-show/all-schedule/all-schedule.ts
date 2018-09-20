import { FirstShowService } from './../first_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the AllSchedulePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-all-schedule',
  templateUrl: 'all-schedule.html',
  providers: [FirstShowService]
})
export class AllSchedulePage {
  uid
  constructor(public navCtrl: NavController, public navParams: NavParams, private firshowService: FirstShowService,
              public storage:Storage,) {
                this.storage.get('user').then(res => {
                  this.uid = res.result.res_data.user_id;
                })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AllSchedulePage');
  }

}
