import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{  NodeEvent, TreeModel, RenamableNode, Ng2TreeSettings} from 'ng2-tree';

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
  item ;
  fonts :TreeModel
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = this.navParams.get("item")
    console.log(this.item)
    this.fonts = {
      value: 'Fonts',
      children: [
        {
          value: 'Serif  -  All my children and I are STATIC ¯\\_(ツ)_/¯',
          id: 1,
          settings: {
            'static': true
          },
          children: [
            {value: '<a href="#" id="antiqua" class="test">Antiqua</a> with HTML tags.', id: 2},
            {value: 'DejaVu Serif', id: 3},
            {value: 'Garamond', id: 4},
            {value: 'Georgia', id: 5},
            {value: 'Times New Roman', id: 6},
            {
              value: 'Slab serif',
              id: 7,
              children: [
                {value: 'Candida', id: 8},
                {value: 'Swift', id: 9},
                {value: 'Guardian Egyptian', id: 10}
              ]
            }
          ]
        },
        {
          value: 'Sans-serif',
          id: 11,
          children: [
            {value: 'Arial', id: 12},
            {value: 'Century Gothic', id: 13},
            {value: 'DejaVu Sans', id: 14},
            {value: 'Futura', id: 15},
            {value: 'Geneva', id: 16},
            {value: 'Liberation Sans', id: 17}
          ]
        },
        {
          value: 'Monospace - With ASYNC CHILDREN',
          id: 18,
          // children property is ignored if "loadChildren" is present
          children: [{value: 'I am the font that will be ignored'}],
          loadChildren: (callback) => {
            setTimeout(() => {
              callback([
                {value: 'Input Mono', id: 19},
                {value: 'Roboto Mono', id: 20},
                {value: 'Liberation Mono', id: 21},
                {value: 'Hack', id: 22},
                {value: 'Consolas', id: 23},
                {value: 'Menlo', id: 24},
                {value: 'Source Code Pro', id: 25}
              ]);
            }, 5000);
          }
        }
      ]
    };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BomPage');
  }
  
}
