import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'

import { UserService } from '../../user.service';
import { User } from '../../user.model';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent implements OnInit {

  	depositForm: FormGroup;
	user: any = {};
	uname: String;

  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private fb: FormBuilder) { 
  	this.createForm();
  }

  createForm() {
  this.depositForm = this.fb.group({
  		amount: ['', Validators.required],
  	});
  }

  ngOnInit() {
  	this.route.params.subscribe(params => {
  		this.uname = params.uname;
  	});
  }

  deposit(amount){
  	var amt = parseInt(amount);
  	if(amt < 0){
		this.router.navigate([`/error/${this.uname}`]);
	}
	else{
	  	this.userService.getUserByUname(this.uname).subscribe( (res) => {
	  		this.user = res;
	  			this.user.balance = parseInt(this.user.balance) + amt;
	  			this.userService.updateUser(this.user.username, this.user.password, this.user.balance).subscribe(() => {
	  				console.log("user updated from deposit.ts");
	  				this.backToList(); 
	  				console.log("user updated from deposit.ts");
	  			});

	  	})

	}
   }

   backToList(){
    console.log("Going back to list from create");
    console.log(this.uname);
    this.router.navigate([`/list/${this.uname}`]);
  }

}
