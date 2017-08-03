import { NavController, ViewController } from 'ionic-angular';
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
}