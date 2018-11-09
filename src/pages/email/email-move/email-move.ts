import { Utils } from './../../../providers/Utils';
import { TreeModel } from 'ng2-tree';
import { EmailService } from './../emailService';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { IonicPage, NavController } from 'ionic-angular';
import { Component } from '@angular/core';

/**
 * Generated class for the EmailMovePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-email-move',
  templateUrl: 'email-move.html',
  providers:[EmailService]
})
export class EmailMovePage {
  tree: TreeModel
  frontPage:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,public emailService: EmailService) {
    this.frontPage = Utils.getViewController("EmailPage", navCtrl)
    this.emailService.get_email_label_folder(this.navParams.get('account_id'), this.navParams.get('user_id')).then(res => {
      if (res.result.res_data) {
        this.tree = {
          value: '文件夹',
          id: '',
          children: this.tranFolderToTree( res.result.res_data.folder_list, 0)
        }
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EmailMovePage');
  }

  tranFolderToTree(folders_list, id) {
    let folders = this.getFolderListByPid(folders_list, id)
    let child = []
    for (let i = 0; i < folders.length; i++) {
      let bomItem: TreeModel = { value: "", children: [], id: '' };
      bomItem.value = folders[i].name
      bomItem.id = folders[i].id
      if (this.tranFolderToTree(folders_list, folders[i].id).length > 0) {

        bomItem.children = this.tranFolderToTree(folders_list, folders[i].id)
      } else {
        bomItem.children = undefined
      }
      child.push(bomItem)
    }
    return child
  }

  getFolderListByPid(folders, pid) {
    let list = []
    for (let i = 0; i < folders.length; i++) {
      if (folders[i].pId == pid) {
        list.push(folders[i])
      }
    }
    return list
  }


  click_box(state,email_state,event){
    this.frontPage.data.movePageInfo = {
      'state':state,
      'email_state':email_state 
    }
    this.navCtrl.popTo(this.frontPage)
  }


  handleSelected(event){
    let id = event.node.id
    let value = event.node.value
    console.log(id)
    console.log(value)
    if (id) {
      this.frontPage.data.movePageInfo = {
        'state':'folder',
        'email_state':id 
      }
     this.navCtrl.popTo(this.frontPage)
    }
  }


  goBack(){
    this.frontPage.data.movePageBack = true
    this.navCtrl.popTo(this.frontPage)
  }



}
