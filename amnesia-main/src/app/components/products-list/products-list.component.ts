import { ProductService } from './../../services/product.service';
import { identifierModuleUrl } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  /*var*/
  isChecked: boolean = false;
  searchigValue: string = '';
  panelOpenState = false;
  productCount: number;
  noOfPages: number;
  arrnoOfPages: number[] = [];
  allData: any[] = [];
  obj: any[] = [];
  loading: boolean = true;
  appear: boolean = false;
  skipGlobal;
  limitGlobal;
  noOfProducts = 0;
  allFavorites = [];
  currentPagination = 1;
  pname = '';
  /*ctor*/
  constructor(
    private productService: ProductService,
    private userService: UsersService
  ) {}

  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }

  slider(event) {
    if (event.value == 0) {
      this.getData(this.pname, 0, 15);
      return;
    }
    this.obj = this.allData.filter((product) => {
      return Number(product.current_price) <= Number(event.value);
    });
  }

  getData(pname, skip, take) {
    this.loading = true;
    this.appear = false;
    this.skipGlobal = skip;
    this.productService.getAllProductsApi(pname, skip, take).subscribe(
      (response: any) => {
        this.loading = false;
        this.appear = true;
        this.allData = response.products;
        this.userService.getProfile().subscribe(
          (res: any) => {
            this.allFavorites = res.user.favoriteProducts.map(
              (item) => item._id
            );
            this.allData.map((item, index) => {
              if (this.allFavorites.includes(item._id)) {
                this.allData[index].isFavorite = true;
              }
              this.obj = this.allData;
            });
          },
          (err) => {
            this.obj = this.allData;
            console.log(err);
          }
        );
        this.arrnoOfPages = [];
        this.noOfProducts = response.length;
        this.noOfPages = Math.ceil(response.length / 15);
        for (let i = 1; i <= this.noOfPages; i++) {
          this.arrnoOfPages.push(i);
        }
      },
      (error) => {
        this.loading = false;
        console.log(error);
      }
    );
  }

  searchForName() {
    console.log(this.pname);
    setTimeout(() => {
      console.log('searching');
      this.getData(this.pname, 0, 15);
    }, 500);
  }

  paginate(val) {
    this.currentPagination = val;
    this.getData(this.pname, val * 15 - 15, val * 15);
    this.skipGlobal = val * 15 - 15;
  }

  nextPag() {
    if (this.currentPagination < this.arrnoOfPages.length) {
      this.currentPagination += 1;
      this.paginate(this.currentPagination);
    }
  }
  prevPag() {
    if (this.currentPagination > 1) {
      this.currentPagination -= 1;
      this.paginate(this.currentPagination);
    }
  }

  changeSale() {
    if (this.isChecked == true) {
      this.obj = this.allData.filter((product) => {
        return product.status == 'Sale';
      });
    } else {
      this.obj = this.allData.filter((product) => {
        return product;
      });
    }
  }

  ngOnInit(): void {
    this.paginate(1);
    console.log(this.obj);
  }
}
