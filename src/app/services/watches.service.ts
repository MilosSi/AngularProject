import { Injectable } from '@angular/core';
import {paths} from '../../paths';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WatchesService {

  constructor(private http: HttpClient) { }

  getAllWatches(){
    return this.http.get(paths.watches);
  }

}
