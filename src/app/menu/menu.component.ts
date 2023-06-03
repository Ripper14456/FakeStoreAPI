import { Component } from '@angular/core';
import {Observable} from "rxjs";



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isHomeClicked: boolean = true;
  isProductsClicked: boolean = false;
  isContactClicked: boolean = false;

  toggleHomeClicked() {
    this.isHomeClicked = !this.isHomeClicked;
    this.isProductsClicked = false;
    this.isContactClicked = false;
  }

  toggleProductsClicked() {
    this.isProductsClicked = !this.isProductsClicked;
    this.isHomeClicked = false;
    this.isContactClicked = false;
  }

  toggleContactClicked() {
    this.isContactClicked = !this.isContactClicked;
    this.isProductsClicked = false;
    this.isHomeClicked = false;
  }

}
