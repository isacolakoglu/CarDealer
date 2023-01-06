import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, catchError, delay, map, Observable, of, pipe, tap, throwError} from "rxjs";
import {User} from "../models/user";
import {UyeolResponse} from "../models/uyeol-response";
import {GirisyapResponse} from "../models/girisyap-response";
import {FormControl} from "@angular/forms";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {UyeResponse} from "../models/uye-response";
import {Router} from "@angular/router";
import {AracModel} from "../models/arac.model";

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'db/json'})
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user = new BehaviorSubject<User | null>(null);
  invalidLogin: boolean | undefined;

  constructor(private http: HttpClient,
              private router: Router)
  { }

  signIn(data: any) {
    const url = "http://localhost:3000/users";
    return this.http.get<any[]>(url, data)
  }

  signUp(data: any) {
    const url = "http://localhost:3000/users";
    return this.http.post<any[]>(url, data)
  }

  getCity() {
    const url = "http://localhost:3000/cities";
    return this.http.get<any[]>(url)
  }

  getGender() {
    const url = "http://localhost:3000/genders";
    return this.http.get<any[]>(url)
  }

  url = "http://localhost:3000/users";

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000/users")
  }



  register(firstName: string,
           lastName: string,
           userName: string,
           cityName: string,
           gender: string,
           telephoneNo: string,
           email: string,
           password: string,
           confirmPassword: string,
           acceptTerms: string,
           token: string,
           role: string): Observable<User[]> {

    return this.http.post<User[]>(this.url,
      {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        cityName: cityName,
        gender: gender,
        telephoneNo: telephoneNo,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        acceptTerms: acceptTerms,
        returnSecureToken: true,
        token: token,
        role: role
      })
      .pipe(
        tap(response => {
          console.log('register::', response);
        }),
      );
  }

  login(email: any, password: any) {
    return this.http.get(this.url + "?email=" + email + "&password=" + password,
    ).pipe(
      tap(response => {
        console.log('login::', response);
      })
    )
  }

  getUserName(userName?:any): Observable<User[]> {
    return this.http.get<User[]>(this.url + "?userName=" + userName)
  }

  getEmail(email?:any): Observable<User[]> {
    return this.http.get<User[]>(this.url + "?email=" + email)
  }

  // getById() : Observable<User[]> {
  //   return this.http.get<User[]>("http://localhost:3000/users")
  // }
  //
  // postById(firstName:any, lastName:any, userName:any, telephoneNo:any, cityName:any) {
  //
  //   return this.http.post<any[]>("http://localhost:3000/users", {
  //     firstName: firstName,
  //     lastName: lastName,
  //     userName: userName,
  //     telephoneNo: telephoneNo,
  //     cityName: cityName
  //   })
  // }


  // login(email: any, password: any) {
  //   return this.http.get(this.url + "?email=" + email + "&password=" + password,
  //   ).pipe(map((user:any)=> {
  //     localStorage.setItem('user', JSON.stringify(user));
  //     this.user.next(user);
  //     return user;
  //   }))
  // }





  logout() {
    this.user.next(null);
    localStorage.removeItem('user')
    localStorage.removeItem('admin')

    // localStorage.clear()
  }


  emailAvailable(email: string) {
    return this.http.post<any>("http://localhost:3000/users", {
      email: email,
    })
  }

  checkUserEmail(email?: any): Observable<User[]> {
    return this.http.get<User[]>("http://localhost:3000" + "/users?email=" + email)
  }


  deneme() {
    const fruits = ["elma", "armut", "şeftali"];
    localStorage.setItem("fullName", JSON.stringify("İsa Çolakoğlu"));
    localStorage.setItem("meyveler", JSON.stringify(fruits));

    const fullName = "İsa Çolakoğlu"
    localStorage.setItem("fullName", JSON.stringify(fullName));
  }







}
