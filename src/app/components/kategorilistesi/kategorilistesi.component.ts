import {Component, OnInit} from '@angular/core';
import {KategoriService} from "../../services/kategori.service";
import {Kategori} from "../../models/kategori";
import {AracService} from "../../services/arac.service";
import {AracModel} from "../../models/arac.model";
import {Observable} from "rxjs";
import {Brands} from "../../models/brands";
import {BrandsService} from "../../services/brands.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-kategorilistesi',
  templateUrl: './kategorilistesi.component.html',
  styleUrls: ['./kategorilistesi.component.css'],
  providers: [KategoriService, AracService, BrandsService]
})
export class KategorilistesiComponent implements OnInit {

  categories: Kategori[] | any;
  selectedCategory: Kategori | any;
  cars: AracModel[] | any;
  states: Brands[] | any;
  salesCategory: any[] = []
  stateId: any;
  state_name: any;

  constructor(private kategoriService: KategoriService,
              private aracService: AracService,
              private brandsService: BrandsService,
              private route: ActivatedRoute) {
  }


  displayAll = true;

  ngOnInit(): void {
    this.getAllCars();


    this.states = [
      {
        id: 3,
        name: 'Tüm Araçlar',
        path: 'Hepsi',
        categories:[]
      },
      {
        id: 0,
        name: 'Satılık Araçlar',
        path: 'Satılık',
        //default:3,
        categories:[]
      },
      {
        id: 1,
        name: 'Kiralık Araçlar',
        path: 'Kiralık',
        categories:[]
      },
      {
        id: 2,
        name: 'Talep Edilen Araçlar',
        path: 'Talep',
        categories:[]
      },
    ]
  }

  //TÜM ARAÇLAR
  getAllCars() {
    this.aracService.getAllCars().subscribe(data => {
      this.categories = data;

    })
  }


  getCarsByStateName(name: any) {
    this.aracService.getCarsByStateName(name.split(" ")[0]).subscribe((data) => {
      let temp:any[] = []

      temp = data.filter((cars:any) => {
        if(cars.state == name.split(" ")[0])
        {
          return cars;
        }
      })
      this.states.find((state:any) =>
        state.name == name).categories = [...new Map(temp.map(item => [item.category, item])).values()]
    })
  }

  getCollapse(name: any) {
    this.getCarsByStateName(name)
  }
}
