import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { MatSnackBar } from '@angular/material';

import {ItemService} from '../../item.service';
import { Item } from '../../item.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	id: String;
	item: any = {};
	updateForm: FormGroup

  constructor(private itemService: ItemService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) { 
  	this.createForm();
  }

  createForm() {
  this.updateForm = this.fb.group({
  		id: '',
  		name: ['', Validators.required],
  		owner: '',
  		description: '',
  		price: '',
  		status: ''
  	});
  }

  ngOnInit() {
  	this.route.params.subscribe( params => {
  		this.id = params.id;
  		this.itemService.getItemById(this.id).subscribe(res => {
  			this.item = res;
  			this.updateForm.get('id').setValue(this.item.id);
  			this.updateForm.get('name').setValue(this.item.name);
  			this.updateForm.get('owner').setValue(this.item.owner);
  			this.updateForm.get('description').setValue(this.item.description);
  			this.updateForm.get('price').setValue(this.item.price);
  			this.updateForm.get('status').setValue(this.item.status);
  		});
  	});

  }

  updateItem(id, name, owner, description, price, status){
  	this.itemService.updateItem(this.id, id, name, owner, description, price, status).subscribe(() => {
  		this.snackBar.open('Item Updated sucessfully!','OK', {
  			duration: 3000
  		});
  	});
  }

}
