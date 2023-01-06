import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {User} from "../../models/user";
import {map, Observable, pipe} from "rxjs";
import {UyeolResponse} from "../../models/uyeol-response";
import {first} from "rxjs";

@Component({
  selector: 'app-girisyap',
  templateUrl: './girisyap.component.html',
  styleUrls: ['./girisyap.component.css']
})
export class GirisyapComponent implements OnInit {


  isUser: boolean = false;
  loginForm: FormGroup | any;
  logger: any;

  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {
  }


  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
    });

  }

  OnLogin() {
    if(this.loginForm.invalid) {
      return;
    }
    this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe((data:any) => {
        if(data.length !== 0){
          if(data[0].role === "user")
          {
            alert("Giriş Başarılı")
            this.router.navigate(['/'])
            localStorage.setItem('user', data[0].email)
            console.log('localStorageData',data)
            this.userService.user.next(data)
            return data;

          }
          if(data[0].role === "admin")
          {
            alert("Hoşgeldiniz Admin")
            this.router.navigate(['/'])
            localStorage.setItem('admin', data[0].email)
            this.userService.user.next(data)
            return data;
          }
        }
        else
        {
          alert("Kullanıcı adınız veya şifreniz yanlış")
        }
      })
  }

  // OnLogin() {
  //   if (this.loginForm.invalid) {
  //     return;
  //   }
  //   this.userService.login(this.loginForm.value.email, this.loginForm.value.password)
  //     .subscribe((data: any) => {
  //       if (data.length !== 0) {
  //         this.userService.user.next(data[0])
  //         if (data[0].role === "user")
  //         {
  //           localStorage.setItem('user', JSON.stringify(data[0].id))
  //           alert('Giriş başarılı!!!')
  //           this.router.navigate(["/"])
  //         }
  //         else if (data[0].role === "admin")
  //         {
  //           localStorage.setItem('admin', JSON.stringify(data[0].id))
  //           alert('Hoşgeldiniz Admin')
  //           this.router.navigate(["/"])
  //         }
  //       }
  //       else
  //       {
  //         alert("Kullanıcı adınız veya şifreniz yanlış")
  //       }
  //     })
  // }


}


// this.logger = this.userService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe((data:any) => {
//   if(data.length !== 0) {
//     this.userService.user.next(data[0])
//     this.loginForm.reset()
//     localStorage.setItem('user', JSON.stringify(data[0].email))
//     if(data[0].role === "user") {
//       alert('Giriş başarılı!!!')
//       this.router.navigate(["/"])
//     }
//     else if(data[0].role === "admin") {
//       alert('Hoşgeldiniz Admin')
//       this.router.navigate(["/Araclar/hepsi"])
//     }
//   }
//   else {
//     alert("Kullanıcı adınız veya şifreniz yanlış")
//   }
// })

