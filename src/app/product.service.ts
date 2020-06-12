import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }
  
  getSearchResult(data):Observable<any>
  {
    var url;
    var apiurl = "https://api.github.com/search/users?q="
    const headerDict = {
      'Authorization':'token df0fe5915180585002dc4e11de069381ce2790f8'
    }
    
    const requestOptions = {                                                                                                                                                                                 
      headers: new HttpHeaders(headerDict), 
    };
    console.log(data)
    url = "https://api.github.com/search/"+data.filter+"?q="+data.searchtext;
    console.log(url)
    return this.http.get(url,requestOptions)
  }
}
