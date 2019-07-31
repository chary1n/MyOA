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
  adjust_num = 0
  isShowCG = false
  isShowCK = false
  isShowHR = false
  isShowManager = false
  isShowPDM = false
  isShowSale = false

  can_show_hr_menu = false
  dimission_num=0 // 离职审核
  offer_num=0 //offer 审核
  intp_num=0

  cust_num=0 // 内销认领
  hk_cust_num=0 // 外销认领

  can_show_hmc=false //花名册
  can_show_rz=false //入职
  can_show_rc=false //人才库
  can_show_lz=false //离职
  can_show_adjust_department=false
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
          if (product.name == 'group_hr_manager' || product.name == 'employee_department_manager' || product.name == 'rt_hr_employee_manager' || product.name == 'recruitment_manager' || product.name == 'employee_manage_manager'){
            this.isShowHR = true
            this.can_show_hr_menu = true
            // 人力资源管理员、员工部门管理员、人事管理管理员（只能看到自己的部门）==> 花名册、入职
            if (product.name == 'group_hr_manager' || product.name == 'employee_department_manager' || product.name == 'rt_hr_employee_manager'){
              this.can_show_hmc = true
              this.can_show_rz = true
            }
            // 人力资源管理员、招聘管理管理员、部门负责人 ==> 人才库
            if (product.name == 'group_hr_manager' || product.name == 'recruitment_manager'){
              this.can_show_rc = true
            }
            // 部门负责人（自己待审核的单据）、员工管理管理员、人力资源管理员 ==> 离职
            if (product.name == 'group_hr_manager' || product.name == 'employee_manage_manager'){
              this.can_show_lz = true
              this.can_show_adjust_department = true
            } 

          }
          if (product.name == 'manger_for_sub_current_employee_department'){
            this.isShowManager = true
            this.can_show_hr_menu = true
            this.can_show_rc = true
            this.can_show_lz = true
            this.can_show_adjust_department = true
          }
          if (product.name == 'group_production_planning_user'){
            this.isShowPDM = true
          }
          if (product.name == 'group_sale_salesman' || product.name == 'group_sale_manager' || product.name == 'group_sale_salesman_all_leads'){
            this.isShowSale = true
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
                this.dimission_num = res.result.res_data.dimission_num
                this.offer_num = res.result.res_data.offer_num
                this.intp_num = res.result.res_data.intp_num
                this.cust_num = res.result.res_data.cust_num
                this.adjust_num = res.result.res_data.adjust_num
                this.hk_cust_num = res.result.res_data.hk_cust_in
              }
            })
          })
        })
  }

  cal_num(cust_num){
    if (cust_num <= 99){
      return cust_num
    }
    else{
      return '99+'
    }
  }

  click_caigou(){
    this.inner_type = 'caigou'
  }

  click_normal(){
    this.inner_type = 'normal'
  }

  click_sale(){
    this.inner_type = 'sale'
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

  click_production_manager(){
    this.inner_type = 'pdmanager'
  }

  click_renshi(){
    this.inner_type = 'renshi'
  }

  click_PD(){
    this.navCtrl.push('PandianListPage')
  }

  click_GC(){
    this.navCtrl.push('GongchengListPage')
  }

  click_Production() {
    this.navCtrl.push('NewProductionPage',{
      type: 'cg'
    });
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

  click_HR_entry(){
    this.navCtrl.push('AddEmployeePage')
  }

  click_employee_infos(){
    this.navCtrl.push('ContactPersonPage',{
      'is_hr_manager_enter': true,
    })
  }

  click_daily_report(){
    this.navCtrl.push('DailyReportPage')
  }

  click_Dimission(){
    this.navCtrl.push('LeaveWorkPage')
  }

  click_offer_approve(){
    this.navCtrl.push('ApplicantOfferApprovePage')
  }

  click_applicant_infos(){
    this.navCtrl.push('ApplicantOperatePage')
  }

  click_intp(){
    this.navCtrl.push('IntpPage')
  }

  click_map(){
    this.navCtrl.push('ShopManagerPage')
  }

  click_cust_in(){
    this.navCtrl.push('CustInPage')
  }

  click_hk_cust_in(){
    this.navCtrl.push('HkCustInPage')
  }

  click_adjust_department(){
    this.navCtrl.push('AdjustDepartmentPage')
  }

  click_Production_Purchase(){
    this.navCtrl.push('NewProductionPage',{
      type: 'purchase'
    });
  }

  click_new_customer(){
    this.navCtrl.push('NewCustomerPage')
  }
  
}
