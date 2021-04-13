import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../services/users.service'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  // var
  token
  user
  subscriber
  msg

  /*validation on editing*/
  myForm = new FormGroup({
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required, Validators.minLength(8)]),
  })

  constructor(
    private myActivated:ActivatedRoute,
    private myService: UsersService,
    private router:Router
    ) {
      this.myService.getProfile();
     }

  confirmpw() {
    console.log(this.myForm.controls)
    if (this.myForm.valid && this.myForm.value.password === this.myForm.value.confirmPassword) {
      console.log("valid")
      const userpw = {
        "password": this.myForm.value.password,
      }
      this.token = this.myActivated.snapshot.paramMap.get('usertoken') || "no token";
      console.log(this.token)
      const tokencrpw= this.token
      // console.log(tokencrpw)
      const userpwJson = JSON.stringify(userpw)
      this.subscriber = this.myService.crnPassword(userpwJson,tokencrpw)
      .subscribe((userpwJson:any) => {
        console.log(userpwJson);
        this.msg="Password has been changed successfully"
        this.router.navigate(['/pwChangedSucc']);

      },
        (error) => {
          console.log(error);
          this.router
          this.msg="Something Went Wrong"
        }
      )

    }
    else {
      console.log("invalid")
    }
  }

  ngOnInit(): void {
    console.log(this.myActivated.snapshot.params.token);
    this.token = this.myActivated.snapshot.params.token;
    localStorage.setItem('token',this.myActivated.snapshot.paramMap.get('usertoken'))
    // this.token
  }

}
