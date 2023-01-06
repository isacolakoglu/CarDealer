import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {delay, map, Observable, tap} from "rxjs";
import {AracModel} from "../models/arac.model";
import {UserService} from "./user.service";
import {Kategori} from "../models/kategori";

@Injectable({
  providedIn: 'root'
})
export class AracService {

  private url = "http://localhost:3000";
  private allCars:any

  constructor(private http: HttpClient) {
  }

  //TÜM ARAÇLARIN SERVİSİ

  getAllCars(): Observable<AracModel[]> {
    return this.http.get<AracModel[]>(this.url + "/cars")
  }


  //stateId olarak "SATILIK, KİRALIK, TALEP" ARAÇLARIN SERVİSİ
  getCarsById(stateId?: any): Observable<AracModel[]> {
    return this.http.get<AracModel[]>(this.url + "/cars?stateId=" + stateId)
  }

  //stateName olarak "SATILIK, KİRALIK, TALEP" ARAÇLARIN SERVİSİ
  getCarsByStateName(stateName?: any): Observable<AracModel[]> {
    return this.http.get<AracModel[]>(this.url + "/cars?state=" + stateName)
  }


  //categoryId olarak "Audi=0, Mercedes=1,Bmw=2, Skoda=3" ARAÇLARIN SERVİSİ
  getCarsByCategoryId(categoryId?: any): Observable<AracModel[]> {
    return this.http.get<AracModel[]>(this.url + "/cars?categoryId=" + categoryId)
  }

  //categoryName olarak "Audi, Mercedes, Bmw, Skoda" ARAÇLARIN SERVİSİ
  getCarsByCategoryName(categoryName?: any): Observable<AracModel[]> {
    return this.http.get<AracModel[]>(this.url + "/cars?category=" + categoryName)
  }

  getCarsByModelName(carModel?: any): Observable<AracModel[]>{
    return this.http.get<AracModel[]>(this.url + "/cars?model=" + carModel)
  }

  getCarsDetayId(id: any): Observable<AracModel[]>{
    return this.http.get<AracModel[]>(this.url + "/cars?id=" + id)
  }


  deleteCar(id:any): Observable<AracModel[]> {
    return this.http.delete<AracModel[]>(this.url + "/cars?id=" + id)
  }
}




