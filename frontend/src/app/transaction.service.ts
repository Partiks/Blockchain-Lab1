import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class TransactionService{
	uri = 'http://localhost:4000';

  	constructor(private http: HttpClient) {  }

  	getAllTransactions(){
  		return this.http.get(`${this.uri}/transactions`);
  	}

  	getTransactionById(){

  	}

  	addTransaction(seller, buyer, item_id, item_name, item_price){
  		var day = new Date();
		var d = day.getDate();
		if (d < 10) {
		  var dd = '0' + String(d);
		}
		var m = day.getMonth() + 1; //January is 0!
		if (m < 10) {
		  var mm = 0 + String(m);
		}

		var yyyy = day.getFullYear();


		var today = mm + '/' + dd + '/' + String(yyyy);
		console.log("HIJO MIJO");
		console.log(today);
  		
  		const transaction = {
  			seller: seller,
  			buyer: buyer,
  			item_id: item_id,
  			item_name: item_name,
  			item_price: item_price,
  			date: today
  		}

  		console.log("ADDING TRANSACTION TO DATABASE");
  		console.log(transaction);
  		return this.http.post(`${this.uri}/transactions/add`, transaction);
  	}

}