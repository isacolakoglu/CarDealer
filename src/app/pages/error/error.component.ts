import { Component } from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent {

  constructor(private appService: AppService) {

    this.appService.showNavigation$.next(false);
    this.appService.showHeader$.next(false);
  }
}
