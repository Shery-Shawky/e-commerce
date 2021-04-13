
import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http'
import { ActivatedRoute, Router } from '@angular/router'
import { UsersService } from './users.service';


@Injectable()
export class AuthService {

  private _registerUrl = "https://amnesia-skincare.herokuapp.com/api/users/register"
  private _loginUrl = "https://amnesia-skincare.herokuapp.com/api/users/login"

  constructor(
    private http: HttpClient,
    private _router: Router,
    private userService: UsersService,
    private route: ActivatedRoute
    ) { }


  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    // console.log(user)
    return this.http.post<any>(this._loginUrl, user)
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/'])
  }

  getToken() {
    let token = localStorage.getItem('token') || "";
    return token 
  }

  loggedIn() {

    return !!localStorage.getItem('token')    
  }
}