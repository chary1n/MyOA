import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Platform } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { VacationAutoService } from './vacation-approval-autoService';
import { VacationMeAutoService} from './vacation-approval-MeautoService'
import { VacationService } from './vacationService';
declare let cordova: any;
/**
 * Generated class for the VacationApprovalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-vacation-approval',
  templateUrl: 'vacation-approval.html',
  providers: [VacationAutoService,VacationService,VacationMeAutoService],
})
export class VacationApprovalPage {
  inner_type = 'wait_me'
  me_list = []
  wait_me_list = []
  is_manager = false
  user_id;
  is_ios = false
  constructor(public navCtrl: NavController, public navParams: NavParams,public vacationAutoService: VacationAutoService,
                public vacationService: VacationService,public storage: Storage,public platform:Platform, public vacationMeAutoService:VacationMeAutoService) {
                  if (this.platform.is('ios')) {
      this.is_ios = true
    }
 }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VacationApprovalPage');
    // cordova.plugins.Keyboard.close();
  }

  ionViewWillEnter() {
    
    this.storage.get('user')
      .then(res => {
        this.user_id = res.result.res_data.user_id
        this.vacationService.get_is_department(res.result.res_data.user_id).then(result => {
            if (result.result.res_data && result.result.res_code == 1) {
              this.is_manager = result.result.res_data.is_manager
            }
            if (this.inner_type == 'wait_me')
            {
              this.click_wait_me()
            }
            else
            {
              this.click_me()
            }
          }
        )
      }
      )
  }

  click_me(){
    this.inner_type = 'me'
    this.me_list = []
    this.vacationService.get_total_vacation(this.user_id,false).then(my_data => {
                if (my_data.result.res_data && my_data.result.res_code == 1) {
                    this.me_list = my_data.result.res_data
                }
              })   
  }

  click_wait_me(){
     this.inner_type = 'wait_me'
     this.wait_me_list = []
     this.vacationService.get_total_vacation(this.user_id,true).then(my_data => {
                if (my_data.result.res_data && my_data.result.res_code == 1) {
                    this.wait_me_list = my_data.result.res_data
                }
              })         
  }

  itemSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "rt_name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2) {
      type = "rt_employee_id";
      search_text = event.name.replace("搜 申请人：", "")
    }
    this.wait_me_list = []
    this.vacationService.search_vacation(type,search_text,this.user_id,false).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.wait_me_list = res.result.res_data
      }
    })
  }

  itemClearSelected(event){
    if (this.inner_type == 'wait_me')
            {
              this.click_wait_me()
            }
            else
            {
              this.click_me()
            }
  }

  itemMeSelected(event) {
    let type;
    let search_text;
    if (event.id == 1) {
      type = "rt_name";
      search_text = event.name.replace("搜 单号：", "")
    }
    else if (event.id == 2){
      type = 'rt_to_approval_user_id'
      search_text = event.name.replace('搜 待审核人：','')
    }
    this.me_list = []
    this.vacationService.search_vacation(type,search_text,this.user_id,true).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        this.me_list = res.result.res_data
      }
    })
  }

  itemClearMeSelected(event){
    this.click_me()
  }

  approval_detail(item){
    this.navCtrl.push('VacationDetailPage',{
      data_item:item,
      is_me:false,
      is_create:false,
    })
  }

  goBack(){
    this.navCtrl.pop()
  }

  click_approve_vacation(){
    this.navCtrl.push('VacationDetailPage',{
      is_me:true,
      is_create:true,
    })
  }

  approval_detail_no_approve(item){
    this.navCtrl.push('VacationDetailPage',{
      data_item:item,
      is_me:true,
      is_create:false,
    })
  }

}
