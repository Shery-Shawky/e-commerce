import { Component, OnChanges, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { from } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators, Validator, ValidatorFn } from '@angular/forms';
import { AbstractControl } from '@angular/forms'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router, private fb: FormBuilder) { }
  myForm = new FormGroup({
    firstname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*"), Validators.maxLength(8)]),
    lastname: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z]*"), Validators.maxLength(8)]),
    email: new FormControl('', [Validators.required, Validators.pattern("^[a-zA-Z]{1}[a-zA-Z0-9.\-_]*@[a-zA-Z]{1}[a-zA-Z.-]*[a-zA-Z]{1}[.][a-zA-Z]{3,}$")]),
    gender: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(8),this.passwordCheck]),
    confirmpassword: new FormControl('', [Validators.required, this.passwordCheck]),
  })




  //{
  // validators:this.CustomValidation.passwordMatchValidator("password","confirmpassword")
  //}


  ngOnInit(): void {

    //.console.log(this.myForm)
    this.myForm.controls.password.valueChanges.subscribe(
      x => this.myForm.controls.confirmpassword.updateValueAndValidity()
    )
  }

  passwordCheck(control) {
    
    if (control != null) {
      
      let conpass = control.value;
      let pass = control.root.get('password');
      if (pass) {
        let password = pass.value;
        if (conpass !== "" && password !== "") {
          if (conpass !== password) {
            
            return { passwordValidity: true }
          } else {
            return null;
          }
        }
      }

    }
  }
  
  registerUserData
  errMsg = "";
  isvalidEmail:any;
  isvalidLName:any;
  isvalidFName:any;
  isvalidGender:any;
  isvalidPassword:any;
  isvalidCPassword:any;
  registerUser() {
   
    
    if (this.myForm.status != "INVALID") {
 
      this.registerUserData = {
        "firstname": this.myForm.value.firstname,
        "lastname": this.myForm.value.lastname,
        "gender": this.myForm.value.gender,
        "email": this.myForm.value.email,
        "password": this.myForm.value.password
      }
      console.log(this.registerUserData)
      this._auth.registerUser(this.registerUserData)

        .subscribe(
          res => {
            console.log(res)
            if (res.exists) {
              this.errMsg = res.message;
              console.log(this.errMsg,this)
              this.isvalidEmail = false
              
            }
            else {
              this.errMsg = "";
              this.isvalidEmail = true;
              this.isvalidLName = true;
              this.isvalidFName = true;
              this.isvalidGender =true;
              this.isvalidPassword = true;
              this.isvalidCPassword =true;
              this._router.navigate(['/confirmed'])
            }
          },
         
          err => console.log(err)
        )
      // console.log(this.registerUserData)
    }
  }
  onChange(){
    
    this.isvalidEmail= !this.isvalidEmail;
    this.isvalidLName = !this.isvalidLName;
    this.isvalidFName = !this.isvalidFName;
    this.isvalidPassword = !this.isvalidPassword;
    this.isvalidCPassword = !this.isvalidCPassword;
    console.log(this.myForm)
    this.isvalidEmail = (this.myForm.controls.email.errors != null&& this.myForm.touched)? false:true;
    this.isvalidLName = (this.myForm.controls.lastname.errors != null&& this.myForm.touched)? false:true;
    this.isvalidFName = (this.myForm.controls.firstname.errors != null&& this.myForm.touched)? false:true;
    this.isvalidGender = (this.myForm.controls.gender.errors != null&& this.myForm.touched)? false:true;  
    this.isvalidPassword = (this.myForm.controls.password.errors != null&& this.myForm.touched)? false:true;
    this.isvalidCPassword= (this.myForm.controls.confirmpassword.errors != null&& this.myForm.touched)? false:true;
    
  }
}
