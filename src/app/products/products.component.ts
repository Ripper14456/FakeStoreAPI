import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})


export class ProductsComponent implements OnInit{

  constructor(private http: HttpClient) {}
  products: any = [];
  productsForCart: any = [];
  categories: any = [];
  sortDesc: boolean = false;
  sortAsc: boolean = true;
  cartBlock: boolean = false;
  cartOpen: boolean = false;
  cartCheck:boolean = false;
  ngOnInit() {
    this.getData();
    this.getCategories();
    this.CartCheck();
    this.getUserCarts();
    this.listenForOutsideClicks();
  }

  getData() {
    this.http.get<Object[]>('https://fakestoreapi.com/products').subscribe(
      (data) => {
        this.products = data;
        this.productsForCart = data;
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

  CartCheck() {
    if (localStorage.getItem("token") != null) {
      this.cartBlock = true;
    }
  }

  OpenCart()
  {
    this.cartOpen = true;
    this.cartCheck = false;
  }

  CloseCart()
  {
    this.cartOpen = false;
    this.cartCheck = true;
  }

  listenForOutsideClicks() {
    document.addEventListener('click', (event: any) => {
      const cartContainer = document.querySelector('.cart-modal');

      if(this.cartCheck && this.cartOpen)
      {
        if (cartContainer && !cartContainer.contains(event.target)) {
          this.CloseCart();
          this.cartCheck = false;
        }
      }
      else
      {
        this.cartCheck = true;
      }
    });
  }

  cart: any[] = [];

  private getUserCarts() {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = this.decodeToken(token);
      const userId = decodedToken.sub;
      console.log("user id = " + userId);

      this.http.get('https://fakestoreapi.com/carts/user/' + userId).subscribe(
        (data: any) => {
          const uniqueCartItems = [];

          for (const cartItem of data.flatMap((cart: any) => cart.products)) {
            const existingItemIndex = uniqueCartItems.findIndex(item => item.productId === cartItem.productId);

            if (existingItemIndex !== -1) {
              uniqueCartItems[existingItemIndex].quantity += cartItem.quantity;
            } else {
              uniqueCartItems.push(cartItem);
            }
          }

          this.cart = uniqueCartItems;
          console.log(this.cart);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  decodeToken(token: string) {
    const tokenParts = token.split('.');
    if (tokenParts.length === 3) {
      const payload = JSON.parse(atob(tokenParts[1]));
      return payload;
    }
    return null;
  }

  editCartItem(cartItem: any, index: number) {
    if (cartItem.quantity < 1) {
      this.cart.splice(index, 1);
    } else {
      this.cart[index].quantity = cartItem.quantity;
      console.log("Quantity has changed");
    }

    // Send updated cart item data to the API
    this.http.put('https://fakestoreapi.com/carts/7', this.cart).subscribe(
      (data) => {
        console.log('Cart item updated successfully:', data);
      },
      (error) => {
        console.log('Error updating cart item:', error);
      }
    );
  }

}
