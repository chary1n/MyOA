import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController, ViewController, Events,Slides } from 'ionic-angular';
import { NewProductionService} from './new-productionService'
import { NewProductionAutoService} from './new-production-auto'
declare var Swiper;
/**
 * Generated class for the NewProductionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-new-production',
  templateUrl: 'new-production.html',
  providers:[NewProductionService,NewProductionAutoService],
})
export class NewProductionPage {
  menus=[];
  swiper: any;
  items: Array<any> = [0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 1, 2, 3, 4, 5, 6, 7, 8];
  // categories :Array<string> = ["成品", "连爱物料", "原材料", "资产类","半成品"];
  selectedMenuTarget: any;
  chengpinArr=[];
  categories=[];
  @ViewChild('contentSlides') contentSlides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams,public newProductionService:NewProductionService,
  public newProductionAutoService:NewProductionAutoService) {
    this.newProductionService.search_product_category("若态物料",null).then(res_2 => {
      if (res_2.result && res_2.result.res_code == 1) {
        this.menus =res_2.result.res_data
        this.newProductionService.search_product_category(null,this.menus[0].id).then(res => {
          console.log(res)
          if (res.result && res.result.res_code == 1) {
            this.categories = res.result.res_data;
          //   this.newProductionService.search_product_category(null,this.categories[0].id).then(res_1 =>{
          //       if (res_1.result && res_1.result.res_code == 1) {
          //         this.chengpinArr = res_1.result.res_data;
          //       }
          // })
       }
    })
      }
    })
    
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewProductionPage');
    // this.initSwiper();
  }

  initSwiper() {
    this.swiper = new Swiper('.pageMenuSlides .swiper-container', {
      slidesPerView: 4,
      spaceBetween: 0,
      breakpoints: {
        1024: {
          slidesPerView:4,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 4,
          spaceBetween: 0
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 0
        },
        320: {
          slidesPerView: 4,
          spaceBetween: 0
        },
      }
    });
  }

  selectPageMenu($event, index) {
    this.setStyle(index);
    this.categories = [];
    this.chengpinArr = [];
    this.newProductionService.search_product_category(null,this.menus[index].id).then(res => {
       if (res.result && res.result.res_code == 1) {
            this.categories = res.result.res_data;
       }
    })
    // this.contentSlides.slideTo(index);
  }
  slideChanged() {
    // let index = this.contentSlides.getActiveIndex();
    // this.setStyle(index);
    // this.swiper.slideTo(index, 300);
  }

  setStyle(index) {
    var slides = document.getElementsByClassName('pageMenuSlides')[0].getElementsByClassName('swiper-slide');
    if (index < slides.length) {
      for (var i = 0; i < slides.length; i++) {
        var s = slides[i];
        s.className = "swiper-slide";
      }
      slides[index].className = "swiper-slide bottomLine";
    }
  }
  itemClick(item,event){
   var initSelected: any = document.getElementsByClassName('menuItem');
    if (initSelected[0].classList.contains("active")) {
      initSelected[0].classList.remove("active")
    }
    if (this.selectedMenuTarget) {
      this.selectedMenuTarget.classList.remove("active")
    }
    event.currentTarget.classList.add("active");
    this.selectedMenuTarget = event.currentTarget;

    console.log(item.id)
    if (item.child_id.length > 0)
    {
      this.getListByParent_id(item.id);
    }
    else
    {
      this.newProductionService.get_production_detail(item.id).then(res => {
        console.log(res)
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('NewProductListPage',{
            item:res.result.res_data,
          })
        }
      })
    }
    
  }
  doInfinite(infiniteScroll) {
    infiniteScroll.complete();
  }

  getListByParent_id(parent_id){
    this.newProductionService.search_product_category(null,parent_id).then(res => {
       if (res.result && res.result.res_code == 1) {
            this.chengpinArr = res.result.res_data;
       }
    })
  }

  chenpinItemClick(item){
    if (item.child_id.length > 0)
    {
      this.newProductionService.search_product_category(null,item.id).then(res => {
       if (res.result && res.result.res_code == 1) {
            this.navCtrl.push('MoreLevelListPage',{
              item:res.result.res_data,
              title:item.name,
            })
       }
    })
    }
    else
    {
      this.newProductionService.get_production_detail(item.id).then(res => {
        console.log(res)
        if (res.result && res.result.res_code == 1) {
          this.navCtrl.push('NewProductListPage',{
            item:res.result.res_data,
          })
        }
      })
    }
  }
  itemSelected(event){
    if (event.id == 1)
    {
       let search_text = event.name.replace("搜 产品名：", "")
       this.newProductionService.search_product("name",search_text).then(res => {
          if (res.result && res.result.res_code == 1) {
            this.navCtrl.push('NewProductListPage',{
              item:res.result.res_data,
            })
          }
       })
    }
    else
    {
       let search_text = event.name.replace("搜 料号：", "")
       this.newProductionService.search_product("default_code",search_text).then(res => {
          if (res.result && res.result.res_code == 1) {
            this.navCtrl.push('NewProductListPage',{
              item:res.result.res_data,
            })
          }
       })
    }
  }
}
