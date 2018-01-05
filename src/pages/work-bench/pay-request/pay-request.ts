import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events } from 'ionic-angular';
import { PaymentRequestService} from './pay-requestService';
import { Storage } from '@ionic/storage';
import { PaymentAutoService} from './pay-request-auto';

/**
 * Generated class for the PayRequestPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-pay-request',
  templateUrl: 'pay-request.html',
  providers:[PaymentRequestService,PaymentAutoService],
})
export class PayRequestPage {
  user_id;
  limit;
  offset;
  paymentList;
  pet;
  isMoreData;
  waitMeList;
  alreadyList;
  waitMeTitle;
  constructor(public navCtrl: NavController, public navParams: NavParams,public paymentService: PaymentRequestService,
  public storage :Storage,public paymentAutoService:PaymentAutoService) {
      this.pet = "2"
      this.waitMeTitle = "待我审批"
      this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.limit = 20;
        this.offset = 0;
        this.paymentService.get_payment_request_list("wait_me",this.limit,this.offset,this.user_id).then(res => {
          console.log(res.result.res_data.count)
          if (res.result && res.result.res_code == 1 && res.result.res_data) {
            this.waitMeList = res.result.res_data;
            this.waitMeTitle = "待我审批(" + res.result.res_data.count + ")"
          }
          else
          {
            this.waitMeList = [];
            this.waitMeTitle = "待我审批(0)"
          }
        })
      })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PayRequestPage');
  }

  changeState(){
    return "1";
  }

}
