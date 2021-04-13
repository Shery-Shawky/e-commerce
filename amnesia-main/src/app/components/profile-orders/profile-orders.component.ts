import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrdersService } from '../../services/orders.service'
import { shareReplay } from 'rxjs/operators';

/*material ui*/
// import {ThemePalette} from '@angular/material/core';
// import {ProgressSpinnerMode} from '@angular/material/progress-spinner';


/************/
@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css'],
})
export class ProfileOrdersComponent implements OnInit {

  constructor(private myService: OrdersService,
    private myActivated: ActivatedRoute,
    private router: Router) { }

  /*var*/
  orders
  subscriber
  totalPriceArr: Array<number> = []
  ordersId: Array<number> = []
  isFetching = false
  canCancel = false
  isError= false

  // showAllOrders
  showAllOrders() {
    // this.subscriber = this.myService.displayOrders().pipe(shareReplay({ bufferSize: 1, refCount: true }))
    this.isFetching = true
    this.isError= false
    this.subscriber = this.myService.displayOrders()
      .subscribe((orders) => {
        this.isFetching = false
        this.isError = false
        console.log(orders);
        // console.log(Object.values(orders)[0][0]._id) //order id
        const ordersArr = Object.values(orders)[0]
        this.orders = ordersArr
        console.log(this.orders) //array of orders

        for (let i = 0; i < this.orders.length; i++) {
          var total = 0;
          var quantity = 0;
          var price = 0;
          let day = new Date(this.orders[i].deliverAt.from).getDate()
          let month = new Date(this.orders[i].deliverAt.from).getMonth()
          let year = new Date(this.orders[i].deliverAt.from).getFullYear()
          let dayTo = new Date(this.orders[i].deliverAt.to).getDate()
          let monthTo = new Date(this.orders[i].deliverAt.to).getMonth()
          let yearTo = new Date(this.orders[i].deliverAt.to).getFullYear()
          this.orders[i].deliverAt.from = `${day} / ${month} / ${year}`
          this.orders[i].deliverAt.to = `${dayTo} / ${monthTo} / ${yearTo}`
          this.ordersId.push(Object.values(orders)[0][i]._id)
          for (let j = 0; j < this.orders[i].products.length; j++) {
            quantity = this.orders[i].products[j].quantity;
            price = this.orders[i].products[j].productId?.current_price || 0;
            total += quantity * price
          }
          this.totalPriceArr.push(total)
        }
        console.log(this.totalPriceArr)
        console.log(this.ordersId)
      },
        (error) => {
          console.log(error);
          this.isError = true
          this.isFetching=false
        }
      )
  }

  /* cancel Order*/
  cancelOrder(id){
    console.log(id);
    this.subscriber = this.myService.deleteOrderById(id)
    .subscribe((response:any)=>{
      console.log("deleted")
      this.orders=response.orders
    },
    (err)=>{
      console.log(err);
    })
  }

  orderDetails(id){
    console.log(id)
    this.subscriber = this.myService.displayOneOrder(id)
      .subscribe((orders) => {
        console.log(orders)
        this.router.navigate([`/profile/:${id}`])
      },
      (err)=>{
        console.log(err);
      })
  }

  ngOnInit(): void {
    this.showAllOrders()
  }

}
