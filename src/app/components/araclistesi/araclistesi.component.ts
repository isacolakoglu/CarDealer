import {Component, OnInit} from '@angular/core';
import {AracModel} from "../../models/arac.model";
import {HttpClient} from "@angular/common/http";
import {AracService} from "../../services/arac.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "../../services/user.service";
import {Kategori} from "../../models/kategori";
import {User} from "../../models/user";
import {first} from "rxjs";

@Component({
  selector: 'app-araclistesi',
  templateUrl: './araclistesi.component.html',
  styleUrls: ['./araclistesi.component.css'],
  providers: [AracService]
})
export class AraclistesiComponent implements OnInit{

  cars: AracModel[] = [];
  carList: any;
  categoryId: AracModel[] | any;
  temp: any;
  kategoriId:any;
  stateId:any;
  stateName:any;
  category_name:any;
  carModel: any;
  id: any;
  category: any;
  satilikCategory:any;
  isMod: boolean = false;
  isAdmin: boolean = false;
  categories: Kategori[] | any;
  carId: any;

  constructor(
    private http: HttpClient,
    private aracService: AracService,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {  }


  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      this.stateName = params["state.name"]
      this.getCarsByStateName()
      // this.getBuyingCars()
    });
    this.route.params.subscribe((params) => {
      this.category_name = params["category.name"]
      this.getCarsByCategoryName()
    });



    this.getModAndAdmin()
  }

  // CarDetay() {
  //   this.router.navigate(['/Araclar/state.name/category.name/carId'])
  // }


  getCarsByStateName() {
    if(this.stateName !== "Hepsi") {
      this.aracService.getCarsByStateName(this.stateName).subscribe((data => {
        let temp: any = []
        data.map((cars) => {
          if (cars.state == this.stateName) {
            temp.push(cars.name)
          }
        })
        this.category = [...new Set(temp)]
        this.cars = data;
      }))
    }
    else
    {
      this.aracService.getAllCars().subscribe(data => {
        this.cars = data;
      })
    }
  }

  getCarsByCategoryName() {
    this.aracService.getCarsByCategoryName(this.category_name).subscribe((data => {
      let temp: any = []
      data.map((cars) => {
        if (cars.category == this.category_name) {
          temp.push(cars.category)
        }
      })
      this.category = [...new Set(temp)]
      this.cars = data;
    }))
  }

  incele(cardata:any) {
    const state = cardata.state
    const category = cardata.category
    const id = cardata.id
    this.router.navigate([`/Araclar/${state}/${category}/${id}`])
  }

  getModAndAdmin() {
    this.userService.user.subscribe((data:any) => {
      if(localStorage.getItem("moderator")) {
        this.isMod = true;
      }
      if(localStorage.getItem("admin")) {
        this.isAdmin = true;
      }
    })
  }







}



