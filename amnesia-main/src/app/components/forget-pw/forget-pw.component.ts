import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, Validator, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import {UsersService} from '../../services/users.service'

@Component({
  selector: 'app-forget-pw',
  templateUrl: './forget-pw.component.html',
  styleUrls: ['./forget-pw.component.css']
})
export class ForgetPwComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private userService: UsersService,
    private router:Router
    ) { }
  /*var*/
  isvalidEmail
  subscriber
  emailObj
  alerterr

  /*FormGroup*/
  myForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{1}[a-zA-Z0-9.\-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{3,}$")]),
    password: new FormControl('', [Validators.required])
  })

  /*onChange validation*/
  onChange() {
    this.isvalidEmail = !this.isvalidEmail;
  }

  /*sendEmail*/
  sendEmail(email) {
    this.emailObj ={
      "email": this.myForm.value.email,
    }
    this.subscriber = this.userService.forgetPassword(this.emailObj).subscribe(
      (email)=>{
        console.log(email)
        console.log(this)
        this.router.navigate(['/confirmEmail']);
      },
      (err)=>{
        console.log(err)
        this.alerterr="Sorry, Email Not Exist!"
      }
    )
  }

  /*oninit*/
  ngOnInit(): void {
  }

}
