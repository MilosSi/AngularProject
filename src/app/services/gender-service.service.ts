import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { paths } from '../../paths';

@Injectable({
  providedIn: 'root'
})
export class GenderServiceService {

  constructor(private http: HttpClient) { }

  getAllGenders()
  {
    return this.http.get(paths.gender);
  }
}
