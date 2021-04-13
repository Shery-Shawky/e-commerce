import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-confirm-register',
  templateUrl: './confirm-register.component.html',
  styleUrls: ['./confirm-register.component.css']
})
export class ConfirmRegisterComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }
  homepage(){
    this._router.navigate(['/'])
  }
}
