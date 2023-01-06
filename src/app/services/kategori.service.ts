import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable, tap} from "rxjs";
import {Kategori} from "../models/kategori";
import {AracModel} from "../models/arac.model";
import {AracService} from "./arac.service";
import {States} from "../models/states";


@Injectable({
  providedIn: 'root'
})
export class KategoriService {

  private url = "http://localhost:3000";



  constructor(private http: HttpClient) {

  }






}
