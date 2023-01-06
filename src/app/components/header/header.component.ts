import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {HttpClient} from "@angular/common/http";
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  id: any = User
  isAdmin: boolean = false;
  isUser: boolean = false;
  isMod: boolean = false;

  constructor(private http: HttpClient,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit(): void {

    this.userService.user.subscribe((data: any) => {

      if (localStorage.getItem("user")) {
        this.isUser = true;
      }
      else if (localStorage.getItem("admin"))
      {
        this.isAdmin = true;
      }
      else if (localStorage.getItem("moderator"))
      {
        this.isMod = true;
      }
    })

    // if(localStorage.getItem("user")){
    //   this.isUser = true;
    // }
    // else if(localStorage.getItem("admin")) {
    //   this.isAdmin = true;
    // }


  }

  logout() {
    this.userService.logout();
  }
}
