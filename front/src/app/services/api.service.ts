import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient ) { }

  postFlux(data : any){
    return this.http.post<any>("http://localhost:3000/fluxList",data);
  }
  getFlux(){
    return  this.http.get<any>("http://localhost:3000/fluxList")
  }
  putFlux(data:any,id : number){
    return this.http.put<any>("http://localhost:3000/fluxList/"+id ,data)
  }
 
}
