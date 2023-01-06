import {Component, OnInit} from '@angular/core';
import {UserService} from "./services/user.service";
import {Router} from "@angular/router";
import {AppService} from "./services/app.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'CarDealer';

  constructor(private userService: UserService,
              private router: Router,
              private appService: AppService) {

    this.navigate =  this.appService.showNavigation$
    this.head = this.appService.showHeader$

  }

  navigate: any;
  head: any;

  ngOnInit(): void {

  }
}


