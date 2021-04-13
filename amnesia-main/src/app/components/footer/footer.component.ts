import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
  }
  navigateTo(url){
    console.log(url);
    if(url == 'about'){
      url = '#aboutUs'
    }
    console.log(url);
    this.router.navigate([url])
  }

}
