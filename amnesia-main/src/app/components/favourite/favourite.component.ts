import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from 'src/app/services/users.service';
import { ProductsService } from 'src/app/services/products.service';


@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.css']
})
export class FavouriteComponent implements OnInit {

  constructor(
    private userService: UsersService,
    private productsService: ProductsService,
    private myActivatedRoute: ActivatedRoute,
    private router: Router,
    private myService: ProductsService
    ) { }
  /*var*/
  subscriber
  user
  productImgoArr=[]
  
  /*get profile info*/
  getProfileFavourite() {
    console.log(this.user)
    this.subscriber = this.userService.getProfile()
      .subscribe((user) => {
        this.user = Object.values(user)[0].favoriteProducts;
        console.log(this.user.length)
        if(this.user.length==0){
          this.router.navigate(['/favouriteEmpty']);
        }
      },
        (error) => {
          console.log(error);
        }
      )
  }
  /*delete product from cart*/
  deleteProduct(index, id) {
    ///
    // this.myService.subtractToFav(id).subscribe(

    //   () => {
    //     let index = this.ids.indexOf(id);
    //     if (index != -1) {//if id exist in array
    //       this.ids.splice(index, 1);
    //     }
    //     console.log('subtract');
    //     this.myService.addToHeart.next(-1);
    //   },
    //   //handle error 
    //   (error) => {
    //     console.log(error);
    //   },
    // ) 
    ///
    console.log(id)
    this.subscriber = this.productsService.deleteProductFromFavourite(id)
    .subscribe((product) => {
      console.log(product);
      this.myService.addToHeart.next(-1);
      document.getElementsByTagName("tr")[parseInt(index) + 1].style.display = "none";
    },
      (error) => {
        console.log(error);
      }
    )
  }

  ngOnInit(): void {
    this.getProfileFavourite()
  }

}
