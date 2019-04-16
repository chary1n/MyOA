import { FirstShowService } from './../../first-show/first_service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'jquery'
import { Utils } from '../../../providers/Utils';
declare var $: any;

/**
 * Generated class for the SelectVisiblePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-select-visible',
  templateUrl: 'select-visible.html',
  providers: [FirstShowService]
})
export class SelectVisiblePage {

  user_id: any
  is_public = true
  frontPage: any
  isFirst = true//是否第一次打开树形

  setting
  zNodes = []
  tree_obj

  selectList = [] //参与者的列表
  showPeopleList = []//用于选择人员的临时数组
  constructor(public navCtrl: NavController, public navParams: NavParams, public firService: FirstShowService) {
           this.user_id = this.navParams.get('user_id')
           this.selectList = this.navParams.get('selectList')
           this.is_public = this.navParams.get('is_public')
           this.frontPage = Utils.getViewController('CreateMomentsPage', navCtrl)

     var self = this
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
          self.showPeopleList = []
          // self.selectList = []
          $.fn.zTree.getZTreeObj("ztree").checkNode(treeNode, !treeNode.checked, "checkTruePS", null)
          var select_data = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
          if(!treeNode.checked){
            for (let index = 0; index < self.selectList.length; index++) {
              if(treeNode.partner_id==self.selectList[index].partner_id){
                self.selectList.splice(index, 1)
                for (let k = 0; k < select_data.length; k++) {
                  if(treeNode.partner_id==select_data[k].partner_id)
                  $.fn.zTree.getZTreeObj("ztree").checkNode(select_data[k], false, "checkTruePS", null)
                }
            }
            }
          }else{
            if(self.selectList.length>0){
              var isAdd = true
              for (let index = 0; index < self.selectList.length; index++) {
                if(treeNode.partner_id==self.selectList[index].partner_id){
                    isAdd = false
                    break
                }
              }
              if(isAdd){
                self.selectList.push(treeNode)
              }
            }else{
              self.selectList.push(treeNode)
            }
          }
        },
        onCheck: function (e, treeId, treeNode) {
          self.showPeopleList = []
          // self.selectList = []
          var select_data = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
          if(!treeNode.checked){
            for (let index = 0; index < self.selectList.length; index++) {
              if(treeNode.partner_id==self.selectList[index].partner_id){
                  self.selectList.splice(index, 1)
                  for (let k = 0; k < select_data.length; k++) {
                    if(treeNode.partner_id==select_data[k].partner_id)
                    $.fn.zTree.getZTreeObj("ztree").checkNode(select_data[k], false, "checkTruePS", null)
                  }
              }
            }
          }else{
            if(self.selectList.length>0){
              var isAdd = true
              for (let index = 0; index < self.selectList.length; index++) {
                if(treeNode.partner_id==self.selectList[index].partner_id){
                    isAdd = false
                    break
                }
              }
              if(isAdd){
                self.selectList.push(treeNode)
              }
            }else{
              self.selectList.push(treeNode)
            }
          }
        }
      }
    }
    this.zNodes = []

    if(!this.is_public){
      this.isFirst = false
      this.initTree()
    }
  }

  fetch_is_in_arr(item) {
    let is_has = false
    for (let i = 0; i < this.selectList.length; i++) {
      if (this.selectList[i].partner_id == item.partner_id) {
        is_has = true
      }
    }
    return !is_has
  }


  ionViewDidEnter() {
    this.tree_obj = $.fn.zTree.init($("#ztree"), this.setting, this.zNodes);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectVisiblePage');
  }


  clickPublic(){
    this.is_public = true
  }

  //初始化树形
  initTree(){
    var self = this
    this.firService.get_all_department({ 'uid': this.user_id, 'need_total': true }).then(res => {
      if (res.result.res_data && res.result.res_code == 1) {
        self.zNodes = res.result.res_data
        for (let i = 0; i < self.selectList.length; i++) {
          var select_data = self.selectList[i]
          for (let j = 0; j < self.zNodes.length; j++) {
            var node_data = self.zNodes[j]
            if (node_data.partner_id) {
              if (select_data.partner_id == node_data.partner_id) {
                // if(self.fetch_is_in_arr(node_data)){
                  self.zNodes[j]['checked'] = true
                // }
              }
            }
          }
        }

        self.tree_obj = $.fn.zTree.init($("#ztree"), self.setting, self.zNodes);
      }
    })
  }

  clickNoPublic(){
    this.is_public = false
    if(this.isFirst){
      this.initTree()
    }
  }

  cancel(){
    this.navCtrl.pop()
  }

  finish(){
    this.frontPage.data.is_public = this.is_public;
    if(!this.is_public){
      // var select_data = this.selectList
      var select_data = $.fn.zTree.getZTreeObj("ztree").getCheckedNodes(true)
      var push_data = []
      for (let i = 0; i < select_data.length; i++) {
        if (select_data[i].res_model == 'hr.employee'){
          if (this.fetch_is_in_arr_tb(select_data[i], push_data)){
            push_data.push(select_data[i])
          }
        }
      }
      this.frontPage.data.selectList = push_data;
      this.frontPage.data.need_fresh = true;
    }
    this.navCtrl.pop()
  }

  fetch_is_in_arr_tb(item,item_arr) {
    let is_has = false
    for (let i = 0; i < item_arr.length; i++) {
      if (item_arr[i].partner_id == item.partner_id) {
        is_has = true
      }
    }
    return !is_has
  }
}
