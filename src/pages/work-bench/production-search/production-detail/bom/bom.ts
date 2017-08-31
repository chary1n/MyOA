import { TreeComponent } from 'ng2-tree';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NodeEvent, TreeModel, RenamableNode, Ng2TreeSettings } from 'ng2-tree';

/**
 * Generated class for the BomPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-bom',
  templateUrl: 'bom.html',
})

export class BomPage {
  item;
  fonts: TreeModel
  id = 0;
  @ViewChild('treeFFS') public treeFFS;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item")
    console.log(this.item)

    if (this.item.bom) {
      this.fonts = this.analaysisBom(this.item.bom);
    }

    console.log(this.fonts)
  }

  ionViewWillEnter() {
    let self = this;
    for (let i = 0; i <= this.id; i++) {
      self.handleActionOnFFS(i, 'collapse')
    }
  }


  analaysisBom(bom) {
    // let bomItem  =  TreeModel ;
    let bomItem: TreeModel = { value: "", children: [], id: this.id };
    this.id = this.id + 1;
    bomItem.value = bom.name + "      " + (bom.process_id[1] ? bom.process_id[1] : "") + "      " + (bom.qty ? bom.qty : "");
    if (bom.bom_ids && bom.bom_ids.length > 0) {
      for (let item of bom.bom_ids) {
        {
          bomItem.children.push(this.analaysisBom(item))
        }
      }
    } else {
      bomItem.children = undefined;
    }
    return bomItem;
  }


  public handleActionOnFFS(id: number | string, action: string) {
    const treeController = this.treeFFS.getControllerByNodeId(id);
    if (treeController && typeof treeController[action] === 'function') {
      treeController[action]();
    } else {
      console.log('There isn`t a controller for a node with id - ' + id);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BomPage');
  }

}
