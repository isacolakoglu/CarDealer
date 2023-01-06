import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  Validator,
  FormControl,
  NgForm,
  ValidationErrors,
  FormGroupDirective, EmailValidator, NG_VALIDATORS, ValidatorFn, AsyncValidatorFn
} from "@angular/forms";
import {UserService} from "../../services/user.service";
import {ErrorStateMatcher} from "@angular/material/core";
import {Observable, throwError} from "rxjs";
import {UyeolResponse} from "../../models/uyeol-response";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {User} from "../../models/user";

@Component({
  selector: 'app-uyeol',
  templateUrl: './uyeol.component.html',
  styleUrls: ['./uyeol.component.css'],
})

export class UyeolComponent implements OnInit {

  registerForm: FormGroup | any;
  submitted: boolean = false;
  cities: any[] = []
  genders: any[] = []
  error: string = "";
  users: User[] = [];
  sub: any;


  constructor(public formBuilder: FormBuilder,
              private router: Router,
              private userService: UserService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.formGroup();
    this.getCity();
    this.getGender();
  }

  formGroup() {
    this.registerForm = new FormGroup(
      {
        firstName: new FormControl
        (
          null,
          [Validators.required, Validators.minLength(2)]),

        lastName: new FormControl
        (
          null,
          [Validators.required]),

        userName: new FormControl
        (
          null,
          [Validators.required,
            Validators.minLength(4)]),

        cityName: new FormControl
        (
          null,
          [Validators.required]),

        gender: new FormControl
        (
          null,
          [Validators.required]),

        telephoneNo: new FormControl
        (
          null,
          [Validators.required,
            Validators.pattern('[0-9]{10}$')]),
        email: new FormControl
        (
          null,
          [Validators.required,
            Validators.email],
        ),
        // [this.uniqueEmail.validate]

        password: new FormControl
        (
          null,
          [Validators.required,
            Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
            Validators.minLength(8)]),


        confirmPassword: new FormControl
        (
          null,
          [Validators.required,
            Validators.minLength(8),
            this.passwordMatch('password', 'confirmPassword')]),

        acceptTerms: new FormControl
        (
          null,
          [Validators.required]),

        token: new FormControl("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"),
        role: new FormControl("user")
      },

      {
        //validators: passwordMatchingValidatior
        validators: this.passwordMatch('password', 'confirmPassword')
      },
    );

  }

  //ÜYE OL BUTONU ÇALIŞTIRMA İLE İLGİLİ
  onSubmit(): void {
    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
      //Yada false;
    }
    else
    {

      this.http.get<any>("http://localhost:3000/users?email=" + this.registerForm.value.email).subscribe((data:any)=>{
        if(data.length > 0)
        {
          alert("Lütfen doğru email adresi giriniz");
        }
        else
        {
          this.sub = this.userService.register(
            this.registerForm.value.firstName,
            this.registerForm.value.lastName,
            this.registerForm.value.userName,
            this.registerForm.value.cityName,
            this.registerForm.value.gender,
            this.registerForm.value.telephoneNo,
            this.registerForm.value.email,
            this.registerForm.value.password,
            this.registerForm.value.confirmPassword,
            this.registerForm.value.acceptTerms,
            this.registerForm.value.token,
            this.registerForm.value.role).subscribe(res => {
            alert("Üyeliğiniz başarıyla kaydedildi!!")
            this.registerForm.reset()
            this.router.navigate(["/"])
          }, err => {
            alert("Bir şeyler yanlış gitti.")
          })
        }
      })
    }
  }

  getCity() {
    this.userService.getCity().subscribe((data) => {
      this.cities = data;
      //console.log(data);
    })
  }

  getGender() {
    this.userService.getGender().subscribe((data) => {
      this.genders = data;
      //console.log(data);
    })
  }

  //TELEFON INPUT İÇİN
  onlyNumberKey(event: any) {
    var ASCIICode = (event.which) ? event.which : event.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
      return false;
    return true;
  }

  passwordMatch(password: string, confirmPassword: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: any } | null => {
      const passwordControl = formGroup.get(password)
      const confirmPasswordControl = formGroup.get(confirmPassword);


      if (!passwordControl || !confirmPasswordControl) {
        return null;
      }

      if (
        confirmPasswordControl.errors &&
        !confirmPasswordControl.errors["mustMatch"]
      ) {
        return null;
      }


      if (passwordControl.value !== confirmPasswordControl.value) {
        confirmPasswordControl.setErrors({mustMatch: true});
        return {mustMatch: true}
      } else {
        confirmPasswordControl.setErrors(null);
        return null;
      }
    }
  }

  get passwordMatchError() {
    return (
      this.registerForm.getError('mustMatch') &&
      this.registerForm.get('confirmPassword')?.touched
    )
  }
}


// TEMİZLE BUTONU İLE İLGİLİ
// onReset(): void {
//   this.submitted = false;
//   this.signupForm.reset();
// }


// checkingUsersByEmail(db: any, email:any) {
//   this.registerForm.email = db
//   const formEmail = this.registerForm.email;
//   this.http.get<any>("http://localhost:3000/users" + email).subscribe((data) => {
//     if(formEmail === data.email)
//     {
//       alert("Böyle bir email adresi zaten kullanılıyor");
//     }
//     else
//     {
//       alert("Başarılı");
//     }
//   })
//
// }

// this.http.get<any>("http://localhost:3000/users?email=" + this.registerForm.value.email).subscribe((db) => {
//   if(db.length > 0)
//   {
//     alert("Böyle bir email adresi zaten var");
//   }
//   else
//   {
//     this.userService.register(
//       this.registerForm.value.firstName,
//       this.registerForm.value.lastName,
//       this.registerForm.value.userName,
//       this.registerForm.value.cityName,
//       this.registerForm.value.gender,
//       this.registerForm.value.telephoneNo,
//       this.registerForm.value.email,
//       this.registerForm.value.password,
//       this.registerForm.value.confirmPassword,
//       this.registerForm.value.acceptTerms,
//       this.registerForm.value.token,
//       this.registerForm.value.role
//     ).subscribe((result) => {
//       alert('Üyeliğiniz başarıyla kaydedildi!!!')
//       this.router.navigate(['/']);
//     })
//   }
// })
