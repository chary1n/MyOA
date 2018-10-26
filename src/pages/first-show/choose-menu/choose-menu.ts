import { NavParams } from 'ionic-angular/navigation/nav-params';
import { NavController, Events, MenuController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the ChooseMenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-choose-menu',
  templateUrl: 'choose-menu.html',
})
export class ChooseMenuPage {
  root = 'AllSchedulePage';
  me_type = 'all'
  state_type = 'all'
  // start_datetime = new Date(new Date().getTime()+8*60*60*1000).toISOString();
  end_date;
  start_date;
  is_show_me = true
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public events: Events, public storage: Storage, public menu: MenuController,
    public event: Events) {
      events.subscribe('ChooseMenuPage', (data) => {

    });
    events.subscribe('changeTeam',(data) => {
      if (data.data == 'team'){
        this.is_show_me = false
      }
      else if (data.data == 'me'){
        this.is_show_me = true
      }
    })
    events.subscribe('initData', (data) => {
      this.me_type = 'all'
      this.state_type = 'all'
      this.start_date = ''
      this.end_date = ''
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseMenuPage');
  }

  closeMenu() {
    console.log('closeMenu')
  }

  openMenu() {
  }

  dragMenu() {
    console.log('拖菜单')
  }

  click_me_all(){
    this.me_type = 'all'
    this.menu.close()
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })

  }

  click_me_create(){
    this.me_type = 'create'
    this.menu.close()
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })
  }

  click_me_fuze(){
    this.me_type = 'fuze'
    this.menu.close()
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })
  }

  click_me_canyu(){
    this.me_type = 'canyu'
    this.menu.close()
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })
  }
  
  click_state_all(){
    this.state_type = 'all'
    this.menu.close()
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })
  }

  click_state_unfinish(){
    this.state_type = 'unfinish'
    this.menu.close()
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })
  }

  click_state_finish(){
    this.state_type = 'finish'
    this.menu.close()
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })
  }

  changeStartDate(event){
    this.start_date = event
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })

  }

  changeEndDate(event){
    this.end_date = event
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })
  }
}
