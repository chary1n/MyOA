import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { SaleReportService} from './sale-report-service'
/**
 * Generated class for the SaleReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-sale-report',
  templateUrl: 'sale-report.html',
  providers: [SaleReportService],
})
export class SaleReportPage {
  result 
  adjust_arr = []
  constructor(public navCtrl: NavController, public navParams: NavParams, public saleService: SaleReportService) {
    this.result = {}
    this.saleService.sale_data_for_sale_man({}).then(res => {
      if (res.result && res.result.res_code == 1) {
        this.result = res.result.res_data
        for (var index = 0; index < this.result.columns.length * 2 ; index ++) {
          this.adjust_arr.push('1')
        }
      }
    })
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad SaleReportPage');
  }

  ionViewDidEnter(){
    
  }

  goBack(){
    this.navCtrl.pop()
  }

}
