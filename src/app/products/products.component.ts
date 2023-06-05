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

  ngOnInit() {
    this.getData();
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

  Sort()
  {
    this.http.get<Object[]>('https://fakestoreapi.com/products?sort=desc').subscribe(
      (data) => {
        this.products = data;
        console.log(this.products);
      },
      (error) => {
        console.log(error);
      }
    );
  }

}
