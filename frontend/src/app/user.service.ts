import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class UserService{
	uri = 'http://localhost:4000';

  	constructor(private http: HttpClient) {  }

  	getAllUsers(){
  		return this.http.get(`${this.uri}/users`);
  	}

  	getUserByUname(uname){
  		return this.http.get(`${this.uri}/users/${uname}`);
  	}

  	getAllUserItems(uname){
  		return this.http.get(`${this.uri}/users/${uname}/items`);
  	}



}