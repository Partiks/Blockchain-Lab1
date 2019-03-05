import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MatTableDataSource} from '@angular/material';

import { Item } from '../../item.model';
import {ItemService} from '../../item.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
	
	items: Item[];
	displayedColumns = ['Name', 'Description', 'Price', 'Status','Actions'];

  constructor(private itemService: ItemService, private router: Router) { }

  ngOnInit() {
  	this.itemService.getAllItems().subscribe( (items) => {
  	console.log(items);
  	});
  	this.fetchItems();
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
  	this.router.navigate([`/edit/${id}`]);
  }

  deleteItem(id) {
  	this.itemService.deleteItem(id).subscribe( () =>{
  		this.fetchItems();
  	});
  }

}
