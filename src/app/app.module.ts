import {DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { AnasayfaComponent } from './pages/anasayfa/anasayfa.component';
import { GirisyapComponent } from './pages/girisyap/girisyap.component';
import { UyeolComponent } from './pages/uyeol/uyeol.component';
import { IletisimComponent } from './pages/iletisim/iletisim.component';
import { AraclarComponent } from './pages/araclar/araclar.component';
import { AracdetayiComponent } from './pages/aracdetayi/aracdetayi.component';
import { OdemeComponent } from './pages/odeme/odeme.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { AlbumComponent } from './components/album/album.component';
import { HeaderComponent } from './components/header/header.component';
import { IlanverComponent } from './pages/ilanver/ilanver.component';
import { AraclistesiComponent } from './components/araclistesi/araclistesi.component';
import { KategoriolusturComponent } from './pages/kategoriolustur/kategoriolustur.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { KategorilistesiComponent } from './components/kategorilistesi/kategorilistesi.component';


import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {NgxMaskDirective} from "ngx-mask";
import { DemoDirective } from './directives/demo.directive';

import {CurrencyPipe} from "@angular/common";
import {TruncatePipeService} from "./services/truncate-pipe.service";
import { ErrorComponent } from './pages/error/error.component';

@NgModule({
  declarations: [
    AppComponent,
    AnasayfaComponent,
    GirisyapComponent,
    UyeolComponent,
    IletisimComponent,
    AraclarComponent,
    AracdetayiComponent,
    OdemeComponent,
    NavbarComponent,
    CarouselComponent,
    AlbumComponent,
    HeaderComponent,
    IlanverComponent,
    AraclistesiComponent,
    KategoriolusturComponent,
    KategorilistesiComponent,
    DemoDirective,
    TruncatePipeService,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatCardModule,
    MatButtonModule,
    MatTreeModule,
    MatIconModule,
    MatInputModule,
    NgxMaskDirective
  ],
  providers: [CurrencyPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
