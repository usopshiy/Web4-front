import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  registerUser(userDetails: User) {
    return this.http.post("http://localhost:8080/Web-4-back-1.0-SNAPSHOT/app/reg", userDetails);
  }
  loginUser(userDetails: User){
    return this.http.post("http://localhost:8080/Web-4-back-1.0-SNAPSHOT/app/login", userDetails);
  }
}
