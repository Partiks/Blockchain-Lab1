import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material';

import { Item } from '../../item.model';
import { User } from '../../user.model';
import {ItemService} from '../../item.service';
import {UserService} from '../../user.service';
import {TransactionService} from '../../transaction.service'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	
	items: Item[];
  item: any={};
  user: any = {};
  seller: any = {};
  uname: String;
  super: boolean = false;
	displayedColumns = ['Name', 'Description', 'Price', 'Status','Seller','Actions'];

  constructor(private itemService: ItemService, private userService: UserService, private transactionService: TransactionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.itemService.getAllItems().subscribe( (items) => {
    console.log(items);
    });
    this.fetchItems();
    this.route.params.subscribe( params => {
      this.uname = params.uname;
      if(this.uname == "superuser"){
        this.super = true;
      }
      console.log("UNAME POSSIBLE ???");
      console.log(this.uname);
      this.userService.getUserByUname(this.uname).subscribe( res => {
        this.user = res;
      })
    });
  }


  fetchItems(){
  	this.itemService
  		.getAllItems()
  		.subscribe( (data: Item[]) => {
  			this.items = data;
  			console.log('Data requested');
  			console.log(this.items);
  		});
  }

  buyItem(id){
  console.log("REACHED BUT_ITEM");
    this.itemService.getItemById(id).subscribe(res => {
      this.item = res;
      if(this.item.status == "Sold Out" || this.item.owner == this.uname){
        this.router.navigate([`/error/${this.uname}`]);
        return ;
      }
      console.log(this.item);
      console.log(this.user);
      console.log(this.item.price);
      console.log(this.user.balance);
      if(this.item.price < this.user.balance){
      console.log("STEP 2");
        this.userService.getUserByUname(this.item.owner).subscribe( (res)=>{
          console.log("STEP 3");
          this.seller = res;
          this.user.balance = parseInt(this.user.balance) - parseInt(this.item.price);
          console.log(this.user.balance);
          this.seller.balance = parseInt(this.seller.balance) + parseInt(this.item.price);
          console.log(this.seller.balance);
          console.log(this.user.username);
          console.log(this.seller.username);
          this.userService.updateUser(this.uname, this.user.password, this.user.balance).subscribe(() => {
          });
          this.userService.updateUser(this.seller.username, this.seller.password, this.seller.balance).subscribe(() => {
          });
          this.transactionService.addTransaction(this.seller.username, this.user.username, this.item._id, this.item.name, this.item.price).subscribe(() => {});
          this.itemService.updateItem(id, this.item.name, this.uname, this.item.description, this.item.price, "Sold Out").subscribe(() => {
            this.fetchItems();
          });
        });
        console.log("STEP 4");
        console.log("STEP 5");

      }
      else{
        this.router.navigate([`/error/${this.uname}`]);
        console.log("INSUFFICIENT FUNDS");
        //throw insufficient funds error here
      }
    });
  }

  editItem(id) {
  	this.router.navigate([`/edit/${this.uname}/${id}`]);
  }

  sellItem(){
    this.router.navigate([`/create/${this.uname}`]);
  }

  deposit(){
    this.router.navigate([`/deposit/${this.uname}`]);
  }

  deleteItem(id) {
    this.itemService.getItemById(id).subscribe(res => {
        this.item = res;
        if(this.item.owner == this.uname){
          this.itemService.deleteItem(id).subscribe( () =>{
            this.fetchItems();
          });
        }
        else{
          this.router.navigate([`/error/${this.uname}`]);
        }
    });
  }

  registerUser(){
    this.router.navigate([`/register/superuser`]);
  }

  showTransactions(){
    this.router.navigate([`/transaction/${this.uname}`]);
  }

  logOut(){
    console.log("LOGOUT");
    this.router.navigate([`/login`]);
  }


}
