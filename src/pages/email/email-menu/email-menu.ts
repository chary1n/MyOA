import { TreeModel } from 'ng2-tree';
import { Storage } from '@ionic/storage';
import { EmailService } from './../emailService';
import { EmailPage } from './../email';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, Events, MenuController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Component, ViewChild } from '@angular/core';

/**
 * Generated class for the EmailMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-email-menu',
  templateUrl: 'email-menu.html',
  providers: [EmailService]
})
export class EmailMenuPage {
  root = 'EmailPage';
  account_list = [];
  user_id;
  tabs;
  account_id;
  unseen_count;
  folder_list;
  label_list;
  tree: TreeModel
  showLabel = false;
  @ViewChild('treeComponent') treeComponent;
  constructor(public navCtrl: NavController, public navParams: NavParams, public emailService: EmailService,
    public events: Events, public storage: Storage, public menu: MenuController) {
    this.tabs = document.getElementsByClassName('tabbar').item(0);
    events.subscribe('emailMenu', (data) => {
      console.log("接收了")
      this.account_list = data;
      if (this.account_list) {
        this.account_id = this.account_list[0].id
      }
      console.log(this.account_list)
    });
    events.subscribe('label_folder', (data) => {
      this.unseen_count = data.unseen_count
      this.tree = {
        value: '文件夹',
        id: '',
        children: this.tranFolderToTree(data.folder_list, 0)
      }
      console.log(this.tree)
      this.label_list = data.label_list
      this.changeLabelColor()
    });
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
    // let menus = this.menu.getMenus()
    // if(menus.length>1){
    //   for(let i=0;i<menus.length;i++){
    //     menus[i].id
    //   }
    // }
  }

  ionViewDidLeave() {
    // this.events.unsubscribe('emailMenu');
    // this.events.unsubscribe('label_folder');
  }

  tranFolderToTree(folders_list, id) {
    let folders = this.getFolderListByPid(folders_list, id)
    let child = []
    for (let i = 0; i < folders.length; i++) {
      let bomItem: TreeModel = { value: "", children: [], id: '' ,
      settings:{
        isCollapsedOnInit:true
      }};
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

  transFolders(folder_list) {
    let children = []


    // this.id = this.id + 1;
    // bomItem.value = bom.name + "      " + (bom.process_id[1] ? bom.process_id[1] : "") + "      " + (bom.qty ? bom.qty : "");
    // if (bom.bom_ids && bom.bom_ids.length > 0) {
    //   for (let item of bom.bom_ids) {
    //     {
    //       bomItem.children.push(this.analaysisBom(item))
    //     }
    //   }
    // } else {
    //   bomItem.children = undefined;
    // }
    // return bomItem;
  }


  click_box(email_type, state_type, event, data_id = '') {
    this.menu.close()
    let elements = document.getElementsByClassName('box_item')
    for (let i = 0; i < elements.length; i++) {
      let class_list = elements[i].classList
      class_list.remove('box_item_choose')
    }
    this.events.publish('click_envnt', this.account_id, email_type, state_type, data_id)
    if (event!='') {
      let target = event.target || event.srcElement;
      this.getParentByClass(target).classList.add('box_item_choose')
    }
  }

  getParentByClass(target) {
    if (target.classList.contains('box_item')) {
      return target
    }
    if (target.parentNode.classList.contains('box_item')) {
      return target.parentNode
    } else {
      return this.getParentByClass(target.parentNode)
    }
  }



  changeLabel() {
    this.showLabel = !this.showLabel
    this.changeLabelColor();
  }
  changeLabelColor() {
    setTimeout(() => {
      this.label_list.forEach(element => {
        let node = document.getElementById('label_' + element.id);
        if (node) {
          node.setAttribute('style', 'background-color:' + element.color);
        }
      });
    }, 10);
  }

  click_label(data_id) {
    this.click_box('label', '', '', data_id)
  }


  closeMenu() {
    console.log('closeMenu')
    this.tabs['style'].display = 'flex';
    this.events.publish('closeMenu')
  }

  openMenu() {
    console.log('openMenu')
    this.tabs['style'].display = 'none';
  }

  dragMenu() {
    console.log('拖菜单')
    this.tabs['style'].display = 'none';
  }


  chooseAccount(account_id) {
    this.account_id = account_id
    this.click_box('state', 'all_received', '')
  }

  // 文件夹选中
  handleSelected(event) {
    let id = event.node.id
    let value = event.node.value
    console.log(id)
    console.log(value)
    this.menu.close()
    if (id) {
      this.events.publish('click_envnt', this.account_id, 'folder', '', id)
    } else {
      this.events.publish('click_envnt', this.account_id, 'folder', '', '')
    }
  }

}
