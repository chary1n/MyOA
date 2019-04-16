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
  me_type = []
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
    // events.subscribe('initData', (data) => {
    //   this.me_type = []
    //   this.state_type = 'all'
    //   this.start_date = ''
    //   this.end_date = ''
    // })

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChooseMenuPage');
    this.events.subscribe('popNavCtrl',(data) => {
      if (data.data == true){
        this.navCtrl.pop()
        this.event.unsubscribe('popNavCtrl')
      }
    })
  }

  ionViewWillEnter() {

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
    this.me_type = []
  }

  click_me_create() {
    if (this.me_type.indexOf('create') > -1) {
        let index = 0
        for (let i = 0; i < this.me_type.length; i++){
          if (this.me_type[i] == 'create'){
            index = i
          }
        }
        this.me_type.splice(index,1)
    }
    else{
      this.me_type.push('create')
    }
  }

  click_me_fuze() {
    if (this.me_type.indexOf('fuze') > -1) {
        let index = 0
        for (let i = 0; i < this.me_type.length; i++){
          if (this.me_type[i] == 'fuze'){
            index = i
          }
        }
        this.me_type.splice(index,1)
    }
    else{
      this.me_type.push('fuze')
    }
  }

  click_me_canyu() {
    if (this.me_type.indexOf('canyu') > -1) {
        let index = 0
        for (let i = 0; i < this.me_type.length; i++){
          if (this.me_type[i] == 'canyu'){
            index = i
          }
        }
        this.me_type.splice(index,1)
    }
    else{
      this.me_type.push('canyu')
    }
  }
  
  click_state_all(){
    this.state_type = 'all'
    // this.menu.close()
  }

  click_state_unfinish() {
    if (this.state_type == 'unfinish'){
      this.state_type = 'all'
    }
    else
    {
      this.state_type = 'unfinish'
    }
    
  }

  click_state_finish() {
    if (this.state_type == 'finish'){
      this.state_type = 'all'
    }
    else
    {
      this.state_type = 'finish'
    }
  }

  changeStartDate(event){
    this.start_date = event
  }

  changeEndDate(event){
    this.end_date = event
  }

  reset(){
    this.me_type = []
    this.state_type = 'all'
    this.end_date = ''
    this.start_date = ''
  }

  confirm(){
    this.menu.close()
    this.event.publish('search_domain',{
        me_type:this.me_type,
        state_type:this.state_type,
        start_date:this.start_date,
        end_date:this.end_date,
    })
  }

  goBack(){
    this.navCtrl.pop()
  }

  isSelectMe(item){
    if (this.me_type.length){
      if (this.me_type.indexOf(item) > -1) {
        return true
      }
      else
      {
        return false
      }
    }
    else
    {
      return false
    }
  }
}
