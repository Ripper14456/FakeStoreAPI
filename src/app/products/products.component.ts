import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent {
  constructor(private http: HttpClient) {}
  products: any = [];
  categories: any = [];
  sortDesc: boolean = false;
  sortAsc: boolean = true;
  ngOnInit() {
    this.getData();
    this.getCategories();
  }

  getData() {
    this.http.get<Object[]>('https://fakestoreapi.com/products').subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SortDesc() {
    this.http.get<Object[]>('https://fakestoreapi.com/products?sort=desc').subscribe(
      (data) => {
        console.log(data);
        this.sortDesc = true;
        this.sortAsc = false;
        this.products = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SortAsc() {
    this.http.get<Object[]>('https://fakestoreapi.com/products?sort=asc').subscribe(
      (data) => {
        console.log(data);
        this.sortAsc = true;
        this.sortDesc = false;
        this.products = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getCategories()
  {
    this.http.get<Object[]>('https://fakestoreapi.com/products/categories').subscribe(
      (data) => {
        this.categories = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  SelectCategory(Category: string)
  {
    this.http.get<Object[]>('https://fakestoreapi.com/products/category/' + Category).subscribe(
      (data) => {
        this.products = data;
        console.log(this.categories);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
