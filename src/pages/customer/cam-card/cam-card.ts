import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Contacts, Contact, ContactField, ContactName,ContactFindOptions ,ContactFieldType,} from '@ionic-native/contacts';
import { pinyin } from './pinyin';  
import { ProductlistPage } from './../productlist/productlist';
import { EditCardPage } from './../edit-card/edit-card';
import { Storage } from '@ionic/storage';
/**
 * Generated class for the CamCardPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-cam-card',
  templateUrl: 'cam-card.html',
  providers:[Contacts],
})
export class CamCardPage {
  nameList:any = [];
  titleList:any;
  formatContacts:any = [];
  allSearchContacts = [];
  chooseCount = 0;
  users:any;
  saleteam_name:any;
  saleteam_id:any;
  saleman_name:any;
  saleman_id:any;
  constructor(public navCtrl: NavController, public navParams: NavParams,private contacts: Contacts
  ,public storage:Storage) {
    this.storage.get('user')
      .then(res => {
        console.log(res);
        if (res != null) {
          this.saleteam_id = res.result.res_data.team.team_id;
          this.saleteam_name = res.result.res_data.team.team_name;
          this.saleman_id = res.result.res_data.user_id;
          this.saleman_name = res.result.res_data.name;
        } 
      });

    let options = new ContactFindOptions();  
      let fields: ContactFieldType[];  
      fields = ["displayName", "phoneNumbers"];  
      options.filter = "";  
      options.multiple = true;  
      options.hasPhoneNumber = true;    
      
      this.contacts.find(fields, options).then((result) => {  
        
        for (var contact of result) {
          if (contact.organizations)
          {
            console.log(contact);
            this.nameList.push(contact);
          }
        }
        this.dealWithList(this.nameList);
      });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CamCardPage');
  }

  insertUserToArray(item)
  {
    
    if (item.isCheckBox == '0')
    {
      item.isCheckBox = '1';
    }
    else
    {
      item.isCheckBox = '0';
    }
    let out_int = 0
    for (var group of this.formatContacts) {
      let in_int = 0; 
      out_int ++;
      for (var items of group.value) {
        in_int ++;
        //  alert(item.displayName+items.displayName);
        if (items.displayName == item.displayName)
        {
          group.value[in_int - 1] = item;
          this.formatContacts[out_int - 1] = group;
          break;
        }
      }
    }
    this.cal_choose_card();
    // alert(this.formatContacts.length);
  }

  uploadCard()
  {
    let resultArr = [];
    for (var group of this.formatContacts) {
      for (var items of group.value) {
        if (items.isCheckBox == '1')
        {
           
          resultArr.push(items);
        }
      }
    }
  //  alert(resultArr);
  }

  cal_choose_card(){
    this.chooseCount = 0;
    for (var group of this.formatContacts) {
      for (var items of group.value) {
        if (items.isCheckBox == '1')
        {
          this.chooseCount ++;
        }
      }
    }
  } 

  isCheck(item)
  {
    // alert(item.displayName);
    if (item.isCheckBox == '1')
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  calling(item)
  {
    this.navCtrl.push(EditCardPage, {
      item:item,
    });
  }

   dealWithList(contacts) {  
    // console.log('Found contacts length==' + contacts.length);  
    // console.log('all contacts==' + JSON.stringify(contacts));  
    let contactsLength = contacts.length;  
    for (let i = 0; i < contactsLength; i++) {  
      
      if (contacts[i].phoneNumbers == null) {  
        
        continue;  
      }  
      // alert(contacts[i].phoneNumbers)
      let obj = {  
        displayName: '',  
        phoneNumber: '',  
        pinyinName: '',
        isCheckBox:'',
        departmentName:'',
        companyName:'', 
        email:'',
        address:'',
        sale_team:'',
        sale_person:'',
        saleteam_id:'',
        saleman_id:'',
        country_id:'',
        country_name:'',
        source_id:'',
        source_name:'',
        series_ids:[],
        series_names:[],
        series_name:'',
        tag_list:'',
        star_cnt:'',
        partner_lv:'',
        partner_type:'',
        category_id:'',
      };  
      
      obj.sale_team = this.saleteam_name;
      obj.sale_person = this.saleman_name;
      obj.saleteam_id = this.saleteam_id;
      obj.saleman_id = this.saleman_id;
      

        obj.isCheckBox = '0';
        if (contacts[i].name.formatted != null) {  
          obj.displayName = contacts[i].name.formatted; 
          // alert(contacts[i].name.formatted); 
        } else if (contacts[i].name.familyName != null) {  
          obj.displayName = contacts[i].name.familyName;  
        } else {  
          obj.displayName = contacts[i].name.givenName;  
        }  
        if (contacts[i].name != null && contacts[i].name.formatted != null) {  
          obj.displayName = contacts[i].name.formatted;  
        }  
        if (contacts[i].email != null)
        {
          obj.email = contacts[i].email[0].value;
        }
        if (contacts[i].organizations != null)
        {
          obj.companyName = contacts[i].organizations[0].name;
          obj.departmentName = contacts[i].organizations[0].title;
        }
        if (contacts[i].addresses != null)
        {
          obj.address = contacts[i].addresses[0].locality + contacts[i].addresses[0].streetAddress;
        }
      // }  
  
      //去掉名称3非汉字，英文的        
      let reg = /^[A-Za-z]+$/;  
      //名字为空或非字母，加到最后一组  
      obj.phoneNumber = contacts[i].phoneNumbers[0].value;  
      //有名字  
      // console.log('one contact==' + i + '  ' + JSON.stringify(obj));  
      obj.pinyinName = pinyin.getFullChars(obj.displayName);  
      // console.log('one contact getFullChars ' + i);  
  
      if (!reg.test(obj.pinyinName) || obj.displayName == '') {  
        // console.log('非正常联系人信息 名字不对==' + JSON.stringify(obj));  
  
        let len = this.formatContacts.length;  
        for (let j = 0; j < len; j++) {  
          // console.log("ffff");  
          if ((this.formatContacts[j] as any).key == 'Z') {  
            (this.formatContacts[j] as any).value.push(obj);  
            break;  
          }  
        }  
      } else {  
        //不排序，供搜索使用的数组  
        this.allSearchContacts.push(obj);  
        let camelChar = pinyin.getCamelChars(obj.displayName).substring(0, 1);  
        if (reg.test(camelChar)) {  
          let j = 0;  
          let len = this.formatContacts.length;  
          for (j; j < len; j++) {  
            // console.log("ffff");  
            if ((this.formatContacts[j] as any).key.toUpperCase() == camelChar.toUpperCase()) {  
              (this.formatContacts[j] as any).value.push(obj);  
              break;  
            }  
          }  
          if (j == len) {  
            // console.log('新增key');  
            let arr = new Array();  
            arr.push(obj);  
            this.formatContacts[len] = {  
              key: camelChar,  
              value: arr  
            };  
          }  
        }  
      }  
      // console.log('obj format==' + JSON.stringify(obj));  
      obj = null;  
    }  
  
    this.formatContacts = this.sortContacts(this.formatContacts);  
    // context.loader.dismiss();  
    // alert(this.formatContacts);
   
    console.log('this.allSearchContacts==' + this.allSearchContacts.length);  
  
  }

  sortContacts(formatContacts) {  
    // let arr = [{ key: 'S', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'Z', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'N', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'D', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'B', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }  
    //   , { key: 'A', value: "[{displayName: 'hhh',phoneNumber: '1231414',pinyinName: 'hhh'}]" }];  
  
    //首字母排序  
    formatContacts.sort(function (a, b) {  
      if (a.key.toUpperCase() < b.key.toUpperCase()) {  
        return -1;  
      } else if (a.key.toUpperCase() > b.key.toUpperCase()) {  
        return 1;  
      } else {  
        return 0;  
      }  
    });  
  
    //每组内部排序  
    for (let i = 0; i < formatContacts.length; i++) {  
      formatContacts[i].value.sort(function (a, b) {  
        if (a.key.toUpperCase() < b.key.toUpperCase()) {  
          return -1;  
        } else if (a.key.toUpperCase() > b.key.toUpperCase()) {  
          return 1;  
        } else {  
          return 0;  
        }  
      });  
    }  
    return formatContacts;  
  
  } 

  

}
