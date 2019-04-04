import { EmployeeService } from './../add-employee/EmployeeService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ContactService } from './contact-persionService'
import { Storage } from '@ionic/storage';
import { StatusBar } from '@ionic-native/status-bar';
import 'jquery'
declare var $: any;
declare let cordova: any;
// import { NFC, Ndef } from '@ionic-native/nfc';
/**
 * Generated class for the ContactPersonPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-contact-person',
  templateUrl: 'contact-person.html',
  providers: [ContactService, EmployeeService]
})
export class ContactPersonPage {
  departmentList;
  employeeList;
  showAll;
  origin_data;
  company_type;
  isMoreData = true;
  limit;
  offset;
  need_refresh = false;
  isShowEdit = false;
  originTotalList: any = [];
  breadcrumbsList = [];
  childList;
  originEmployeeList = [];
  uid

  setting
  zNodes = []
  tree_obj

  constructor(public navCtrl: NavController, public navParams: NavParams, public contactService: ContactService,
    public employeeService: EmployeeService,
    public storage: Storage, public statusbar: StatusBar) {
    this.showAll = "YES";
    this.limit = 20;
    this.offset = 0





    // this.employeeService.get_all_department().then((res) => {
    //   if (res.result && res.result.res_code == 1) {
    //     this.originTotalList = res.result.res_data[0]
    //   }
    // })
    // this.contactService.get_employees(this.limit, this.offset).then((res) => {
    //   if (res.result && res.result.res_code == 1) {
    //     this.originEmployeeList = res.result.res_data;
    //     this.employeeList = res.result.res_data;
    //     this.origin_data = this.employeeList;
    //   }
    // })
    this.statusbar.backgroundColorByHexString("#2597ec");
    this.statusbar.styleLightContent();
    this.showAll = "YES";
  }

  ionViewWillEnter() {
    // 获取组织架构
    // this.need_refresh = this.navParams.get("need_refresh")
    // if (this.need_refresh) {
    //   this.contactService.get_employees(this.limit, this.offset).then((res) => {
    //     if (res.result && res.result.res_code == 1) {
    //       this.employeeList = res.result.res_data;
    //       this.origin_data = this.employeeList;
    //     }
    //   })
    //   this.need_refresh = false
    // }

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactPersonPage');
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
                self.navCtrl.push('EmployeeDetailPage', {
                  item: res.result.res_data[0],
                  origin_data: res.result.res_data[0],
                  id: treeNode.res_id,
                  user_id: self.uid,
                })

              }
            })
          }
          else if (treeNode.res_model == 'hr.department') {
            $.fn.zTree.getZTreeObj("ztree_employee").expandNode(treeNode, !treeNode.open, false, true)
          }
        },
      }
    };
    this.storage.get('user')
      .then(res => {
        this.uid = res.result.res_data.user_id
        if ((new RegExp("js.robotime.com").test(res.result.res_data.user_ava))) {
          this.company_type = "assets/img/S-header.png"

        }
        else if ((new RegExp("dr.robotime.com").test(res.result.res_data.user_ava))) {
          this.company_type = "assets/img/D-header.png"

        }
        else if ((new RegExp("erp.robotime.com").test(res.result.res_data.user_ava))) {
          this.company_type = "assets/img/R-header.png"

        }
        else if ((new RegExp("ber.robotime.com").test(res.result.res_data.user_ava))) {
          this.company_type = "assets/img/B-header.png"
        }
        for (let product of res.result.res_data.groups) {
          if (product.name == 'group_hr_manager') {
            this.isShowEdit = true;
          }
        }

        this.employeeService.get_all_department_tree_loading({ 'uid': this.uid, 'need_total': true }).then(res => {
          if (res.result.res_data && res.result.res_code == 1) {
            this.zNodes = res.result.res_data
            $.fn.zTree.init($("#ztree_employee"), this.setting, this.zNodes);
            var zTree = $.fn.zTree.getZTreeObj("ztree_employee");

          }
        })

      })

  }


  clickShowAll() {
    this.clickAll()
    this.employeeList = this.originEmployeeList
  }

  clickItem(item) {

    this.contactService.get_department_detail(item.id).then((res) => {
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('EmployeeListPage', {
          items: res.result.res_data,
          title: item.name,
        })
      }
    })
  }

  itemSelect(item) {
    // this.navCtrl.push('EmployeeDetailPage',{
    //   item:item,
    // })
    this.employeeService.get_employee_info([item.employee_id], false).then(res => {
      console.log(res)
      if (res.result && res.result.res_code == 1) {
        this.navCtrl.push('EmployeeDetailPage', {
          item: res.result.res_data[0],
          origin_data: res.result.res_data[0],
          id: item.employee_id,
          user_id: item.id,
        })

      }
    })
  }

  clickAll() {
    if (this.showAll == "YES") {
      this.breadcrumbsList = []
      this.breadcrumbsList.push(this.originTotalList)
      this.childList = this.originTotalList.child
      this.employeeList = this.originTotalList.employees
      this.showAll = "NO";
    }
    else {
      this.showAll = "YES";
    }
  }

  addBreadcrumbs(item) {
    this.breadcrumbsList.push(item)
    this.childList = item.child
    this.employeeList = item.employees
  }

  clickBreadcrumbs(item, i) {
    this.childList = item.child
    this.employeeList = item.employees
    this.breadcrumbsList.splice(i + 1, this.breadcrumbsList.length - 1 - i)
  }

  getItems(ev: any) {
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.employeeList = this.origin_data.filter((item) => {
        console.log(item)
        if (item.name != '') {
          console.log(item.name.toLowerCase().indexOf(val.toLowerCase()) > -1)
          return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        }
      })
    }
    else {
      this.employeeList = this.origin_data;
    }

  }

  panEvent($event) {
    cordova.plugins.Keyboard.close();
  }

  doInfinite(infiniteScroll) {
    if (this.showAll == "NO") {
      infiniteScroll.complete();
      return;
    }
    if (this.isMoreData == true) {
      this.limit = 20;
      this.offset += 20;
      this.contactService.get_employees(this.limit, this.offset).then((res) => {
        if (res.result && res.result.res_code == 1) {
          if (res.result.res_data) {
            if (res.result.res_data.length == 20) {
              this.isMoreData = true;

            }
            else {
              this.isMoreData = false;
            }
            for (let item of res.result.res_data) {
              this.employeeList.push(item);
            }
          }
          else {
            this.isMoreData = false;
          }

        }
        else {
          this.isMoreData = false;
        }
        infiniteScroll.complete();
      })
    }
    else {
      infiniteScroll.complete();
    }

  }

  searchByKeyword(event) {

    this.showAll = "YES";
    // console.log(event.target.value)
    // this.isMoreData = false
    // this.contactService.search_employees(event.target.value).then(res => {
    //   if (res.result && res.result.res_code == 1) {
    //     this.employeeList = res.result.res_data;
    //   }
    // })
    var zTree = $.fn.zTree.getZTreeObj("ztree_employee");
    var nodeList = zTree.getNodesByParamFuzzy("name", event.target.value);
    //将找到的nodelist节点更新至Ztree内
    var final_arr = []
    if (event.target.value == 0) {
      final_arr = this.zNodes
      $.fn.zTree.init($("#ztree_employee"), this.setting, final_arr);
    
    }
    else {
      $.fn.tTree.fuzzySearch("ztree_employee",event.target.value,false,true)
    }
    cordova.plugins.Keyboard.close();
    
  }

  equeal_arr(arr) {
    var hash = [];
    for (var i = 0; i < arr.length; i++) {
      if (hash.indexOf(arr[i]) == -1) {
        hash.push(arr[i]);
      }
    }
    return hash;
  }

  clearText() {
    $.fn.zTree.init($("#ztree_employee"), this.setting, this.zNodes);
    cordova.plugins.Keyboard.close();
    // this.limit = 20;
    // this.offset = 0;
    // this.isMoreData = true
    // this.contactService.get_employees(this.limit, this.offset).then((res) => {
    //   if (res.result && res.result.res_code == 1) {
    //     this.employeeList = res.result.res_data;
    //     this.origin_data = this.employeeList;
    //   }
    // })
  }

  add() {
    // this.navCtrl.push('AddEmployeePage')
    this.navCtrl.push("PromptPage")
  }

  goBack(){
    this.navCtrl.pop()
  }
  

}
