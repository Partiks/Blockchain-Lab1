import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {MatTableDataSource} from '@angular/material';

import { Item } from '../../item.model';
import { User } from '../../user.model';
import {ItemService} from '../../item.service';
import {UserService} from '../../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	
	items: Item[];
  u_items: any = {};
  user: any = {};
  uname: String;
	displayedColumns = ['Name', 'Description', 'Price', 'Status','Actions'];

  constructor(private itemService: ItemService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  console.log("List 1");
  	this.itemService.getAllItems().subscribe( (items) => {
  	console.log(items);
  	});
    console.log("List 2");
  	this.fetchItems();
    console.log("List 3");
    this.route.params.subscribe( params => {
      this.uname = params.uname;
      console.log("UNAME POSSIBLE ???");
      console.log(this.uname);
      this.userService.getUserByUname(this.uname).subscribe( res => {
        this.user = res;
        this.userService.getAllUserItems(this.uname).subscribe( res2 => {
          this.u_items = res2;
        });
      })
    });
    console.log("List 4");

    console.log(this.u_items);
    console.log("List INIT END");

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

  editItem(id) {
  	this.router.navigate([`/edit/${this.uname}/${id}`]);
  }

  sellItem(){
    this.router.navigate([`/create/${this.uname}`]);
  }

  deleteItem(id) {
  	this.itemService.deleteItem(id).subscribe( () =>{
  		this.fetchItems();
  	});
  }

}
