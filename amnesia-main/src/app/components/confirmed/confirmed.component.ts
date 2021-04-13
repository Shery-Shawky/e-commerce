import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css']
})
export class ConfirmedComponent implements OnInit {

  constructor(private router:Router) { }

  goHome(){
    this.router.navigate(['/']);
  }

  ngOnInit(): void {
  }

}
