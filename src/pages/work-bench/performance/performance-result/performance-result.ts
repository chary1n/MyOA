import { PersonService } from './../performance-service';
import { Component , Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the PerformanceResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-performance-result',
  templateUrl: 'performance-result.html',
  providers: [PersonService],
})
export class PerformanceResultPage {
  progress = 30;
  id;
  constructor(public navCtrl: NavController, public navParams: NavParams
            , public statusBar:StatusBar,public servicePerformance: PersonService,) {

        this.id = this.navParams.get('id')
        let body ={
          'id': this.id
        }
        this.servicePerformance.get_performance_result(body).then(res=>{
          if(res.result.res_code==1 && res.result){
            
          }
        })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerformanceResultPage');
  }

  ionViewWillEnter() {
    this.statusBar.backgroundColorByHexString("#2597ec");
    this.statusBar.styleLightContent();
  }

  goBack(){
    this.statusBar.backgroundColorByHexString("#f8f8f8");
    this.statusBar.styleDefault();
    this.navCtrl.pop();
  }
}
