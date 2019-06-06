import { Component ,ViewChild} from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { ShopService } from './../shopService'

/**
 * Generated class for the SelectPartnerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-partner',
  templateUrl: 'select-partner.html',
  providers: [ShopService],
})
export class SelectPartnerPage {
  partner_arr = []
  show_partner_arr = []
  frontPage
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService) {
    this.frontPage = Utils.getViewController('A', this.navCtrl)
    // this.shopService.get_total_partners({}).then(res => {
    //   if (res.result.res_code == 1 && res.result.res_data){
    //     this.partner_arr = res.result.res_data
    //     for (let i = 0; i < this.partner_arr.length; i ++){
    //       this.show_partner_arr.push(this.partner_arr[i])
    //     }
    //   }
    // })  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectPartnerPage');
  }

  goBack(){
    this.navCtrl.pop()
  }

  searchByKeyword(event) {
    this.show_partner_arr = []
    // for (let i = 0; i < this.partner_arr.length; i ++){
    //   if ((new RegExp(event.target.value).test(this.partner_arr[i].name))){
    //     this.show_partner_arr.push(this.partner_arr[i])
    //   }
    // }

    this.shopService.search_partner_name({'text': event.target.value}).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.show_partner_arr = res.result.res_data
      }
    })

    
  }

  clearText(){
    this.show_partner_arr = []
    // for (let i = 0; i < this.partner_arr.length; i ++){
    //       this.show_partner_arr.push(this.partner_arr[i])
    //     }
  }

  choose_one(item){
    this.frontPage.data.need_update = true
    this.frontPage.data.partner_id = item.partner_id
    this.frontPage.data.partner_name = item.name
    this.navCtrl.popTo(this.frontPage)
  }

  clear_select(){
    this.frontPage.data.need_update = true
    this.frontPage.data.partner_id = ''
    this.frontPage.data.partner_name = ''
    this.navCtrl.popTo(this.frontPage)
  }

}
