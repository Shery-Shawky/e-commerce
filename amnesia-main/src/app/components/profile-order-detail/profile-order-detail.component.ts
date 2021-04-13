import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../services/orders.service'


@Component({
  selector: 'app-profile-order-detail',
  templateUrl: './profile-order-detail.component.html',
  styleUrls: ['./profile-order-detail.component.css']
})
export class ProfileOrderDetailComponent implements OnInit {

  constructor(private myActivated: ActivatedRoute, private myService: OrdersService) { }

  /*var*/
  order
  subscriber
  namesArr: Array<string> = []
  quantityArr: Array<number> = []
  currPriceArr: Array<number> = []
  oldPriceArr: Array<number> = []
  totalOldPriceArr = 0
  totalCurrPriceArr = 0
  payment
  isFetching = false

  /* order details*/
  orderDetails() {
    this.isFetching = true
    console.log(this.myActivated.snapshot.params.id)
    this.subscriber = this.myService.displayOneOrder(this.myActivated.snapshot.params.id)
      .subscribe((order) => {
        this.isFetching = false
        console.log(order)
        this.order = order
        this.payment = this.order.order.paymentMethod
        for (let i = 0; i < this.order.order.products.length; i++) {
          this.namesArr.push(this.order.order.products[i].productId?.name || "N/A")
          this.quantityArr.push(this.order.order.products[i].quantity)
          this.currPriceArr.push(this.order.order.products[i].productId?.current_price || 0)
          this.oldPriceArr.push(this.order.order.products[i].productId?.old_price || 0)
          this.totalCurrPriceArr += (this.order.order.products[i].productId?.current_price || 0) * this.order.order.products[i].quantity
        }
      },
        (error) => {
          console.log(error)
        }
      )
  }

  /* oninit */
  ngOnInit(): void {
    this.orderDetails()
  }

}
