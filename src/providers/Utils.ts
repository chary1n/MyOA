import { NavController, ViewController, ToastController } from 'ionic-angular';
import { Injectable } from '@angular/core';
@Injectable()
export class Utils {


    public static getViewController(pageName: string, navController: NavController): ViewController {
        for (let viewController of navController.getViews()) {
            if (viewController.name == pageName) {
                return viewController
            }
        }
        return null;
    }

    public static  toastButtom(toastString :string ,toastCtrl:ToastController ){
        let toast = toastCtrl.create({
            message: toastString,
            duration: 1000,
            position: 'buttom'
          });
          toast.onDidDismiss(() => {
            console.log('Dismissed toast');
          });
        
          toast.present();
    }




}