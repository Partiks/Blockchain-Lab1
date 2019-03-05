import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ItemService {
	
	uri = 'http://localhost:4000';

  constructor(private http: HttpClient) {  }

  getAllItems(){
  	console.log(this.http.get(`${this.uri}/items`));
  	return this.http.get(`${this.uri}/items`);
  }

  getItemById(id){
  	return this.http.get(`${this.uri}/items/${id}`);
  }

  addItem(id, name, owner, description, price){
  	const item = {
  	id : id,
  	name: name,
  	owner: owner,
  	description: description,
  	price: price,
  	status: "Available"
  	};
  	return this.http.post(`${this.uri}/items/add`, item);
  }

  updateItem(id, p_id, p_name, p_owner, p_description, p_price, p_status){
  	const item = {
  	id : p_id,
  	name: p_name,
  	owner: p_owner,
  	description: p_description,
  	price: p_price,
  	status: p_status
  	};
  	console.log("ITEMS_SERVICES ----");
  	console.log(item);
  	//console.log(`${id}`);
  	return this.http.post(`${this.uri}/items/update/${id}`, item);
  }

  deleteItem(id){
  	return this.http.get(`${this.uri}/items/delete/${id}`);
  }

}
