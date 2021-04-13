import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service'
import { ImageService } from '../../services/image.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private myService: UsersService) { }

   /*var*/
   user
   subscriber
   userimg
   userFn
   userLn
   /*get user profile*/
  showProfile() {
    this.subscriber = this.myService.getProfile()
      .subscribe((userr) => {
        console.log(userr);
        this.user = userr;
        this.userFn=this.user.user.firstname
        this.userLn=this.user.user.lastname
        this.userimg=`https://amnesia-skincare.herokuapp.com/api/images/show/${this.user.user.profileImage}` || "http://nwsid.net/wp-content/uploads/2015/05/dummy-profile-pic.png"
        // this.profImage = `https://amnesia-skincare.herokuapp.com/api/images/show/${this.user.user.profileImage}` || "http://nwsid.net/wp-content/uploads/2015/05/dummy-profile-pic.png"
      },
        (error) => {
          console.log(error);
        }
      )
  }


  /* on init */
  ngOnInit(): void {
    this.showProfile()
  }

  /* tabs nav */
  tab: any = 'tab1';
  tab1: any
  tab2: any
  tab3: any
  Clicked: boolean

  htmlToAdd

  onClick(check) {
    //    console.log(check);
    if (check == 1) {
      this.tab = 'tab1';
      document.getElementById("profile-edit").style.display="block";
      document.getElementById("profile-orders").style.display="none";
      document.getElementById("profile-order-details").style.display="none";
    } else if (check == 2) {
      this.tab = 'tab2';
      document.getElementById("profile-edit").style.display="none";
      document.getElementById("profile-orders").style.display="block";
      document.getElementById("profile-order-details").style.display="none";
    } else {
      this.tab = 'tab3';
      document.getElementById("profile-edit").style.display="none";
      document.getElementById("profile-orders").style.display="none";
      document.getElementById("profile-order-details").style.display="none";
    }
  }
}
