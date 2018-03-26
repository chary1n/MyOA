import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WorkBenchModel } from './../../model/WorkBenchModel';
import { Storage } from '@ionic/storage';
import { CommonUseServices} from './commonUseServices';
import { StatusBar } from '@ionic-native/status-bar';

/**
 * Generated class for the WorkBenchPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-work-bench',
  templateUrl: 'work-bench.html',
  providers:[CommonUseServices],
})
export class WorkBenchPage {
  isShowEngineerPoint = false;//工程小红点
  isShowBuyPoint = false;//采购小红点
  isSale = false;//销售
  isBuy = false;//采购
  isEngineer;//工程
  isMoney;//财务
  currenTab;//目前所在的tab
  dataSource: any
  model: WorkBenchModel
  isShowPurchase = false;
  isShowSale = false;
  isShowKucun = false;
  isHR = false;
  isShowZiJin = false;
  isZZList = false;
  isShenGouList = false;
  isBaoxiaoList = false;
  zz_count = 0;
  sg_count = 0;
  bx_count = 0;
  py_count = 0;
  kc_count = 0;
  isShowPayment = false;
  user_id;
  company_type;
  isShowJournalSheet=false
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public services :CommonUseServices,public statusbar:StatusBar) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WorkBenchPage');
  }
  
  ionViewWillEnter(){
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
  }

  ionViewDidEnter() {

    this.storage.get('user')
      .then(res => {
        console.log(res);
        let is_plus = false
        let is_manager = false
        let need_all = false
        if(res.result.res_data.team){
          this.isShowJournalSheet = true
        }
        
        for (let product of res.result.res_data.groups) {
          if(product.name == 'group_inventory_user'){
            this.isShowKucun = true;
          }
          if (product.name == 'group_sale_salesman' || product.name == 'group_sale_manager' || product.name == 'group_sale_salesman_all_leads') {
            this.isShowSale = true;
            this.isSale = true
            this.isBuy = false
            this.isEngineer = false
            this.isMoney = false
          }
          if (product.name == 'group_purchase_user' || product.name == 'group_purchase_manager') {
            this.isShowPurchase = true;
            this.isBuy = true
            this.isSale = false
            this.isEngineer = false
            this.isMoney = false
          }
          if(!this.isSale && !this.isBuy){
            this.isEngineer = true
            this.isBuy = false
            this.isSale = false
            this.isMoney = false
          }
          if (product.name == 'group_account_manager') {
            this.isShowZiJin = true;
          }
          if (product.name == 'purchase_manager_1' || product.name == 'purchase_manager_plus')
          {
            if (product.name == 'purchase_manager_plus')
            {
              is_plus = true
            }
            else if (product.name == 'purchase_manager_1'){
              is_manager = true
            }
            this.isShowPayment = true
          }
        }
        if (is_plus && is_manager){
          need_all = true
        }

        if ((new RegExp("js.robotime.com").test(res.result.res_data.user_ava))){
            this.company_type = "assets/img/S-header.png"
            
          }
          else if ((new RegExp("dr.robotime.com").test(res.result.res_data.user_ava))){
            this.company_type = "assets/img/D-header.png"
            
          }
          else if ((new RegExp("erp.robotime.com").test(res.result.res_data.user_ava))){
            this.company_type = "assets/img/R-header.png"
            
          }
          else if ((new RegExp("ber.robotime.com").test(res.result.res_data.user_ava))){
            this.company_type = "assets/img/B-header.png"
          }
         this.services.get_all_need_do(res.result.res_data.user_id,is_plus,this.isShowKucun,need_all).then(res => {
            console.log(res.result.res_data.bx)
            if (res.result && res.result.res_code == 1 && res.result.res_data) {
              this.isZZList = res.result.res_data.zz > 0 ?true :false;
              this.isBaoxiaoList = res.result.res_data.bx > 0 ? true:false;
              this.isShenGouList = res.result.res_data.sg > 0 ?true :false;
              this.zz_count = res.result.res_data.zz;
              this.bx_count = res.result.res_data.bx;
              this.sg_count = res.result.res_data.sg;
              this.py_count = res.result.res_data.py;
              this.kc_count = res.result.res_data.kc;
            }
          })
          //判断采购小红点
          if(this.py_count>0 && this.isShowPayment){
            this.isShowBuyPoint = true
          }
          if(this.kc_count>0 && this.isShowKucun){
            this.isShowEngineerPoint = true
          }
          console.log('this.currenTab = '+this.currenTab+'this.isSale = '+this.isSale
        +'this.isBuy = '+this.isBuy+'this.isEngineer = '+this.isEngineer)
          switch(this.currenTab){
            case 1:
            this.sale()
            break
            case 2:
            this.buy()
            break
            case 3:
            this.engineer()
            break
            case 4:
            this.money()
            break
          }
      });
  }
 
//点击销售
  sale(){
    this.currenTab = 1
    this.isSale = true
    this.isBuy = false
    this.isEngineer = false
    this.isMoney = false
  }
  //点击采购
  buy(){
    this.currenTab = 2
    this.isSale = false
    this.isBuy = true
    this.isEngineer = false
    this.isMoney = false
  }
  //点击工程
  engineer(){
    this.currenTab = 3
    this.isSale = false
    this.isBuy = false
    this.isEngineer = true
    this.isMoney = false
  }
  //财务
  money(){
    this.currenTab = 4
    this.isSale = false
    this.isBuy = false
    this.isEngineer = false
    this.isMoney = true
  }
  clickInComingWareHouse() {
    this.navCtrl.push('IncomingPage');
  }
  supplierList() {
    this.navCtrl.push('SupplierListPage');
  }

  purchaseOrder() {
    this.navCtrl.push('OrderPage');
  }

  salesOrder() {
    this.navCtrl.push('SalesOrderPage');
  }

  customerSearch() {
    this.navCtrl.push('CustomerPage');
  }

  camCard() {
    this.navCtrl.push('CamCardPage');
  }

  ProductionSearch() {
    this.navCtrl.push('NewProductionPage');
  }

  reimbursement() {
    this.navCtrl.push('ReimbursementPage')
  }
  // 申请
  apply() {
    this.navCtrl.push('ApplyPage')
  }

  shengou() {
    this.navCtrl.push('ShengoupagePage')
  }


  material_request() {
    this.navCtrl.push('MaterialRequestPage');
  }

  zanzhi() {
    this.navCtrl.push("ZanzhiPage")
  }
  zhishifenxiang() {

  }
  shareKnowledge() {
    this.navCtrl.push('ShareKnowledgePage')
  }
  baobiao() {
    this.navCtrl.push('BaobiaoPage')
  }
  gongdan(){
    this.navCtrl.push('GongdanPage')
  }
  clickPayrequest(){
    this.navCtrl.push('PayRequestPage')
  }
  change_kucun(){
    this.navCtrl.push('ChangeKucunPage')
  }

  kaoqin(){
    this.navCtrl.push('KaoqinPage')
  }

  journalSheet(){
    this.navCtrl.push('JournalSheetPage')
  }
}