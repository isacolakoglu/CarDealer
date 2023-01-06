import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AracService} from "../../services/arac.service";
import {KategoriService} from "../../services/kategori.service";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {IlanService} from "../../services/ilan.service";
import {elementAt, map, Observable, pipe} from "rxjs";
import {FileUploadService} from "../../services/file-upload.service";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {CurrencyPipe} from "@angular/common";
import {AracModel} from "../../models/arac.model";


@Component({
  selector: 'app-ilanver',
  templateUrl: './ilanver.component.html',
  styleUrls: ['./ilanver.component.css']
})
export class IlanverComponent implements OnInit {

  ilanForm: FormGroup | any;
  advert = false;
  states: any[] = []
  categories: any[] = []
  models: any[] = []
  colors: any[] = []
  years: any[] = []
  brand: any
  file: any;

  item: any = User
  firstName: any
  lastName: any
  userName: any
  email: any;
  telephoneNo: any
  cityName: any


  //FİYAT INPUTU İÇİN
  formattedAmount: any;
  amount: any;

  constructor(private http: HttpClient,
              private kategoriService: KategoriService,
              private aracService: AracService,
              private formBuilder: FormBuilder,
              private ilanService: IlanService,
              private router: Router,
              private uploadService: FileUploadService,
              private userService: UserService,

              private currencyPipe: CurrencyPipe) {
  }

  ngOnInit(): void {
    this.ilanForm = new FormGroup({
      durumName: new FormControl(null, [Validators.required]),
      kategoriName: new FormControl(null, [Validators.required]),
      modelName: new FormControl(null, [Validators.required]),
      yearName: new FormControl(null, [Validators.required]),
      colorName: new FormControl(null, [Validators.required]),
      textName: new FormControl(null, [Validators.required]),
      kilometerName: new FormControl(null, [Validators.required]),
      powerName: new FormControl(null, [Validators.required]),
      volumeName: new FormControl(null, [Validators.required]),
      fileName: new FormControl(null, [Validators.required]),
      priceName: new FormControl(null, [Validators.required]),
    })

    this.ilanForm.valueChanges.subscribe( (form:any) => {
      if(form.priceName) {
        this.ilanForm.patchValue({
          priceName: this.currencyPipe.transform(form.priceName.replace(/\D/g, '').replace(/^0+/,''),
            '₺', 'symbol', '1.0-0')
        }, {emitEvent: false});
      }
    });



    this.getDurum();
    this.getCategory();
    this.getColor();
    this.getYear();
    this.getEmail()
  }

  // transformAmount(element:any) {
  //   this.formattedAmount = this.currencyPipe.transform(this.formattedAmount, 'TRY');
  //
  //   element.target.value = this.formattedAmount;
  // }

  getEmail(){
    this.userService.getEmail().subscribe((data:any) => {
      this.email = localStorage.getItem('user')
      console.log('result-ilan',this.userName)
    })
  }

  onIlan(): void {
    this.advert = true;

    if (this.ilanForm.invalid) {
      false;
    } else {
      // this.userService.usersForCars(this.firstName,this.lastName,this.userName,this.telephoneNo,this.cityName)
      // .subscribe((data:any) => {
      //   if(localStorage.getItem("user"))
      //   {
      //     this.firstName = data.firstName
      //     this.lastName = data.lastName
      //     this.userName = data.userName
      //     this.telephoneNo = data.telephoneNo
      //     this.cityName = data.cityName
      //   }
      // })


      // let selectedUser: any
      // this.userService.getAllUsers().subscribe((user:any) => {
      //   selectedUser = user.id
      //   this.userService.postUserById(this.item).subscribe((userId:any) => {
      //     if(userId === selectedUser)
      //     {
      //       this.item.push()
      //     }
      //   })
      // })

      // this.userService.getById().subscribe((data: any) => {
      //     data.firstName
      //     data.lastName
      //     data.userName
      //     data.telephoneNo
      //     data.cityName
      //     this.userService.postById(this.firstName, this.lastName, this.userName, this.telephoneNo, this.cityName).subscribe((result: any) => {
      //       this.item.push(this.firstName, this.lastName, this.userName, this.telephoneNo, this.cityName)
      //     })
      //   }
      // )

      this.userService.getEmail(this.email).subscribe(res => {
        this.firstName = res[0].firstName,
        this.lastName = res[0].lastName
        this.userName = res[0].userName
        this.email = res[0].email
        this.telephoneNo = res[0].telephoneNo
        this.cityName = res[0].cityName

        this.ilanService.advert(
          this.ilanForm.value.durumName,
          this.ilanForm.value.kategoriName,
          this.ilanForm.value.modelName,
          this.ilanForm.value.yearName,
          this.ilanForm.value.colorName,
          this.ilanForm.value.textName,
          this.ilanForm.value.kilometerName,
          this.ilanForm.value.powerName,
          this.ilanForm.value.volumeName,
          this.ilanForm.value.fileName,
          this.ilanForm.value.priceName,
          this.firstName,
          this.lastName,
          this.userName,
          this.email,
          this.telephoneNo,
          this.cityName
          // this.userService.getAllUsers().subscribe((user:any) => {
          //   selectedUser = user.id
          // })
        )
          .subscribe((result) => {
          })
        this.router.navigate(['/']);
      })


    }
  }

  //DURUM SELECT TAGINDAKİ VERİLERİN GETİRİLMESİ
  getDurum() {
    this.ilanService.getDurum().subscribe((data) => {
      this.states = data;
    })
  }


  //KATEGORİ SELECT TAGINDAKİ VERİLERİN GETİRİLMESİ
  getCategory() {
    this.ilanService.getCategory().subscribe((data) => {
      this.categories = data;
    })
  }

  //RENK SELECT TAGINDAKİ VERİLERİN GETİRİLMESİ
  getColor() {
    this.ilanService.getColor().subscribe((data) => {
      this.colors = data;
    })
  }

  //YIL SELECT TAGINDAKİ VERİLERİN GETİRİLMESİ
  getYear() {
    this.ilanService.getYear().subscribe((data) => {
      this.years = data;
    })
  }

  //KATEGORİYE GÖRE MODELLERİN LİSTENMESİ. //SELECT TAGLER İÇİN
  changeModel() {
    this.brand = this.ilanForm.value.kategoriName;
    this.getModels(this.brand)
  }

  getModels(brand: any) {
    if (this.models.length) {
      this.models = []
    }
    this.categories.filter((car) => {
      if (car.name == brand) {
        this.models.push(car.models)
      }
    })
  }


}
