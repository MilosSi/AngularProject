import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params, RouterModule} from '@angular/router';
import {WatchesService} from '../services/watches.service';
import {NgForm} from '@angular/forms';
import {LocalStorageService} from '../services/local-storage.service';
import {slideFromAbove} from '../animate';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  animations: [
    slideFromAbove
  ]
})
export class ProductComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  id: any;
  watch: any;
  watchesBrand: any;
  orders: any;
  errors: any[];
  constructor(private route: ActivatedRoute, private watchesS: WatchesService, private local: LocalStorageService) {
    this.route.params.subscribe((params: Params) => {
      this.id = params.id;

    });
  }

  ngOnInit(): void {


    this.watchesS.getAllWatches().subscribe((data: any ) => {
      this.watch = data.filter(obj => obj.id === Number(this.id));

      this.watchesBrand = data.filter(obj => obj.brand.brandId === this.watch[0].brand.brandId);
      this.watchesBrand = this.watchesBrand.filter(obj => obj.id != Number(this.id));

    });

  }

  onSubmit()
  {
    console.log(this.form);
    this.orders = this.local.ordersIn();
    const name = this.form.value.txtName + ' ' + this.form.value.txtSurname;
    // tslint:disable-next-line:max-line-length
    const address = this.form.value.addUser + ' , ' + this.form.value.userCity + ' , ' + this.form.value.userState + ' , ' + this.form.value.userZip;
    let type = 0;
    if (this.orders)
    {
     type = 1;
    }
    this.watch.forEach( obj => {
      this.local.addToLocal(obj.id, name, address, obj.imeProizvoda, obj.slika.putanjaSlike, obj.cene.Cena, obj.brand.brandPic, type);
    });
    alert('Order submitted');
  }

}
