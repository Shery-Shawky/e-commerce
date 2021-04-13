import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactUs } from 'src/app/_data/models/contactus.model';
import { ContactUsService } from '../../services/contactus.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  constructor(
    private contactUsService: ContactUsService,
    private router: Router
    ) { }


 
  options: any = {};

  contactUs: ContactUs = {};

  ngOnInit(): void {
    this.options = {
      center: { lat: 36.890257, lng: 30.707417 },
      zoom: 12
    };
  }

  isvalidFName:any;



  submitContactForm() {
    this.contactUsService.sendContactUsInfo(this.contactUs).subscribe(
      (response) => {
        this.router.navigate(['message/sent']);
        console.log("suceess");
        console.log("route to sent");
      },
      (error) => {
        console.log({error});
      }
    )
  }
}
