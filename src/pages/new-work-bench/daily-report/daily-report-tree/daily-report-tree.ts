import { NavController, NavParams, IonicPage, ActionSheetController, ModalController, Content, ToastController } from 'ionic-angular';
import { Component, ViewChild, } from '@angular/core';
import { ReportService } from './../reportService'
import { HttpService } from './../../../../providers/HttpService';
import { Utils } from './../../../../providers/Utils';
/**
 * Generated class for the DailyReportTreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-daily-report-tree',
  templateUrl: 'daily-report-tree.html',
  providers: [ReportService],
})
export class DailyReportTreePage {
  setting
  zNodes = []
  uid
  tree_obj
  constructor(public navCtrl: NavController, public navParams: NavParams, public reportService: ReportService,
  public toastCtrl: ToastController) {
    this.uid = this.navParams.get('user_id')
    this.setting = {
      check: {
        enable: true,
        chkStyle: "checkbox",
        chkboxType: { "Y": "s", "N": "ps" }
      },
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        onClick: function (event, treeId, treeNode, clickFlag) {
          $.fn.zTree.getZTreeObj("ztree").checkNode(treeNode, !treeNode.checked, "checkTruePS", null)
        },
      }
    };
    this.zNodes = [

    ]
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DailyReportTreePage');
  }

  ionViewDidEnter() {
    let self = this
    this.reportService.get_all_department({ 'uid': this.uid, 'need_total': false }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        self.zNodes = res.result.res_data
        self.tree_obj = $.fn.zTree.init($("#ztree"), self.setting, self.zNodes);
      }
    })
  }

  goBack() {
    this.navCtrl.pop()
  }

  click_watch() {
    let line_ids = []
    let select_data = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
    for (let i = 0; i < select_data.length; i++) {
      if (select_data[i].res_model == 'hr.employee') {
        line_ids.push(select_data[i].res_id)
      }
    }
    let body = {
      'line_ids': line_ids,
    }
    this.reportService.get_employees_reports(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.navCtrl.push('DailyReportTreeDetailPage', {
          'total_data_list': res.result.res_data.final_arr,
          'arr_index': res.result.res_data.arr_index,
          'uid': this.uid,
        })
      }
      else{
        Utils.toastButtom('选择员工无数据', this.toastCtrl)
      }
    })
  }

}
