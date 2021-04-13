
import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector){}
  intercept(req, next) {
    let authService = this.injector.get(AuthService)
    let token =  authService.getToken() || "";
    let tokenizedReq = req.clone(
      {
        headers: req.headers.set('Authorization', 'bearer ' +token)
      }
    )
    return next.handle(tokenizedReq)
  }
}