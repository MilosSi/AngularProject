import { Component, OnInit } from '@angular/core';
import {Input} from '@angular/core';

@Component({
  selector: 'app-showwatches',
  templateUrl: './showwatches.component.html',
  styleUrls: ['./showwatches.component.css']
})
export class ShowwatchesComponent implements OnInit {

  @Input('watchesAlias') watch: {id: number, isF: number, novProizvod: number,
    polKat: {polId: number, pol: string},
    slika: {putanjaSlike: string, opisSlike: string},
    ocena: number, imeProizvoda: string,
    cene: {popust: number, staraCena: number, Cena: number},
    brand: {brandId: number, brandPic: string, opisBrenda: string},
    opis: string};
  constructor() { }

  ngOnInit(): void {
  }

  createRange(number){
    const items: number[] = [];
    for (let i = 1; i <= number; i++){
      items.push(i);
    }
    return items;
  }

}
