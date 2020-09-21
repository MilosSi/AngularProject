import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { paths } from '../../paths';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private http: HttpClient) { }

  getAllBrands()
  {
    return this.http.get(paths.brands);
  }
}
