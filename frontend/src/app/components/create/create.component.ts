import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {ItemService} from '../../item.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

	createForm: FormGroup;

  constructor(private itemService: ItemService, private fb: FormBuilder, private router: Router) {
  	this.createForm = this.fb.group({
  		id: '',
  		name: ['', Validators.required],
  		owner: '',
  		description: '',
  		price: ''
  	});
  }

  addItem(id, name, owner, description, price){
  	this.itemService.addItem(id, name, owner, description, price). subscribe( () => {
  		this.router.navigate(['/list']);
  	});
  }

  ngOnInit() {
  }

}
