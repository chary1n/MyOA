import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, ToastController, AlertController } from 'ionic-angular';
import { Utils } from './../../../../providers/Utils';
import { Storage } from '@ionic/storage';
import { ShopService } from './../shopService'
import { NativeService } from './../../../../providers/NativeService';

/**
 * Generated class for the AddShopPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-add-shop',
  templateUrl: 'add-shop.html',
  providers: [ShopService, NativeService],
})
export class AddShopPage {
  can_show_footer = true

  shop_name
  phone
  email

  partner_name
  partner_id
  address
  country_name
  country_id
  state_name
  state_id
  island_name
  island_id

  main_contact = {}
  main_contact_index
  contact_arr = []

  beizhuText

  user_id

  lng
  lat

  starArr = ['1', '1', '1', '1', '1']
  priority = 0

  show_first = true
  show_second = true
  show_third = true
  show_four = true

  is_all_world = true

  attachments = []
  edit_attachments = []

  deletePicture

  selectCountryList = []
  selectStateList = []

  source_id
  source_arr = []

  website

  customer_store_product_type

  is_edit = false

  origin_item

  frontPage

  now_title

  customer_alias

  team_id
  team_id_id
  user_id_id
  user_id_name

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public shopService: ShopService, public nativeService: NativeService,
    public actionSheetCtrl: ActionSheetController) {
    this.user_id = this.navParams.get('user_id')
    this.is_edit = this.navParams.get('is_edit')
    if (this.is_edit) {
      this.now_title = '编辑门店'
      this.frontPage = Utils.getViewController('A', this.navCtrl)
      this.origin_item = this.navParams.get('item')
      this.set_data(this.origin_item)
    }
    else{
      this.now_title = '添加门店'
      this.shopService.get_me_sale_team({'user_id': this.user_id}).then(res => {
            if (res.result.res_data && res.result.res_code == 1){
              this.team_id_id = res.result.res_data.team_id
              this.team_id = res.result.res_data.team_name
              this.user_id_name = res.result.res_data.sale_man
              this.user_id_id = res.result.res_data.sale_man_id
            }
          })
    }
  }

  set_data(item) {
    this.shop_name = item.name
    this.partner_name = item.rt_partner_top_id
    this.partner_id = item.rt_partner_top_id_id
    this.priority = item.priority
    this.customer_store_product_type = item.customer_store_product_type
    this.source_id = item.source_id_id
    this.is_all_world = item.customer_is_world
    this.website = item.website
    this.phone = item.phone
    this.email = item.email

    this.country_id = item.country_id
    this.country_name = item.country_name
    this.state_id = item.state_id
    this.state_name = item.state_name
    this.address = item.street
    this.lng = item.rt_partner_shop_x
    this.lat = item.rt_partner_shop_y

    this.customer_alias = item.customer_alias
    this.team_id = item.team_id
    this.team_id_id = item.team_id_id
    this.user_id_id = item.user_id_id
    this.user_id_name = item.user_id

    this.contact_arr = item.contactList
    if (item.main_contact) {
      this.main_contact = item.main_contact
    }
    if (item.customer_continent) {
      this.selectStateList = item.customer_continent
    }

    if (item.customer_country_id) {
      this.selectCountryList = item.customer_country_id
    }

    this.attachments = item.attachments
    this.edit_attachments = item.all_attachments

  }

  ionViewDidLoad() {
    this.shopService.get_total_source_id({}).then(res => {
      if (res.result.res_code == 1 && res.result.res_data) {
        this.source_arr = res.result.res_data
      }
    })
    console.log('ionViewDidLoad AddShopPage');
  }

  ionViewWillEnter() {
    if (this.navParams.get('need_update_sale_man') == true) {
      this.user_id_name= this.navParams.data.sale_man
      this.user_id_id = this.navParams.data.sale_man_id
      this.team_id_id = this.navParams.data.team_id
      this.team_id = this.navParams.data.team_name
      this.navParams.data.need_update_sale_man = false;
    }
    if (this.navParams.get('need_update_team') == true) {
      if (this.navParams.data.team_id != this.team_id) {
        this.user_id_id = ''
        this.user_id_name = ''
      }
      this.team_id_id = this.navParams.data.team_id
      this.team_id = this.navParams.data.team_name
      this.navParams.data.need_update_team = false;
    }

    if (this.navParams.get('need_update') == true) {
      this.partner_id = this.navParams.data.partner_id
      this.partner_name = this.navParams.data.partner_name
      this.navParams.data.need_update = false;
    }

    if (this.navParams.get('need_update_address') == true) {
      if (this.navParams.data.country_choose_id) {
        this.country_id = this.navParams.data.country_choose_id
        this.country_name = this.navParams.data.country_choose_name
      }
      if (this.navParams.data.state_choose_id) {
        this.state_id = this.navParams.data.state_choose_id
        this.state_name = this.navParams.data.state_choose_name
      }
      if (this.navParams.data.detail_address) {
        this.address = this.navParams.data.detail_address
      }
      this.navParams.data.need_update_address = false;
    }


    if (this.navParams.get('need_update_gps') == true) {
      this.lng = this.navParams.data.select_lng
      this.lat = this.navParams.data.select_lat
      this.address = this.navParams.data.select_address
      this.navParams.data.need_update_gps = false
    }

    if (this.navParams.get('need_update_main_contact_list') == true) {
      this.contact_arr = this.navParams.get('main_contact_list')
      this.navParams.data.need_update_main_contact_list = false
      if (this.main_contact){
        let is_has_main_contact = false
        for (let i = 0; i < this.contact_arr.length; i ++){
          if (this.main_contact['name'] == this.contact_arr[0].name && this.main_contact_index == i){
            is_has_main_contact = true
          }
        }
        if (!is_has_main_contact){
          this.main_contact = {}
        }
      }
    }

    if (this.navParams.get('need_update_choose_main_contact') == true) {
      this.contact_arr = this.navParams.get('main_contact_list')
      this.main_contact = this.navParams.get('choosed_contact')
      this.main_contact_index = this.navParams.get('choose_index')
      this.navParams.data.need_update_choose_main_contact = false
    }

    if (this.navParams.get('isDeletePicture')) {
      
      if (this.is_edit) {
        this.attachments.splice(this.attachments.indexOf(this.deletePicture), 1)
        this.search_delete_origin_attachments()
      }
      else {
         this.attachments.splice(this.attachments.indexOf(this.deletePicture), 1)
      }
      this.navParams.data.isDeletePicture = false;
    }

    if (this.navParams.get('need_update_states') == true) {
      this.selectStateList = this.navParams.get('selectStateList')
      this.navParams.data.need_update_states = false
    }

    if (this.navParams.get('need_update_countrys') == true) {
      this.selectCountryList = this.navParams.get('selectCountryList')
      this.navParams.data.need_update_countrys = false
    }
  }

  goBack() {
    if (!this.shop_name && !this.partner_name && !this.country_name && !this.state_name && !this.address && !this.lng && !this.phone && !this.email && !this.beizhuText) {
      this.can_show_footer = false
      this.navCtrl.pop()
    }
    else {
      this.alertCtrl.create({
        title: '提示',
        subTitle: '是否确认返回？',
        buttons: [{ text: '取消' },
        {
          text: '确定',
          handler: () => {
            this.can_show_footer = false
            this.navCtrl.pop()
          }
        }
        ]
      }).present();
    }
  }

  choose_partner() {
    this.navCtrl.push('SelectPartnerPage')
  }

  choose_address() {
    this.navCtrl.push('ChooseAddressPage',{
      state_id: this.state_id,
      country_id: this.country_id,
      country_name: this.country_name,
      detail_address: this.address,
    })
  }

  choose_gps() {
    if (this.country_name || this.state_name || this.address) {
      this.navCtrl.push('ChoooseGpsPage', {
        center_address: this.country_name + this.state_name + this.address
      })
    }
    else {
      this.navCtrl.push('ChoooseGpsPage')
    }
  }

  choose_main_contact() {
    this.navCtrl.push('MainContactListPage', {
      contact_arr: this.contact_arr
    })
  }

  click(i) {
    // this.priority = (4 - i) + this.priority + 1;
    this.priority = i + 1;
  }

  clickGray(i) {
    this.priority = i + 1 + this.priority;
  }

  changeFirst() {
    this.show_first = !this.show_first
  }

  changeSecond() {
    this.show_second = !this.show_second
  }

  changeFour() {
    this.show_four = !this.show_four
  }

  click_contact_list() {
    this.navCtrl.push('MainContactListPage', {
      contact_arr: this.contact_arr
    })
  }

  clickPicture(item) {
    this.deletePicture = item
    this.navCtrl.push("DeletePicturePage", { item: item, AddEmployeePage: "AddShopPage" })
  }

  selectState() {
    this.navCtrl.push('MultiSelectCountryPage', {
      type: 'state',
      selected_arr: this.selectStateList
    })
  }

  selectCountry() {
    this.navCtrl.push('MultiSelectCountryPage', {
      type: 'country',
      selected_arr: this.selectCountryList
    })
  }

  addImg(allowEdit: boolean = false) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '',
      buttons: [
        {
          text: '拍照',
          //  role: 'destructive',
          handler: () => {
            this.getPicture(1, allowEdit);
          }
        },
        {
          text: '从手机相册选择',
          handler: () => {
            this.getPicture(0, allowEdit);
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  getPicture(type, allowEdit: boolean = false) {//1拍照,0从图库选择
    let options = {
      allowEdit: false,
    };
    if (type == 1) {
      this.nativeService.getPictureByCamera(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    } else {
      this.nativeService.getPictureByPhotoLibrary(options).subscribe(img_url => {
        this.getPictureSuccess(img_url);
      });
    }
  }

  getPictureSuccess(img_url) {
    this.attachments.push(img_url)
    if (this.is_edit) {
      this.edit_attachments.push({
        'create': true,
        'url': img_url,
      })
    }
  }

  search_delete_origin_attachments() {
    for (var i = 0; i < this.edit_attachments.length; i++) {
      if (this.edit_attachments[i].url == this.deletePicture) {
        this.edit_attachments[i]['delete'] = true
      }
    }
  }

  click_create_shop() {
    if (!this.shop_name) {
      Utils.toastButtom('请填写名称', this.toastCtrl)
      return
    }
    let body = {
      'name': this.shop_name,
      'user_id': this.user_id,
    }
    if (this.country_id) {
      body['country_id'] = this.country_id
    }
    if (this.state_id) {
      body['state_id'] = this.state_id
    }
    if (this.address) {
      body['street'] = this.address
    }
    if (this.partner_id) {
      body['partner_id'] = this.partner_id
    }
    if (this.lng) {
      body['lat'] = this.lat
      body['lng'] = this.lng
    }
    body['contact_arr'] = this.contact_arr
    if (this.main_contact) {
      body['contact_arr_index'] = this.main_contact_index
    }
    if (this.phone) {
      body['phone'] = this.phone
    }
    if (this.email) {
      body['email'] = this.email
    }
    if (this.website) {
      body['website'] = this.website
    }
    if (this.attachments.length > 0) {
      body['attachments'] = this.attachments
    }
    body['priority'] = this.priority
    if (this.customer_store_product_type) {
      body['customer_store_product_type'] = this.customer_store_product_type
    }
    body['is_all_world'] = this.is_all_world

    if (!this.is_all_world) {
      if (this.selectStateList.length > 0) {
        let stateList = []
        for (let i = 0; i < this.selectStateList.length; i++) {
          stateList.push(this.selectStateList[i].value)
        }
        body['customer_continent'] = stateList
      }
      if (this.selectCountryList.length > 0) {
        let countryList = []
        for (let i = 0; i < this.selectCountryList.length; i++) {
          countryList.push(this.selectCountryList[i].value)
        }
        body['customer_country_id'] = countryList
      }
    }

    if (this.source_id) {
      body['source_id'] = this.source_id
    }
    body['customer_alias'] = this.customer_alias
    body['team_id'] = this.team_id_id
    body['sale_man_id'] = this.user_id_id

    if (this.is_edit) {
      body['shop_id'] = this.origin_item.shop_id
      body['edit_attachments'] = this.edit_attachments
      this.shopService.edit_shop(body).then(res => {
        if (res.result.res_code == 1) {
          Utils.toastButtom('操作成功', this.toastCtrl)
          this.frontPage.data.need_refresh_view = true
          this.navCtrl.pop(this.frontPage)
        }
      })
    }
    else {
      this.shopService.create_new_shop(body).then(res => {
        if (res.result.res_code == 1) {
          Utils.toastButtom('创建成功', this.toastCtrl)
          this.navCtrl.pop()
        }
      })
    }

  }

  choose_team() {
    this.navCtrl.push('SelectTeamPage', {
        type: 'team',
      })

  }

  choose_sale_man() {
      this.navCtrl.push('SelectTeamPage', {
        type: 'sale_man',
        team_id: this.team_id_id
      })
  }

}
