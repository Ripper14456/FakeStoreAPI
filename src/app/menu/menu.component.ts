import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateActiveMenu(event.url);
        this.checkToken();
      }
    });
  }



  auth: boolean = false;
  activeMenu: string = '';

  checkToken() {
    const token = localStorage.getItem('token');
    this.auth = !!token;
  }

  updateActiveMenu(url: string) {
    this.activeMenu = url;
  }

  isActiveMenu(menuItem: string): boolean {
    return this.activeMenu === menuItem;
  }

  toggleMenu(menuItem: string) {
    this.activeMenu = menuItem;
  }

  logout() {
    localStorage.clear();
  }
}
