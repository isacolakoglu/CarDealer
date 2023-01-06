import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnasayfaComponent} from "./pages/anasayfa/anasayfa.component";
import {AraclarComponent} from "./pages/araclar/araclar.component";
import {UyeolComponent} from "./pages/uyeol/uyeol.component";
import {GirisyapComponent} from "./pages/girisyap/girisyap.component";
import {IlanverComponent} from "./pages/ilanver/ilanver.component";
import {AracdetayiComponent} from "./pages/aracdetayi/aracdetayi.component";
import {AraclistesiComponent} from "./components/araclistesi/araclistesi.component";
import {KategoriolusturComponent} from "./pages/kategoriolustur/kategoriolustur.component";
import {UserGuard} from "./guards/user.guard";
import {ErrorComponent} from "./pages/error/error.component";

const routes: Routes = [
  {path: '', component: AnasayfaComponent},
  // { path: 'deneme', redirectTo: 'girisyap', pathMatch: 'full'},
  {path: 'girisyap', component: GirisyapComponent},
  {path: 'uyeol', component: UyeolComponent},
  {path: 'araclistesi', component: AraclistesiComponent},
  {path: 'kategoriolustur', component: KategoriolusturComponent},
  {
    path: 'Araclar', component: AraclarComponent,
    children: [
      {
        path: ':state.name', component: AraclistesiComponent //araclar/hepsi //araclar/satılık gibi...
      },
      {
        path: ':state.name/:category.name', component: AraclistesiComponent //araclar/satilik/Audi gibi...
      },
      {
        path: ':state.name/:category.name/:carId', component: AracdetayiComponent //Araclar/Satılık/Audi/1 gibi..
      }
    ]
  },
  {
    path: 'ilanver', component: IlanverComponent, canActivate: [UserGuard]
  },
  {
    path: '**', pathMatch: 'full', component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
