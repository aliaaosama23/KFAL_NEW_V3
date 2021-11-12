import { Component } from '@angular/core';

/**
 * Generated class for the NoDataMessageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'no-data-message',
  templateUrl: 'no-data-message.html'
})
export class NoDataMessageComponent {

  text: string;

  constructor() {
    console.log('Hello NoDataMessageComponent Component');
    this.text = 'Hello World';
  }

}
