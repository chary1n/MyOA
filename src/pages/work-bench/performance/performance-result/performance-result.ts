import { PersonService } from './../performance-service';
import { Component , Input} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { Utils } from '../../../../providers/Utils';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

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
  listItem;
  bigBean;
  state;
  rt_appraisaled_employee_name;
  rt_name;
  rt_appraisal_cycle;
  rt_department_id;
  rt_job_id;
  result_score;
  rt_appraisal_detail_lines;
  rt_is_need_self = false;
  rt_manager_final_score;
  rt_manager_advice
  constructor(public navCtrl: NavController, public navParams: NavParams
            , public statusBar:StatusBar,public servicePerformance: PersonService,
            public toastCtrl: ToastController,) {

        this.id = this.navParams.get('id')
        console.log('this.id' + this.id)
        let body ={
          'id': this.id
        }
        this.servicePerformance.get_performance_result(body).then(res=>{
          if(res.result.res_code==1 && res.result){
            this.bigBean = res.result.res_data
            this.state = this.bigBean.rt_state
            this.rt_appraisaled_employee_name = this.bigBean.rt_appraisaled_employee_name
            this.rt_name = this.bigBean.rt_name
            this.rt_appraisal_detail_lines = this.bigBean.rt_appraisal_detail_lines
            this.rt_appraisal_cycle = this.bigBean.rt_appraisal_cycle
            this.rt_department_id = this.bigBean.rt_department_id
            this.rt_job_id = this.bigBean.rt_job_id
            this.result_score = this.bigBean.result_score
            this.listItem = res.result.res_data.performanceDetail
            this.rt_is_need_self = res.result.res_data.rt_is_need_self
            this.rt_manager_final_score = res.result.res_data.rt_manager_final_score
            this.rt_manager_advice = res.result.res_data.rt_manager_advice
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

  changeStr(num){
    let str
    if (num=="1"){
      str = "考核中"
    }else if(num=="0"){
      str = "草稿"
    }else{
      str = "完成"
    }
    return str
  }

  changeCycle(num){
    let str
    if (num=="0"){
      str = "周"
    }else if(num=="1"){
      str = "月"
    }else{
      str = "年"
    }
    return str
  }

  isShowBack(item){
    let show = false;
    if (item.rt_appraisal_type=="self") {
    }else if(item.rt_appraisal_type=="other"){
      show = true
    }else if(item.rt_appraisal_type=="manager"){
      show = false
    }
    return show
  }

  whoCare(str){
    let s
    if (str=="self") {
      s = "自评"
    }else if(str=="other"){
      s = "他评"
    }else if(str=="manager"){
      s = "主管评"
    }
    return s
  }

  lookPerformance(item){
    if (item.rt_state=="1"){
      Utils.toastButtom('暂未考评', this.toastCtrl)
    }else if(item.rt_state=="0"){
      Utils.toastButtom('暂未考评', this.toastCtrl)
    }else if(item.rt_state=="2"){
      this.navCtrl.push('PerformanceResultDetailPage',{
        'item': item
      })
    }
  }
}
