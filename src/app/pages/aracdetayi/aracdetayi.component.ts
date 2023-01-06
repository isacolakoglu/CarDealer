import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AracService} from "../../services/arac.service";
import {ActivatedRoute} from "@angular/router";
import {AracModel} from "../../models/arac.model";
import {UserService} from "../../services/user.service";
import {User} from "../../models/user";
import {find, pipe} from "rxjs";

@Component({
  selector: 'app-aracdetayi',
  templateUrl: './aracdetayi.component.html',
  styleUrls: ['./aracdetayi.component.css'],
  providers: [AracService]
})
export class AracdetayiComponent implements OnInit {

  car: AracModel[] | any;

  //KULLANICI BİLGİLERİN GETİRİLMESİ
  user: User[] = [];
  aracModel: AracModel[] = [];

  userItems: User[] = [];

  user_name: any;

  twodata:any;

  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private aracService: AracService,
              private userService: UserService) {


  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const id = params["carId"];

      this.aracService.getCarsDetayId(id).subscribe(result => {
        console.log('result',result)
        this.car = result
      })
    })

    // this.getAllUsers()
    // this.getProperty()
    // this.getData()

  }




  // getData() {
  //   this.userService.getAllUsers().subscribe((user: any) => {
  //     let temp: any = []
  //     const userData = user
  //
  //     this.aracService.getAllCars().subscribe((car: any) => {
  //       const carData = car
  //
  //       console.log({...userData, ...carData})
  //       temp = [{...userData, ...carData}]
  //       this.twodata = temp
  //     })
  //   })
  // }


  // getData() {
  //   this.userService.getUserName(this.user_name).subscribe((user:any) => {
  //     let temp: any = []
  //     user.map((aracModel: AracModel) => {
  //       if(aracModel.userName == user.user_name)
  //       {
  //         temp.push(aracModel.userName)
  //       }
  //
  //     })
  //   })
  // }

  // getProperty() {
  //   this.aracService.getAllCars().subscribe((car:any) => {
  //
  //     let temp: any = []
  //     car.map((user: User) => {
  //       if(user.id == car.userId)
  //       {
  //         temp.push(user.id)
  //       }
  //     })
  //     this.user = car;
  //   })
  // }

  // getAllUsers() {
  //   this.userService.getAllUsers().subscribe((user: any) => {
  //     user.map((data: any) => {
  //       return {
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         userName: user.userName,
  //         telephoneNo: user.telephoneNo,
  //         cityName: user.cityName
  //       }
  //     })
  //     console.log('data',user)
  //
  //     this.aracService.getAllCars().subscribe((car: any) => {
  //       console.log('car', car)
  //     })
  //   })
  //
  // }

  // getAllUsers() {
  //   this.userService.getAllUsers().subscribe((data: any) => {
  //     const cloneData = data.map((user:any) => {
  //       return {
  //         firstName: user.firstName,
  //         lastName: user.lastName,
  //         userName: user.userName,
  //         telephoneNo: user.telephoneNo,
  //         cityName: user.cityName };
  //       let otherData = data.find((element: User) => element.id === user.userId)
  //       return { ...data, ...otherData}
  //     });
  //     console.log('data', data)
  //   })
  // }


  // const result = forkJoin([
  //   this.userService.getAllUsers(),
  //   this.aracService.getAllCars(),
  // ]).pipe(
  //   map(([users, data]) => {
  //     return users.map(user => {
  //       let clonedData = user;
  //       const foundData = data.find(x => x.userId === user.id);
  //       if(foundData)
  //       {
  //         clonedData = { ...clonedData, ...foundData};
  //       }
  //       return JSON.parse(JSON.stringify(clonedData))
  //     });
  //   })
  // );


  // const result = this.userService.getAllUsers().pipe(
  //   switchMap(users => this.aracService.getAllCars().pipe(
  //     map(data => users.map(
  //       u => ({...u, ...data.find(d => d.userId === u.id)})
  //     ))
  //   ))
  // )


  // getRoles() {
  //   return this.userItems.map((user: any) => {
  //     return { userId: user.id }
  //     this.aracModel = user
  //   })
  // }


  // Testing() {
  //   const testtest = this.userService.getAllUsers().subscribe((data:any) => {
  //     data.map((item:any) => {
  //       return {
  //         firstName: item.firstName,
  //         lastName: item.lastName,
  //         userName: item.userName,
  //         telephoneNo: item.telephoneNo,
  //         cityName: item.cityName
  //       };
  //     })
  //     console.log('testtest',testtest);
  //   })
  // }


}
