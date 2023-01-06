import { CarouselModel } from "./carousel.model";

export class CarouselRepository {

  private carousels: CarouselModel[] = [
    { id: 1,
      imageUrl: "carousel1.jpg",
      header: "Audi A7",
      description: "Audi A7 ile Yaz tatiline girin..."
    },
    {
      id: 2,
      imageUrl: "carousel2.jpg",
      header: "Mercedes",
      description: "Mercedes ile sürüş keyfini çıkartın..."
    },
    {
      id: 3,
      imageUrl: "carousel3.jpg",
      header: "BMW",
      description: "BMW ile sport moduyla gezme keyfi çıkartın..."
    }
  ];

  getCarousels(): CarouselModel[] {
    return this.carousels;
  }
}
