import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { ProductService } from './../../services/product.service';
import {ProductsListComponent} from '../products-list/products-list.component'
import { Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  providers:[ProductsListComponent],
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }
  constructor(
    private productService: ProductService,
    private router: Router,
  ) {
    localStorage.setItem('cart',JSON.stringify([]));
   }

  
  shopnow() {
    this.router.navigate(['/productList']);
  }

  onscroll
  myScroll: any = document.getElementById("scrollUp");

  topFunction() {
    if (this.myScroll == 0) {
      document.documentElement.scrollTop = 0;
      this.myScroll.style.display = "none";
    }

  }

  /*getAllProducts*/
  isFetching=true
  productImage = []
  products: any = []
  getAllProducts() {
    this.isFetching = true
    this.productService.getProducts().subscribe(
      (products: any) => {
        this.isFetching = false
        let allProducts
        allProducts = Object.values(products)[0]
        for (let i = 0; i < allProducts.length; i++) {
          if (Object.values(products)[0][i].status == "Sale") {
            this.products.push(allProducts[i]);
            // this.productImage.push(`https://amnesia-skincare.herokuapp.com/api/images/show/${this.products[i].image}` || "http://nwsid.net/wp-content/uploads/2015/05/dummy-profile-pic.png")
          }
        }
      },
      err => {
        this.isFetching = true
        console.log(err)
      }
    )
  }

  /* product details by id */
  productDetails(_id){
    this.router.navigate(['/productInfo/' + _id])
  }

  ngOnInit(): void {
    this.getAllProducts()
  }
}
