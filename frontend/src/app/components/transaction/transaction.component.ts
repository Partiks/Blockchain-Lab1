import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { Transaction } from '../../transaction.model';
import {TransactionService} from '../../transaction.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {

    uname: String;
    transactions: Transaction[];

  displayedColumns = ['Id', 'Seller', 'Buyer', 'ItemId', 'ItemName', 'ItemPrice', 'Date'];

  constructor(private transactionService: TransactionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe( params => {
      this.uname = params.uname;
     });
     this.fetchTransactions();
  }

  fetchTransactions(){
    this.transactionService.getAllTransactions().subscribe( (data: Transaction[]) => {
      this.transactions = data;
      console.log(data);
    });
  }

  backToList(){
    console.log("Going back to list from create");
    console.log(this.uname);
    this.router.navigate([`/list/${this.uname}`]);
  }

}
