import { Component, } from '@angular/core';
import { IonicPage,  ViewController, Events } from 'ionic-angular';

@IonicPage()
@Component({
  template: `
    <div>
      <ion-item no-lines tappable (click)="click_all()" style="border-bottom: solid 1px #f0f2f5">全部</ion-item>
      <ion-item no-lines tappable (click)="click_remark()" style="border-bottom: solid 1px #f0f2f5">回复</ion-item>
      <ion-item no-lines tappable (click)="click_system_remark()">系统消息</ion-item>
    </div>
  `,
})
export class PopoverSelectPage {
  id: any;
  constructor(public viewCtrl: ViewController, public events: Events) {

  }
  close() {
    this.viewCtrl.dismiss();
  }

  click_all() {
    this.events.publish('click_type', 'all');
    this.close()
  }

  click_remark() {
    this.events.publish('click_type', 'remark');
    this.close()
  }
  
  click_system_remark() {
    this.events.publish('click_type', 'system_remark');
    this.close()
  }

}