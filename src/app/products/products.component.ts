import {Component, OnInit, ViewChild} from '@angular/core';
import {WatchesService} from '../services/watches.service';
import {ActivatedRoute, Params} from '@angular/router';
import {BrandsService} from '../services/brands.service';
import {GenderServiceService} from '../services/gender-service.service';
import {NgForm} from '@angular/forms';
import {of} from 'rxjs';
import {fade} from '../animate';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  animations: [
    fade
  ]
})
export class ProductsComponent implements OnInit {

  @ViewChild('f') filterForm: NgForm;

  watches: any;
  searchWatches: any;
  brandId = 0;
  brands: any;
  genders: any;
  genderId = 0;
  filterWatches: any;

  private _searchName: string;
  get searchName(): string {
    return this._searchName;
  }
  set searchName(value: string){
    this._searchName = value;
    this.searchWatches = this.searchNameFilter(value);
  }

  constructor(private watchServices: WatchesService, private route: ActivatedRoute, private brandServices: BrandsService,
              private genderServices: GenderServiceService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.brandId = Number(params.brandId);
      this.genderId = Number(params.genderId);
    });

    this.watchServices.getAllWatches().subscribe(data => {
      this.watches = data;
      if (!isNaN(this.brandId))
      {
        this.watches = this.watches.filter(obj => obj.brand.brandId == this.brandId);
      }
      if (!isNaN(this.genderId))
      {
        this.watches = this.watches.filter(obj => obj.polKat.polId == this.genderId);
      }
      this.searchWatches = this.watches;

    }, error => {
      alert('An error has occured. Please contact support team. Error: ' + error);
    });
    this.brandServices.getAllBrands().subscribe(data => {
      this.brands = data;
    });
    this.genderServices.getAllGenders().subscribe(data => {
      this.genders = data;
    });


  }

  SubmitFilters()
  {
    this.formFilters(this.filterForm.value.brands, this.filterForm.value.genders, this.filterForm.value.offers);
  }
  searchNameFilter(value: string)
  {
    return this.watches.filter(watch => watch.imeProizvoda.toLowerCase().indexOf(value.toLowerCase()) != -1);
  }
  formFilters(brands: string, genders: string, offers: string){
    this.watchServices.getAllWatches().subscribe(data => {
      this.searchWatches = data;
      if (brands != ''){
       this.searchWatches = this.searchWatches.filter(watch => (watch.brand.brandId == brands));
      }
      if (genders != '')
      {
        this.searchWatches = this.searchWatches.filter(watch => (watch.polKat.polId == genders));
      }
      if(offers != '')
      {
        if(offers == '1')
        {
          this.searchWatches = this.searchWatches.filter(watch => (watch.novProizvod == offers));
        }
        else
        {
          this.searchWatches = this.searchWatches.filter(watch => (watch.cene.popust == 1));
        }
      }
    });






  }
}
