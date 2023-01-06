import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class IlanService {

  private url = "http://localhost:3000"

  constructor(private http:HttpClient) { }

  getDurum() {
    return this.http.get<any[]>(this.url + "/states")
  }

  getCategory() {
    return this.http.get<any[]>(this.url + "/categories")
  }

  getModel(data:any) {
    return this.http.get<any[]>(this.url + "/categories")
  }

  getColor() {
    return this.http.get<any[]>(this.url + "/colors")
  }

  getYear() {
    return this.http.get<any[]>(this.url + "/years")
  }


  advert(state: string,
         category: string,
         model: string,
         year: string,
         color: string,
         description: string,
         km: string,
         engine_power: string,
         engine_volume: string,
         imageUrl: string,
         price: string,
         firstName: string,
         lastName: string,
         userName: string,
         email: string,
         telephoneNo: string,
         cityName: string
         )
  {
    return this.http.post<any[]>(this.url + "/cars",
      {
        state: state,
        category: category,
        model: model,
        year: year,
        color: color,
        description: description,
        km: km,
        engine_power: engine_power,
        engine_volume: engine_volume,
        imageUrl: imageUrl,
        price: price,
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        telephoneNo: telephoneNo,
        cityName: cityName
      })
  }
}
