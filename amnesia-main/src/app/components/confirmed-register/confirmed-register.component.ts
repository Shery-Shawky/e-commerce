import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmed-register',
  templateUrl: './confirmed-register.component.html',
  styleUrls: ['./confirmed-register.component.css']
})
export class ConfirmedRegisterComponent implements OnInit {

  constructor(private router:Router) { }

  goHome(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
