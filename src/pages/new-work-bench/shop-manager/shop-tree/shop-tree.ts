import { NavController, NavParams, IonicPage, ActionSheetController, ModalController, Content, ToastController } from 'ionic-angular';
import { Component, ViewChild, } from '@angular/core';
import { HttpService } from './../../../../providers/HttpService';
import { Utils } from './../../../../providers/Utils';
import { ShopService } from './../shopService'
/**
 * Generated class for the ShopTreePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-shop-tree',
  templateUrl: 'shop-tree.html',
  providers: [ShopService],
})
export class ShopTreePage {
  setting
  zNodes = []
  uid
  tree_obj
  constructor(public navCtrl: NavController, public navParams: NavParams, public shopService: ShopService,
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
    this.shopService.get_team_department_tree({ 'uid': this.uid}).then(res => {
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
        line_ids.push(select_data[i].user_id)
      }
    }
    let body = {
      'line_ids': line_ids,
    }
    this.shopService.get_employees_visit(body).then(res => {
      if (res.result.res_data && res.result.res_code == 1){
        this.navCtrl.push('ShowShopTreeDataPage', {
          'visit_message_arr': res.result.res_data,
        })
      }
      else{
        Utils.toastButtom('选择员工无数据', this.toastCtrl)
      }
    })
  }

}
