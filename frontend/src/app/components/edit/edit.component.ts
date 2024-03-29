import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { MatSnackBar } from '@angular/material';

import {ItemService} from '../../item.service';
import { Item } from '../../item.model';
import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
	id: String;
	item: any = {};
  uname: String;
	updateForm: FormGroup

  constructor(private itemService: ItemService, private userService: UserService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) { 
  	this.createForm();
  }

  createForm() {
  this.updateForm = this.fb.group({
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
      this.uname = params.uname;
  		this.itemService.getItemById(this.id).subscribe(res => {
  			this.item = res;
        if(this.item.owner == this.uname){
          this.updateForm.get('name').setValue(this.item.name);
          this.updateForm.get('owner').setValue(this.item.owner);
          this.updateForm.get('description').setValue(this.item.description);
          this.updateForm.get('price').setValue(this.item.price);
          this.updateForm.get('status').setValue(this.item.status);
        }
        else{
          this.router.navigate([`/error/${this.uname}`]);
        }
  		});
  	});

  }

  backToList(){
    console.log("Going back to list from create");
    console.log(this.uname);
    this.router.navigate([`/list/${this.uname}`]);
  }

  updateItem(name, owner, description, price, status){
  	this.itemService.updateItem(this.id, name, owner, description, price, status).subscribe(() => {
  		this.snackBar.open('Item Updated sucessfully!','OK', {
  			duration: 3000
  		});
      this.backToList();
  	});
  }

}
