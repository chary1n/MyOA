import { Component } from '@angular/core';

/**
 * Generated class for the CustomerStarComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'customer-star',
  templateUrl: 'customer-star.html'
})
export class CustomerStarComponent {

  text: string;

  constructor() {
    console.log('Hello CustomerStarComponent Component');
    this.text = 'Hello World';
  }

}
