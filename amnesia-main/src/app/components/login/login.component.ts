import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, Validator, ValidatorFn } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  constructor(private _auth: AuthService, private _router: Router, private fb: FormBuilder) { }
  myForm = new FormGroup({ 
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{1}[a-zA-Z0-9.\-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{3,}$")]),
    password: new FormControl('', [Validators.required])
  })

  ngOnInit(): void {
  }
  loginUserData 
  isvalidEmail:any;
  isvalidPassword:any;

  errMsg:any;
  loginUser(){
    this.loginUserData ={
      "email": this.myForm.value.email,
      "password": this.myForm.value.password
    }
    console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        this.isvalidEmail = true;
        this.isvalidPassword = true;
        localStorage.setItem('token',res.token)
        this._router.navigate(['/profile'])
      },
      //err => console.log(err)
      err=>{
        console.log(err.error);
        if(err.error.confirmed === "no"){
           this.errMsg ="please check confirmation for your email"
        }
        else if(err.error.success == false){
          this.errMsg ="invalid email or password"
        }
      }
    )
  }

  onChange(){
    this.isvalidEmail= !this.isvalidEmail;
    this.isvalidPassword = !this.isvalidPassword;
    this.isvalidEmail = (this.myForm.controls.email.errors != null&& this.myForm.touched)? false:true;
    this.isvalidPassword = (this.myForm.controls.password.errors != null&& this.myForm.touched)? false:true;
    
  }
}
