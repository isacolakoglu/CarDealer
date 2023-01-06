import {Component, OnInit, Pipe} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AracService} from "../../services/arac.service";
import {AracModel} from "../../models/arac.model";
import {Router} from "@angular/router";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.css']
})

export class AlbumComponent implements OnInit{

  cars: AracModel[] = [];
  isMod: boolean = false;
  isAdmin: boolean = false;

  constructor(private http: HttpClient,
              private aracService: AracService,
              private router: Router,
              private userService: UserService) {
  }


  ngOnInit() {
    this.getAllCars()
  }


  getAllCars() {
    this.aracService.getAllCars().subscribe((data:any) => {
      this.cars = data
    })
  }


  View(car:any) {
    const state = car.state
    const category = car.category
    const id = car.id
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
