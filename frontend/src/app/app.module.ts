import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListComponent } from './components/list/list.component';
import { CreateComponent } from './components/create/create.component';
import { EditComponent } from './components/edit/edit.component';

import {RouterModule, Routes} from '@angular/router';
import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import {ItemService} from './item.service';
import { LoginComponent } from './components/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { TransactionComponent } from './components/transaction/transaction.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  { path: 'create/:uname', component: CreateComponent },
  { path: 'edit/:uname/:id', component: EditComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register/superuser', component: RegisterComponent },
  { path: 'list/:uname/items', component: ListComponent },
  { path: 'list/:uname', component: ListComponent },
  { path: 'error/:uname', component: ErrorComponent },
  { path: 'error/superuser', component: ErrorComponent },
  { path: 'deposit/:uname', component: DepositComponent },
  { path: 'transaction/:uname', component: TransactionComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    CreateComponent,
    EditComponent,
    LoginComponent,
    ErrorComponent,
    DepositComponent,
    TransactionComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  providers: [ItemService],
  bootstrap: [AppComponent]
})

export class AppModule { }
