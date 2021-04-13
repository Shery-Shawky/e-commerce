import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pw-changed-successfully',
  templateUrl: './pw-changed-successfully.component.html',
  styleUrls: ['./pw-changed-successfully.component.css']
})
export class PwChangedSuccessfullyComponent implements OnInit {

  constructor(private router:Router) { }

  loginpage(){
    this.router.navigate(['/profile']);
  }

  ngOnInit(): void {
  }

}
