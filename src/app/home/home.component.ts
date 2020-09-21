import { Component, OnInit } from '@angular/core';
import {WatchesService} from '../services/watches.service';
import {BrandsService} from '../services/brands.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  watches: any;
  watchesF: any;
  brands: any;
  wathcesS: any;
  constructor(private service: WatchesService, private serviceBrand: BrandsService) { }
  salesOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 700,
    autoplay:false,
    autoplayTimeout:5000,
    autoplayHoverPause:true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: false
  }

  ngOnInit(): void {
  this.service.getAllWatches().subscribe(
    data => {
      this.watches = data;
      this.watchesF = this.watches.filter(obj => obj.isF === 1);
      this.wathcesS = this.watches.filter(obj => obj.cene.popust === 1);
      // this.watchesF = this.watchesF.slice(0, 4);

    },
      error => {
          alert('An error has occured. Please contact support team. Error: ' + error);
    });

  this.serviceBrand.getAllBrands().subscribe(data => this.brands = data, error => {
    alert('An error has occured. Please contact support team. Error: ' + error);
  });
  }

  createRange(number){
    const items: number[] = [];
    for (let i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }
}
