import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { ShopService } from './../shopService'
/**
 * Generated class for the SelectCountryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-country',
  templateUrl: 'select-country.html',
  providers: [ShopService],
})
export class SelectCountryPage {
  partner_arr = []
  show_partner_arr = []
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService) {
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    this.shopService.get_total_countrys({}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data){
        this.partner_arr = res.result.res_data
        for (let i = 0; i < this.partner_arr.length; i ++){
          this.show_partner_arr.push(this.partner_arr[i])
        }
      }
    }) 
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCountryPage');
  }
  goBack(){
    this.navCtrl.pop()
  }

  searchByKeyword(event) {
    this.show_partner_arr = []
    for (let i = 0; i < this.partner_arr.length; i ++){
      if ((new RegExp(event.target.value).test(this.partner_arr[i].text))){
        this.show_partner_arr.push(this.partner_arr[i])
      }
    }
  }

  clearText(){
    this.show_partner_arr = []
    for (let i = 0; i < this.partner_arr.length; i ++){
          this.show_partner_arr.push(this.partner_arr[i])
        }
  }

  choose_one(item){
    this.frontPage.data.need_update_country = true
    this.frontPage.data.country_id = item.value
    this.frontPage.data.country_name = item.text
    this.navCtrl.popTo(this.frontPage)
  }
}
