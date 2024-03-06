import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Point} from "../interfaces/point";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  sendPoint(point: Point) {
    return this.http.post("http://localhost:8080/Web-4-back-1.0-SNAPSHOT/app/main/addPoint", point);
  }

  getPoints(token: string) {
    let point: Point;
    point = {
      email: token,
      isHit: null,
      r: null,
      x: null,
      y: null
    };

    return this.http.post("http://localhost:8080/Web-4-back-1.0-SNAPSHOT/app/main/getPoints", point)
  }

  clearPoints(token: string){

    return this.http.delete("http://localhost:8080/Web-4-back-1.0-SNAPSHOT/app/main/clear",
      {
        body: {
          email: token,
        },
      })
  }
}
