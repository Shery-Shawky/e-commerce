import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(private myClient: HttpClient) { }

  token = localStorage.getItem('token') || "";

  private baseURL: string = "https://amnesia-skincare.herokuapp.com/api"

  //get profile image
  getProfileImage(imgname) {
    console.log(imgname)
    return this.myClient.get(`${this.baseURL}/images/show/${imgname}`, { responseType: 'blob' });
  }


  //patch edit profile image
  editUserImg(image: File):Observable<any>{
    // debugger;
    let formData = new FormData();
    console.log(image)
    formData.append('image', image,image.name);
    console.log(formData.get('image'));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.token
      })
    }
    return this.myClient.post(`${this.baseURL}/images/user/`, formData, httpOptions);
  }
}
