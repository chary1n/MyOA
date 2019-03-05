import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkBenchModel } from './../../model/WorkBenchModel';
import { Storage } from '@ionic/storage';
import { CommonUseServices} from '../work-bench/commonUseServices';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the NewWorkBenchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-work-bench',
  templateUrl: 'new-work-bench.html',
  providers: [CommonUseServices],
})
export class NewWorkBenchPage {
  inner_type = 'normal'
  loginIndex
  performance = 0
  vacation_num = 0
  recoup_num = 0
  shengou_num = 0
  bx_num = 0
  yufu_num = 0
  jiekuan_num = 0
  showBaoBiao = false;
  po_num = 0
  pay_num = 0
  pandianNum=0
  gongchengNum=0
  salary_num = 0
  isShowCG = false
  isShowCK = false
  constructor(public navCtrl: NavController, public navParams: NavParams,public statusbar:StatusBar,public services:CommonUseServices,
              public storage: Storage) {
      
              
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewWorkBenchPage');
  }

  ionViewWillEnter(){
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();

    
  } 

  ionViewDidEnter() {
    this.storage.get('user')
      .then(res => {
        console.log(res);
        let uid = res.result.res_data.user_id
        
        for (let product of res.result.res_data.groups) {
          if(product.name == 'group_account_manager'){
            this.showBaoBiao = true;
          }
          if(product.name == 'group_purchase_user' || product.name == 'group_purchase_manager'){
            this.isShowCG = true;
          }
          if(product.name == 'group_stock_manager'){
            this.isShowCK = true;
          }
        }

        this.storage.get("loginIndex").then(res => {
          this.loginIndex = res
          console.log("loginIndex = "+this.loginIndex)

            this.services.get_all_num({
              'uid': uid
            }).then(res => {
              if(res.result.res_code==1 && res.result){
                console.log(res)
                this.performance = res.result.res_data.performance
                this.vacation_num = res.result.res_data.vacation_num
                this.recoup_num = res.result.res_data.recoup_num
                this.shengou_num = res.result.res_data.sg_num
                this.bx_num = res.result.res_data.bx_num
                this.yufu_num = res.result.res_data.yufu_num
                this.jiekuan_num = res.result.res_data.jiekuan_num
                this.po_num = res.result.res_data.po_num
                this.pay_num = res.result.res_data.pay_num
                this.pandianNum = res.result.res_data.pandianNum
                this.gongchengNum = res.result.res_data.gongchengNum
                this.salary_num = res.result.res_data.salary_num
              }
            })
          })
        })
  }

  click_caigou(){
    this.inner_type = 'caigou'
  }

  click_normal(){
    this.inner_type = 'normal'
  }

  click_attendance(){
    this.navCtrl.push('KaoqinPage')
  }

  click_vacation(){
    this.navCtrl.push('VacationApprovalPage')
  }

  click_recoup(){
    this.navCtrl.push('AttendaceRecoupPage')
  }

  click_chuchai(){
    this.navCtrl.push('ChuchaiPage')
  }

  click_jixiao(){
    this.navCtrl.push('PerformancePage')
  }

  click_salary(){
    this.navCtrl.push('SalaryPage')
  }

  toAll(){
    this.navCtrl.push('AllSchedulePage',{
      is_work_bench:true
    })
  }

  click_baoxiao(){
    this.navCtrl.push('NewReimbursementPage')
  }

  click_shengou(){
    this.navCtrl.push('NewShengouPage')
  }

  click_jie(){
    this.navCtrl.push('NewZanzhiPage',{
      zz_type:'temp'
    })
  }

  click_yufu(){
    this.navCtrl.push('NewZanzhiPage',{
      zz_type:'advance'
    })
  }

  click_baobiao(){
    this.navCtrl.push('BaobiaoPage')
  }

  click_PO(){
    this.navCtrl.push('NewPurchaseOrderPage')
  }

  click_cangku(){
    this.inner_type='cangku'
  }

  click_gongcheng(){
    this.inner_type='gongcheng'
  }

  click_PD(){
    this.navCtrl.push('PandianListPage')
  }

  click_GC(){
    this.navCtrl.push('GongchengListPage')
  }

  click_Production() {
    this.navCtrl.push('NewProductionPage');
  }

  click_Pay(){
    this.navCtrl.push('NewPayRequestPage')
  }

  click_sale_report(){
    this.navCtrl.push('SaleReportPage')
  }
  click_contact(){
    this.navCtrl.push('ContactPersonPage')
  }
}
