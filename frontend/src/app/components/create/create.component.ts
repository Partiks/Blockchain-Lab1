import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import {ItemService} from '../../item.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

	createForm: FormGroup;
  uname: String;
  user: any = {};

  constructor(private itemService: ItemService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
  	this.createForm = this.fb.group({
  		name: ['', Validators.required],
  		owner: '',
  		description: '',
  		price: ''
  	});
  }

  

  backToList(){
    console.log("Going back to list from create");
    console.log(this.uname);
    this.router.navigate([`/list/${this.uname}`]);
  }

  addItem(name, description, price){
  	this.itemService.addItem(name, this.uname, description, price). subscribe( () => {
  		this.router.navigate([`/list/${this.uname}`]);
  	});
  }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.uname = params.uname;
      console.log("YASS LOLPODO");
      console.log(this.uname);
    });
  }

}
