import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { Utils } from './../../../providers/Utils';
import { EmployeeService } from './../EmployeeService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController } from 'ionic-angular/navigation/nav-controller';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
declare var $: any;
declare var cordova: any;
/**
 * Generated class for the SelectDepartmentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-department',
  templateUrl: 'select-department.html',
  providers: [EmployeeService]
})
export class SelectDepartmentPage {
  uid
  setting
  zNodes = []
  tree_obj

  frontPage

  department_id
  department_name

  title_now = "请选择部门"
  constructor(public navCtrl: NavController, public navParams: NavParams, public employeeService: EmployeeService,
    public storage: Storage, public toastCtrl: ToastController) {
    this.frontPage = Utils.getViewController(this.navParams.get('page'), navCtrl)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectDepartmentPage');
  }

  ionViewDidEnter() {
    let self = this
    this.setting = {
      data: {
        simpleData: {
          enable: true
        }
      },
      callback: {
        onClick: function (event, treeId, treeNode, clickFlag) {
          if (treeNode.res_model == 'hr.employee') {
            self.employeeService.get_employee_info([treeNode.res_id], false).then(res => {
              console.log(res)
              if (res.result && res.result.res_code == 1) {

              }

            })
          }
          else if (treeNode.res_model == 'hr.department') {
            $.fn.zTree.getZTreeObj("ztree_department").expandNode(treeNode, !treeNode.open, false, true)
            self.department_id = treeNode.res_id
            self.department_name = treeNode.name
            self.title_now = "已选择：" + treeNode.name
          }
        },
      }
    }
    this.storage.get('user')
      .then(res => {
        this.uid = res.result.res_data.user_id

        this.employeeService.new_department_tree({ 'uid': this.uid }).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.zNodes = res.result.res_data
            $.fn.zTree.init($("#ztree_department"), this.setting, this.zNodes);
            var zTree = $.fn.zTree.getZTreeObj("ztree_department");

          }
        })

      })
  }

  searchByKeyword(event) {
    var zTree = $.fn.zTree.getZTreeObj("ztree_department");
    var nodeList = zTree.getNodesByParamFuzzy("name", event.target.value);
    //将找到的nodelist节点更新至Ztree内
    var final_arr = []
    if (event.target.value == 0) {
      final_arr = this.zNodes
      $.fn.zTree.init($("#ztree_department"), this.setting, final_arr);

    }
    else {
      $.fn.tTree.fuzzySearch("ztree_department", event.target.value, false, true)
    }
    cordova.plugins.Keyboard.close();

  }

  goBack() {
    this.navCtrl.pop()
  }

  confirm_select() {
    if (this.department_id) {
      var department_id = this.department_id
      var department_name = this.department_name
      this.frontPage.data.need_update_department = true
      this.frontPage.data.department_id = department_id
      this.frontPage.data.department_name = department_name
      this.navCtrl.popTo(this.frontPage);
    }
    else
    {
      Utils.toastButtom("请选择一个部门", this.toastCtrl)
    }

  }

}
