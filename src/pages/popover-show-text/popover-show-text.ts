import { Component, } from '@angular/core';
import { IonicPage,  ViewController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <div style="padding: 10px;">
      {{show_text}}
    </div>
  `,
})
export class PopoverShowTextPage {
  show_text: any;
  constructor(public viewCtrl: ViewController) {
    this.show_text = viewCtrl.getNavParams().get('show_text');

  }
  close() {
    this.viewCtrl.dismiss();
  }

}