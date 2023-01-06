import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Brands} from "../models/brands";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  private url = "http://localhost:3000";

  constructor(private http: HttpClient) { }



}
