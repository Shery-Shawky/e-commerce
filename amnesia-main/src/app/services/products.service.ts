import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // ctor
  addToHeart = new Subject<number>();
  addToCart = new Subject();
  deleteProduct= new Subject();
  resetCart = new Subject();


  constructor(private myClient: HttpClient) {}

  /*local storage*/
  token = localStorage.getItem('token') || "";

  localStorageToken = (token) => {
    localStorage.setItem('token', token)
    return localStorage.getItem('token');
  }

  private baseURL: string = "https://amnesia-skincare.herokuapp.com/api"

  /*diplay product by id*/
  displayProductById(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.get(`${this.baseURL}/products/${id}`, httpOptions);
  }
  /* addToFav */
  addToFav(id) {
    // console.log(this.token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.post("https://amnesia-skincare.herokuapp.com/api/products/favorites/" + id, {}, httpOptions);
  }
  /*delete product from favourite*/
  deleteProductFromFavourite(id) {
    // console.log(id)
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.token
      })
    };
    return this.myClient.delete(`${this.baseURL}/products/favorites/${id}`, httpOptions);
  }
  /*subtractToFav*/
  subtractToFav(id) {
    return this.myClient.delete("https://amnesia-skincare.herokuapp.com/api/products/favorites/" + id);
  }
}