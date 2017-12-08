import { ShareknowledgeService } from './shareknowledgeService';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams ,ToastController} from 'ionic-angular';
import { Utils } from './../../../providers/Utils';
import { ShareAutoService } from './share-service'

/**
 * Generated class for the ShareKnowledgePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-share-knowledge',
  templateUrl: 'share-knowledge.html',
  providers: [ShareknowledgeService,ShareAutoService],
})
export class ShareKnowledgePage {
  pet : String = "1";
  limit;
  offset;
  type: any;
  hotBlogList: any;
  allBlogList: any;
  columBlogList: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public shareknowledgeService: ShareknowledgeService,public toastCtrl:ToastController
  ,public shareAutoService: ShareAutoService) {
    this.shareknowledgeService.getblogList("hot",20,0).then((res) =>{
          this.hotBlogList = res.result.res_data
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShareKnowledgePage');
  }

  ionViewDidEnter() {
    console.log(this.navParams)

  }

  itemSelected0(event){
    let type;
    let search_text;
    if (event.id == 1) {
      type = "name";
      search_text = event.name.replace("搜 标题:", "")
    }
    else if (event.id == 2) {
      type = "content";
      search_text = event.name.replace("搜 正文:", "")
    } 
    else if (event.id == 3) {
      type = "create_uid";
      search_text = event.name.replace("搜 发布人:", "")
    }
    console.log(search_text);
    this.shareknowledgeService.getSearchList(type, search_text).then((res) =>{
      console.log(res);
      if(res.result.res_data!=null && res.result.res_code==1){
        if(res.result.res_data.length>0){
          this.navCtrl.push('ShareknowlelistPage', {
            item: res.result.res_data,  
            tag_name: '搜索',
          })
        }
      }
})
  }
  changeDate(date) {
    let new_date = new Date(date.replace(' ', 'T') + 'Z').getTime();
    return new_date;
  }
  
  clickHot(){
    this.shareknowledgeService.getblogList("hot",20,0).then((res) =>{
      this.hotBlogList = res.result.res_data
})
  }

  clickAll(){
    this.shareknowledgeService.getblogList("all",20,0).then((res) =>{
      this.allBlogList = res.result.res_data
    })
  }

  clickColum(){
    this.shareknowledgeService.getblogCloum().then((res) =>{
      console.log(res)
      this.columBlogList = res.result.res_data
    })
  }

  getblogDetail(item){
    this.navCtrl.push('ShareknowledgedetailPage', {
      item: item,
    })
  }
  
  getblogDetailFrom(tag_ids){
    if(!tag_ids.tag_id){
      Utils.toastButtom("分类下暂无文章", this.toastCtrl)
    }else{
      this.shareknowledgeService.getblogDetailFrom(tag_ids.tag_id)
      .then((res) =>{
          this.navCtrl.push('ShareknowlelistPage', {
            item: res.result.res_data,
            tag_name: tag_ids.tag_name,
          })
      })
    }
  }

  getblogDetailfirst(tag_ids){
      if(!tag_ids.id){
        Utils.toastButtom("分类下暂无文章", this.toastCtrl)
      }else{
        this.shareknowledgeService.getblogDetailfirst(tag_ids.id)
        .then((res) =>{
            this.navCtrl.push('ShareknowlelistPage', {
              item: res.result.res_data,
              tag_name: tag_ids.name
            })
        })
      } 
  }

  doRefresh(refresh){
    if(this.pet == "1"){
      this.shareknowledgeService.getblogList("hot",20,0).then((res) =>{
        refresh.complete();
        this.hotBlogList = res.result.res_data
  })
    }else if(this.pet == "2"){
      this.shareknowledgeService.getblogList("all",20,0).then((res) =>{
        refresh.complete();
        this.allBlogList = res.result.res_data
      })
    }else if(this.pet == "3"){
      this.shareknowledgeService.getblogCloum().then((res) =>{
        console.log(res)
        refresh.complete();
        this.columBlogList = res.result.res_data
      })
    }
  }
}
