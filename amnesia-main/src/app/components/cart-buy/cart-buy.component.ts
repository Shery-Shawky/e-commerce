import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service'
import { OrdersService } from '../../services/orders.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-cart-buy',
  templateUrl: './cart-buy.component.html',
  styleUrls: ['./cart-buy.component.css']
})
export class CartBuyComponent implements OnInit, OnDestroy {

  constructor(
    private myService: UsersService,
    private myServiceOrder: OrdersService,
    private myActivatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router
    ) { }

  /*services*/
  user
  subscriber
  mycart:any = localStorage.getItem('cart') || []
  mycartObj = JSON.parse(this.mycart)
  order = []

  //retrieve from local storage
  localStorageProductsRetrive:any = localStorage.getItem('cart') || [];

  /*validation on editing*/
  myForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*"), Validators.maxLength(8)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*"), Validators.maxLength(8)]),
    phone: new FormControl('', [Validators.required, Validators.pattern("[0-9]*")]),
    country: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*")]),
    city: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*")]),
    street: new FormControl('', [Validators.required]),
    note: new FormControl('', [Validators.required]),
    payment: new FormControl('', [Validators.required])
  })

  /*save changes*/
  buy() {
    
    let token = localStorage.getItem('token') || 'empty token';
    this.myService.getProfile().subscribe(
      (user: any) => {
        console.log(user)
        //start buy
        if (this.myForm.valid) {
          console.log("valid")
          console.log(this.myForm.value)
          const orderinfo = {
            "products": JSON.parse(localStorage.getItem('order')),
            "note": this.myForm.value.note,
            "address": [`${this.myForm.value.country}`, `${this.myForm.value.city}`, `${this.myForm.value.street}`].join(', '),
          }
          const orderinfoJson = JSON.stringify(orderinfo)
          this.subscriber = this.myServiceOrder.addOrder(orderinfoJson)
            .subscribe((orderinfoJson) => {
              this.productsService.resetCart.next();
              console.log(orderinfoJson);
              localStorage.setItem('cart',JSON.stringify([]));
              // document.getElementsByTagName('form')[0].style.display = 'none';
              document.getElementById('formBuy').style.display='none'
              document.getElementById('orderSuccess').style.display = 'flex';

            },
              (error) => {
                console.log(error);
              }
            )
        }
        else {
          console.log("invalid")
        }
        // end buy
      },
      (err) => {
        console.log(err)
        this.router.navigate(['/login'])
      }
    )
  }

  /*get user by id*/
  showProfile() {
    this.localStorageBuy()
    this.subscriber = this.myService.getProfile()
      .subscribe((userr) => {
        console.log(userr);
        this.user = userr;
        this.myForm.patchValue({
          firstname: this.user.user.firstname,
          lastname: this.user.user.lastname,
          // phone: this.user.user.phones,
          // country: this.user.user.addresses.split(', ')[0],
          // city: this.user.user.addresses.split(', ')[1],
          // street: this.user.user.addresses.split(', ')[2]
        })
      },
        (error) => {
          console.log(error);
        }
      )
  }

  /* local strorage */
  localStorageBuy() {
    console.log(this.mycartObj)
    for (let i = 0; i < this.mycartObj.length; i++) {
      this.order.push({ productId: this.mycartObj[i].productId, quantity: this.mycartObj[i].quantity })
      localStorage.setItem('order', JSON.stringify(this.order))
    }
  }


  ngOnInit(): void {
    this.showProfile()
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}