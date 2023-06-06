import { Component } from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.checkToken();
      }
    });
  }
  auth: boolean = false;

  checkToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.auth = true;
    }
  }

  isHomeClicked: boolean = true;
  isProductsClicked: boolean = false;
  isLoginClicked: boolean = false;
  isProfileClicked: boolean = false;

  toggleHomeClicked() {
    this.isHomeClicked = !this.isHomeClicked;
    this.isProductsClicked = false;
    this.isLoginClicked = false;
    this.isProfileClicked = false;
  }

  toggleProductsClicked() {
    this.isProductsClicked = !this.isProductsClicked;
    this.isHomeClicked = false;
    this.isLoginClicked = false;
    this.isProfileClicked = false;
  }

  toggleLoginClicked() {
    this.isLoginClicked = !this.isLoginClicked;
    this.isProductsClicked = false;
    this.isHomeClicked = false;
    this.isProfileClicked = false;
  }

  toggleProfileClicked() {
    this.isProfileClicked = !this.isProfileClicked;
    this.isProductsClicked = false;
    this.isHomeClicked = false;
    this.isLoginClicked = false;
  }

  logout()
  {
    localStorage.clear();
  }
}
